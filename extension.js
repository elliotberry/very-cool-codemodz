// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { execSync } = require('child_process');
const { join } = require('path');
const codemodPath = join(__dirname, 'modz', 'renameFunction.js');
const jsCodeShiftPath = join(__dirname, 'node_modules', 'jscodeshift', 'bin', 'jscodeshift.js');

function applyCodemod(document) {
   const sourceCode = document.getText();
    const transformedCode = execSync(
        `node ${jsCodeShiftPath} -t ${codemodPath} -`,
        {
            input: sourceCode,
            encoding: 'utf-8'
        }
    );

    return transformedCode;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hentaimodz" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hentaimodz.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage(`${jsCodeShiftPath} oHello World from hentaimodz!`);
	});
	let disposable1 = vscode.commands.registerCommand('hentaimodz.applyCodemod', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const transformedCode = applyCodemod(document);

            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );

            editor.edit(editBuilder => {
                editBuilder.replace(fullRange, transformedCode);
            });
        }
    });
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
