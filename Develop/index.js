const fs = require('fs');
const readlineSync = require('readline-sync');

const config = {
  templatePath: './README.template.md',
  generatePath: './README.md',
};

const questions = [
  { token: '<project-title>', question: 'What\'s the name of your project? ' },
  { token: '<description>', question: 'Enter a description for your project: ' },
  { token: '<table-of-content>', question: 'What'}
];

function readTemplate() {
  return fs.readFileSync(config.templatePath, { encoding: 'utf8', flag: 'r' });
}

function askAndReplace(content) {
  questions.forEach(info => {
    const answer = readlineSync.question(info.question);
    content = content.replace(info.token, answer);
  });
  return content;
}

function saveReadme(data) {
  fs.writeFileSync(config.generatePath, data, { encoding:'utf8' });
}

function init() {
  let content = readTemplate();
  content = askAndReplace(content);
  saveReadme(content);
}

init();
