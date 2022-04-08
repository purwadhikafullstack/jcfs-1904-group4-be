const handlebars = require('handlebars');
const fs = require('fs');

const createHtmlString = ({ templateName, data }) => {
  const pathToHtmlDirectory = './src/services/html';

  const pathToHtmlTemplate = `${pathToHtmlDirectory}/${templateName}`;

  const htmlSource = fs.readFileSync(pathToHtmlTemplate, 'utf-8');

  const htmlTemplate = handlebars.compile(htmlSource);

  const htmlString = htmlTemplate(data);

  return htmlString;
};

module.exports = createHtmlString;
