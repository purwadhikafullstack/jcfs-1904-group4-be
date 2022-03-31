require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const { createHtmlString } = require('../handlebars');

const courier = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    clientId: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    refreshToken: process.env.G_REFRESH_TOKEN,
  },
});

const sendEmail = async ({ recipient, subject, templateName, data }) => {
  try {
    const pathToTemplateDirectory = './src/services/html';
    const pathToTemplate = `${pathToTemplateDirectory}/${templateAttachmentName}`;

    const htmlBody = createHtmlString({ templateName, data });
    const htmlString = fs.readFileSync(pathToTemplate, 'utf-8');

    const mail = {
      from: 'EzFurniture <mujaddid.s.i@gmail.com>',
      to: recipient,
      subject: subject,
      html: htmlBody,
    };

    await courier.sendMail(mail);

    console.log('Email has beent sent');
  } catch (error) {
    console.log({ error });
  }
};
