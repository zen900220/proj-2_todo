import nodemailer from "nodemailer";

export const sendMail = async (message, mailTo) => {
  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_SERVER,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PSWD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: mailTo,
    subject: "Reset Password URL",
    text: message,
  });
};
