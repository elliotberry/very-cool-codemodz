export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.FunctionDeclaration).replaceWith((nodePath) => {
    const { node } = nodePath;
    const functionName = node.id.name;
    
    return j.variableDeclaration("const", [
      j.variableDeclarator(
        j.identifier(functionName),
        j.functionExpression(
          j.identifier(functionName),
          node.params,
          node.body
        )
      )
    ]);
  });

  return root.toSource();
}
