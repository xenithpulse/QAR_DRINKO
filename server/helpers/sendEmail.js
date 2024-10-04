import nodemailer from 'nodemailer';


export const sendEmail = async(message,name , userEmail) => {
    try {
       

        

        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.SMPT_MAIL,
              pass: process.env.SMPT_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: process.env.ADMIN_MAIL,
            subject: "Fit And Drink Customer",
            html: `
                <h2>From ${name},</h2>
                <p>You received a message from <a href="mailto:${userEmail}">${userEmail}</a></p>
                
                <h2>Message:</h2>
                <p>${message}</p>
                <p>Best regards,<br>Fit And Drink</p>
            `
        };
        

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
};
