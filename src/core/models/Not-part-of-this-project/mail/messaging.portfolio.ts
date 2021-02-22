import * as nodemailer from 'nodemailer';
import { MessageData } from '../../interface/portfolio-message.interface';

// async..await is not allowed in global scope, must use a wrapper
export const clientMessage = async (data: MessageData) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `${data.name}`,
    
    to: `awasevalentine@gmail.com`,

    subject: `${data.subject}`, 

    html: `
          <p style="padding: 15px;">
          ${data.message}
          </p>
    `
  });
};