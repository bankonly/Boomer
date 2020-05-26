const Res = require("../Controllers/DefaultResponseController");
const Mail = require("nodemailer");
const CONSTANT = require("../../app_config/constants");
const htmlMail = require('../../app_config/defaults/otp')

class MailProvider {
  async send({ to, text, subject = "from Nome", from = null }) {
    try {
      const transporter = Mail.createTransport({
        service: CONSTANT.mailService,
        auth: {
          user: CONSTANT.mailId,
          pass: CONSTANT.mailPassword,
        },
      });

      const mailSendOption = {
        from: from == null ? CONSTANT.mailId : from,
        to: to,
        subject: subject,
        text: text,
        html:htmlMail(51262,"somelink")
      };

      const sendMail = await transporter.sendMail(mailSendOption);
      if (sendMail.error) return Res.badRequest({ msg: "Mail failed" });
      return Res.success({ msg: "Mail sent" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }
}

module.exports = new MailProvider();
