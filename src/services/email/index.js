require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const createHtmlString = require('../handlebars');

const courier = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'mujaddid.s.i@gmail.com',
    clientId: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    refreshToken: process.env.G_REFRESH_TOKEN,
  },
});

const sendEmail = async ({ recipient, subject, templateName, data }) => {
  try {
    const pathToTemplateDirectory = './src/services/html';
    const htmlBody = createHtmlString({ templateName, data });

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

module.exports = sendEmail;
