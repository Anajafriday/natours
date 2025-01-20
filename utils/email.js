const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Natours  <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // send grid
      return nodemailer.createTransport({
        host: process.env.BREVO_EMAIL_HOST,
        port: process.env.BREVO_EMAIL_PORT || 2525,
        auth: {
          user: process.env.BREVO_EMAIL_USERNAME,
          pass: process.env.BREVO_EMAIL_PASSWORD,
        },
      });
    }
    // development
    return nodemailer.createTransport({
      host: process.env.DEV_EMAIL_HOST,
      port: process.env.DEV_EMAIL_PORT || 2525, // Use Mailtrap's default port, 2525
      auth: {
        user: process.env.DEV_EMAIL_USERNAME,
        pass: process.env.DEV_EMAIL_PASSWORD,
      },
    });
  }

  // send actual email
  async send(template, subject) {
    // render the template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        url: this.url,
        firstName: this.firstName,
        subject,
      }
    );

    // define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText.convert(html),
    };

    // create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "welcome to natours family");
  }

  async sendAccountConfirm() {
    await this.send(
      "confirmAccount",
      "Verify Your Natours Account (Link expires in 24hrs.)"
    );
  }
  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Password reset token (valid for only  10min.)"
    );
  }
  async sendEmailChanged() {
    await this.send(
      "confirmEmailChange",
      "Verify Your New Natours Email Address (valid for only  10min.)"
    );
  }
};
// const sendEmail = async (options) => {
//   // 1) create a transporter
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: process.env.EMAIL_PORT || 2525, // Use Mailtrap's default port, 2525
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   // 2) define email options
//   const mailOptions = {
//     from: "friday anaja <anajafriday113@gmail.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html
//   };
//   // 3) send the email
//   return transporter.sendMail(mailOptions);
// };
