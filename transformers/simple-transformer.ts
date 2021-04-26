import '@abraham/reflection';
import * as ts from 'typescript';

function isComponentDecorator(node: ts.Decorator) {
    // You will probably want something more sophisticated
    // that analyzes the import declarations or possibly uses
    // the type checker in an initial pass of the source files
    // before transforming. This naively just checks if the
    // decorator is a call expression and if its expression
    // has the text "customElement". This definitely won't work
    // in every scenario and might possibly get false positives.
    const expr = node.expression;
    if (!ts.isCallExpression(expr))
        return false;

    if (!ts.isIdentifier(expr.expression))
        return false;

    console.log(expr.expression.escapedText);
    return expr.expression.escapedText === "customElement";
}

const simpleTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
            if (ts.isClassDeclaration(node)) {
                if (node.decorators && node.decorators.length === 1 && isComponentDecorator(node.decorators[0])) {
                    console.log(node.members[0]);
                    let types: Array<any> = Reflect.getMetadata("design:paramtypes", node) || [];
                    console.log({ types });
                }
                return node;
            }
            return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor);
    };
}

export default simpleTransformer;