// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// export default async function sendEmail(options) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const message = {
//     from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
//     to: options.email,
//     subject: options.subject,
//     html: options.html,
//   };

//   await transporter.sendMail(message, (err, info) => {
//     if (err) {
//       console.error("Error sending email:", err);
//     } else {
//       console.log("Email sent:", info.response);
//     }
//   });
// }

import nodemailer from "nodemailer";
import nodemailerHbs from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // This option allows self-signed certificates
    },
  });

  // Configure the handlebars options
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    },
    viewPath: path.resolve("./views/"),
    extName: ".hbs",
  };

  // Attach the handlebars plugin to the Nodemailer transporter
  transporter.use("compile", nodemailerHbs(handlebarOptions));

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    template: options.template, // Specify the template name here
    context: options.context,   // Pass dynamic data to the template
  };

  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
