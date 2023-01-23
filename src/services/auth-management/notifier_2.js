const EmailBuilder = require('./Email_builder')

module.exports = (app) => {

 
    const sendEmail = (email) => {
        return app.service("mailer-2").create(email)
    }

    return (action, user, patchData) => {

        switch (action) {
          case "sendResetPwd":

            
            break;
        
          default:
            break;
        }
        if (type === "sendResetPwd") {
          const eMail = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Initialisation de mot de passe",
            text: "Cliquer sur ce lien: " + createLink("resetPwdLong", user.resetToken),
          }
          sendEmail(eMail).then( _ => {
             app.service("users").patch(user._id, patchData)
          })

        } else if (action === "resendVerifySignup") {
            return sendEmail({
              from: process.env.SENDER_EMAIL,
              to: user.email,
              subject: "Please confirm your e-mail address",
              text: "Click here: " + createLink("verifySignupLong", user.verifyToken),
            })
        } else if (action === "verifySignupLong") {
            return sendEmail({
              from: process.env.SENDER_EMAIL,
              to: user.email,
              subject: "E-Mail address verified",
              text: "Registration process complete. Thanks for joining us!",
            });
        } 
    }
}