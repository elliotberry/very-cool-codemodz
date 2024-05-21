const vscode = require('vscode');
const {applyCodemod} = require('./apply-codemod.js');
const editorCodemod = async fnName => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const transformedCode = await applyCodemod(document.getText(), fnName);

    const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));

    editor.edit(editBuilder => {
      editBuilder.replace(fullRange, transformedCode);
    });
  }

  
};
module.exports = 
    editorCodemod;
  