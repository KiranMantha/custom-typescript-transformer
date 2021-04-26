import * as ts from 'typescript';

function hasComponentDecorator(node: ts.Node) {
    // You will probably want something more sophisticated
    // that analyzes the import declarations or possibly uses
    // the type checker in an initial pass of the source files
    // before transforming. This naively just checks if the
    // decorator is a call expression and if its expression
    // has the text "customElement". This definitely won't work
    // in every scenario and might possibly get false positives.
    return node.decorators && node.decorators.filter(d => d.getFullText().trim().startsWith('@customElement')).length > 0;
}

function hasServiceDecorator(node: ts.Node) {
    // You will probably want something more sophisticated
    // that analyzes the import declarations or possibly uses
    // the type checker in an initial pass of the source files
    // before transforming. This naively just checks if the
    // decorator is a call expression and if its expression
    // has the text "customElement". This definitely won't work
    // in every scenario and might possibly get false positives.
    return node.decorators && node.decorators.filter(d => d.getFullText().trim().startsWith('@Service')).length > 0;
}

const getConstructorMethod = (node: ts.ClassDeclaration) => {
    const constructorMethod = node.members
        .filter(node => ts.isConstructorDeclaration(node))
        .map(node => node as ts.MethodDeclaration)[0];
    return constructorMethod;
}

const simpleTransformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext) => {
    return sourceFile => {
        const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
            if (ts.isClassDeclaration(node)) {
                if (node.decorators && node.decorators.length === 1 && hasComponentDecorator(node)) {
                    const constructor = getConstructorMethod(node);
                    const constructorParametersTypes = constructor.parameters.map(param => param.type.getText());
                    console.log(node.name.escapedText, { constructorParametersTypes });
                }
            }
            return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor);
    };
}

export default simpleTransformer;