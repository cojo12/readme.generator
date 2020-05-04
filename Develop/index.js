const fs = require('fs');
const readlineSync = require('readline-sync');

const config = {
  templatePath: './README.template.md',
  generatePath: './README.md',
};

const questions = [
  { token: '<project-title>', question: 'What\'s the name of your project? ' },
  { token: '<description>', question: 'Enter a description for your project: ' },
  { token: '<table-of-contents>', question: 'What is in the table of contents? '},
  { token: '<intallation>', question: 'What are the steps required to install your project? '},
  { token: '<usage>', question: 'Provide instructions and examples for use: '},
  { token: '<license>', question: 'This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/) '},
  { token: '<contributing>', question: 'If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own. '},
  { token: '<tests>', question: 'Go the extra mile and write tests for your application. Then provide examples on how to run them. '},
  { token: '<questions>', question: 'Insert your contact info for questions about the project: '},

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
