const {execSync} = require('child_process');
const {join} = require('path');
const fs = require('fs/promises');
const os = require('os');
const vscode = require('vscode');
const jscodeshift = require('jscodeshift');
const jsCodeShiftPath = join(__dirname, 'node_modules', 'jscodeshift', 'bin', 'jscodeshift.js');

const createTempFile = async sourceCode => {
  let tempFilePath = join(os.tmpdir(), 'temp.js');

  await fs.writeFile(tempFilePath, sourceCode);
  return tempFilePath;
};

async function applyCodemod2(text, fn = 'renameFunction') {
  const codemodPath = join(__dirname, 'modz', `${fn}.js`);
  const output = execSync(`echo \`"${text}"\` | node ${jsCodeShiftPath} -t ${codemodPath} --stdin`, {
    input: text,
    encoding: 'utf-8',
  });

  return output;
}

async function applyCodemod(text, fn = 'renameFunction') {
  let fpath = await createTempFile(text);
  const codemodPath = join(__dirname, 'modz', `${fn}.js`);
  const output = execSync(`node ${jsCodeShiftPath} -t ${codemodPath} ${fpath}`, {
    input: text,
    encoding: 'utf-8',
  });

  let transformedCode = await fs.readFile(fpath, 'utf-8');
  fs.unlink(fpath);
  return transformedCode;
}

const functionGenerator = async fnName => {
  const theFunction = async () => {
  try {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
    const transformedCode = await applyCodemod(document.getText(), fnName);

      const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));

      editor.edit(editBuilder => {
        editBuilder.replace(fullRange, transformedCode);
      });
    }
  } catch (e) {
    console.log(e);
  }
}
return theFunction;
};
exports.codemod = functionGenerator;
