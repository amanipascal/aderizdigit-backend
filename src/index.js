/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
var jotform = require("jotform")

const test_existance_ou_creation_du_superadmin = (profilid) => {
  app.service('users').find({query: {email: 'amanipascal65@gmail.com'}}).then(response => {
    if (!response.data.length) {
      app.service('users').create({
        email: 'amanipascal65@gmail.com',
        username: 'Pascal Amani',
        password: 'superadmin',
        profils: [profilid],
        menus: [],
      }).then(() => {
        // console.log('SuperAdmin user just created successfully !')
      })
    } else {
      // console.log('SuperAdmin user allready exist !', )
    }
  })
}


app.service('profil').find({query: {name: 'superadmin'}}).then(resp => {
  if (!resp.data.length) {
    app.service('profil').create({
      name: 'superadmin'
    }).then(data => {
      // console.log('Super profile just created successfully ! =>', data)
      const {_id: profilId} = data
      test_existance_ou_creation_du_superadmin(profilId)
    })
  } else {
    const {_id: profilId} = resp.data[0]
    // console.log('Super profile allready exist ! =>', profilId)
    test_existance_ou_creation_du_superadmin(profilId)
  }
})


//-----------------------------------------Traitement jotform--------------------------------
//const apiKeys = ["b4dc272b9d5bd43a6b846042139aa0e9"];
//const apiKeys = ["a4b1b43ee1ceab33c40d956d1a1fd2d1"];
const apiKeys = ["b4dc272b9d5bd43a6b846042139aa0e9"];


var process_encours = false;

async function save_form(form) {
  if (form) {
    const {data:frmlist} = await app.service('jtforms').find({query:{id: form.id}})
    if (!frmlist.length) {
      try {
        const myform = await app.service('jtforms').create(form);
        console.log('form created: ', myform)
        return myform;
      } catch (error) {
        console.log('New form creation error: ', error)
        return null;
      }
    } else {
      return frmlist[0];
    }
  }
 

}


function buildRow(submission) {
  const {answers, ...rest} = submission
  const questions = Object.values(answers)
  const filteredQuestions = questions.filter(quest  => !['control_button','control_head'].includes(quest.type))
  .map(q  => {
    return {[q.name]: q.answer}
  })
  var object = filteredQuestions.reduce((obj, item) => ({...obj, ...item}), {});
  return {...object, submit_id: rest.id, submit_infos: rest}
}


setInterval(() => {
  if (!process_encours) {
    process_encours = true
    apiKeys.forEach( async (apikey, ApiIndex) => {
      jotform.options({debug: false, apiKey: apikey});
      jotform.getForms({filter:{status:"ENABLED"}}).then(function(forms){
          forms.forEach(async fm => {
            let form = await save_form(fm)
            // console.log('formulaire : ', form.title)
            if (form && form.crud_service!== "undefined" && form.crud_service !== "") {
              //------------------------traitement des submissions------------------------------
              jotform.getSubmissions({filter: {form_id: form.id}}).then(function(submissions) {
                //console.log('submissions: ', submissions)
                if (!!submissions.length) {
                  //console.log('submissions OK: ', submissions.length)
                  submissions.forEach(item => {
                    // console.log('submissions item: ', item)
                    let Row = buildRow(item);
                    //console.log('submissions Row: ', Row)
                    // Requete test d'existance du "submission" (row)
                    //==================================================================
                    app.service(form.crud_service).find({query:{submit_id: Row.submit_infos.id}}).then(result => {
                      if (!!result.data.length) {
                        // Repercution des suppressions ------------------------
                        if (Row.submit_infos.status == 'DELETED') {
                          app.service(form.crud_service).remove(result.data[0]._id)
                        } else {
                          // Repercution des mise à jour -------------------------
                          if (Row.submit_infos.created_at !== result.data[0].submit_infos.created_at ) {
                            app.service(form.crud_service).patch(result.data[0]._id, Row)
                          }
                        }
                      } else {
                        // Repercution des creations------------------------
                        console.log('Data  not exit: ', Row)
                        if (Row.submit_infos.status == 'ACTIVE') {
                          //console.log('Row to create: ', Row)
                          app.service(form.crud_service).create(Row).catch(err => console.log('Creation Error: ', err))
                        }
                      }
                    })

                    //======================================================================
                  })
                }
                
              }).fail(function(e){ console.log('subs error: ', e) })
              //------------------------FIN traitement des submissions------------------------------
            }
          });
        }).fail(function(e){
          process_encours = false
          console.log('form error: ', e)
        })
        if (apiKeys.length == (ApiIndex + 1)) {
          process_encours = false
          //console.log(`index ${ApiIndex+1}/${apiKeys.length}`)
        } 
    });
  }
  
}, 5000);




process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
