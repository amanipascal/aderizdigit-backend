
module.exports = (app) => {

    function getLink(type, hash) {
        return `${process.env.EMAIL_URL}/#/authenticate/${type}?token=${hash} ` //"http://localhost:3030/" + type + "?token=" + hash;
    }
    
    async function sendEmail(email) {
        try {
          const result = await app.service("mailer-2").create(email);
          return result;
        } catch (err) {
          console.error('sendEmail error: ', err.message);
        }
    }

    return (type, user, notifierOptions = {}) => {
        if (type === "resendVerifySignup") { //resendVerifySignup
            return sendEmail({
              from: process.env.SENDER_EMAIL,
              to: user.email,
              subject: "Please confirm your e-mail address",
              text: "Click here: " + getLink("verifySignupLong", user.verifyToken),
            });
        } else if (type === "verifySignupLong") {
            return sendEmail({
              from: process.env.SENDER_EMAIL,
              to: user.email,
              subject: "E-Mail address verified",
              text: "Registration process complete. Thanks for joining us!",
            });
        } 
    }
}