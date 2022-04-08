require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const createHtmlString = require('../handlebars');

const courier = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'orca97@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
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
