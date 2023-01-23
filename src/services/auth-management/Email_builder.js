module.exports = (currAction, linkAction, user) => {

    function createLink(hash) {
        return `${process.env.EMAIL_URL}/#/authenticate/?action=${linkAction}&token=${hash}`
    }
    
    return () => {
        switch (currAction) {
            case "sendResetPwd": return {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "Initialisation de mot de passe",
                text: "Cliquer sur ce lien: " + createLink(user.resetToken), // createLink("resetPwdLong", user.resetToken),
            }
            case "resetPwdLong": return {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "Initialisation effectuée",
                text: "La re-initialisation de votre mot de passe s'est effectué avec success. ",
            }
            case "resendVerifySignup": return {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "Please confirm your e-mail address",
                text: "Click here: " + createLink(user.verifyToken), // createLink("verifySignupLong", user.verifyToken),
            }
            case "verifySignupLong": return {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "E-Mail address verified",
                text: "Registration process complete. Thanks for joining us!",
            }
            default: return;
        }
    }

    
}