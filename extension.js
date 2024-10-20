const vscode = require('vscode');
const codemod = require('./apply-codemod.js');

async function activate({subscriptions}) {
  console.log('Congratulations, your extension "dankmodz" is now active!');

  let disposable1 = vscode.commands.registerCommand('dankmodz.fnToConst', codemod(`fnToConst`));
  subscriptions.push(disposable1);

  let disposable2 = vscode.commands.registerCommand('dankmodz.renameFunction', codemod(`renameFunction`));

  subscriptions.push(disposable2);

  let disposable3 = vscode.commands.registerCommand('dankmodz.templateLiteral', codemod(`templateLiteral`));
  subscriptions.push(disposable3);

  let disposable4 = vscode.commands.registerCommand('dankmodz.transformToCamelCase', codemod(`transformToCamelCase`));
}

function deactivate() {
  console.log('Your extension "dankmodz" is now deactivated!');
}

module.exports = {
  activate,
  deactivate,
};
