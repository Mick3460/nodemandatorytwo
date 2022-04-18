import nodemailer from "nodemailer"

export function sendEmail(email,subject,text) {
    let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        service: 'Gmail',
        auth: {
            user: 'nodemandatoryEmail@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailDetails = {
        from: 'nodemandatoryEmail@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    //mailTransporter.verify()
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log("MAIL ERROR IN NODEMAILER.JS");
            return 0;
        } else {
            return 1;
        }
    });
}