module.exports = function(fileInfo, api) {
    const j = api.jscodeshift;

    return j(fileInfo.source)
        .find(j.Identifier, { name: 'oldFunction' })
        .forEach(path => {
            path.node.name = 'newFunction';
        })
        .toSource();
};