const transporter = require('../configs/mail-config');


const sendMailToUser = async (email, title, body) => {

    let info = await transporter.sendMail({
        from: "Sudhnil",
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`
    })

    // console.log("Info: ", info);

    return info;  // optional
}


module.exports = sendMailToUser;