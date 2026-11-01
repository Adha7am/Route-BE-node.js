import nodemailer from 'nodemailer'

 const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.NODEMAILER_EMAIL,
            pass : process.env.NODEMAILER_PASS
        }
    })

export function sendEmail(to, subject, html){
   

    transporter.sendMail({
        from : `"Truth Or Truth" <${process.env.NODEMAILER_EMAIL}>` ,
        to : to,
        subject : subject,
        html : html
    })
}