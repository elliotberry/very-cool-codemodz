const vscode = require('vscode');
const {codemod} = require('./apply-codemod.js');

async function activate({subscriptions}) {
  console.log('Congratulations, your extension "animehentaimodz" is now active!');

  let disposable1 = vscode.commands.registerCommand('animehentaimodz.fnToConst', codemod(`fnToConst`));
  subscriptions.push(disposable1);
}

function deactivate() {
  console.log('Your extension "animehentaimodz" is now deactivated!');
}

module.exports = {
  activate,
  deactivate,
};
