const vscode = require('vscode');
const codemod = require('./codemod.js');


async function activate({ subscriptions }) {
    console.log('Congratulations, your extension "animehentaimodz" is now active!');


    let disposable1 = vscode.commands.registerCommand('animehentaimodz.fnToConst', codemod(`fnToConst`));
    let disposable = vscode.commands.registerCommand('animehentaimodz.templateliteral', codemod(`templateliteral`));

    subscriptions.push(disposable1);
    subscriptions.push(disposable);
  
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
