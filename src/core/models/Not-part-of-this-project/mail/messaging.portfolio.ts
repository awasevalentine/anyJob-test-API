import * as nodemailer from 'nodemailer';
import { MessageDto } from '../DTOs/client-message.model.dto';

// async..await is not allowed in global scope, must use a wrapper
export const clientMessage = async (data: MessageDto) => {

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
          <div style="padding: 15px; text-align: center;">
           <p><b>From:</b> ${ data.name }</p>
           <br>
           <p><b>Email:</b> ${ data.email }</p>
           <br>
           <p><b>Subject:</b> ${ data.subject }</p>
           <br>
           <p><b>Message:</b> ${ data.message }</p>
          </div>
    `
  });
};