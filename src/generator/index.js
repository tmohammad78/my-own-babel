import { SourceMapGenerator } from "source-map"

class Generate {

    constructor(node) {
        this.code = ''
        this.sourceFile = null
    }


    addSpace() {
        this.code += " "
    }

    addNewLine() {
        this.code += '\n'

    }

    generateSourceFile() {
        new SourceMapGenerator({
            version: '1',
            file: 'file.map.js'
        })
    }

    VariableDeclaration(node) {
        this.code += node.kind 
        this.addSpace()
        node.declarations.forEach((declaration,idx) => {
            if(idx !== 0) {
                this.code += ','
            }
            this[declaration.type](declaration)
        })
    }

    VariableDeclarator(node) {
        this[node.id.type](node.id)
        this.code += '='
        this[node.init.type](node.init)
    }

    StringLiteral(node) {
        console.log(node,'dd');
        
        this.code += '"'
        this.code += node.value
        this.code += '"'
    }

    NumericLiteral(node) {
        this.code += node.value
    }

    Identifier(node) {
        this.code += node.name;
    }

    File(node) {
        this[node.program](node)
    }

    Program(node) {
        node.body.forEach((item) => {
            this[item.type](item)
            this.code += ';'
            this.addNewLine();
        });
    }

    FunctionDeclaration(node) {
        const fnName  = node.id.name
        this.code += 'function '
        this.code += fnName
        this.code += '('
        this.code += node.params.map(item => item.name).join(',')
        this.code += '){'
        this.addNewLine()
        this[node.body.type](node.body);
        this.code += '}'
    }

    ArrowFunctionExpression(node) {
        this.code += 'function ';
        this.code += '(';
        this.code += node.params.map(item => item.name).join(',');
        this.code += ') {';
        this.addNewLine();
        this[node.body.type](node.body);
        this.code += '}';
    }

    BlockStatement(node) {
        node.body.map(item => {
            this.code += '   '
            this[item.type](item)
            this.addNewLine()
        })
    }

    ReturnStatement(node) {
        this.code += 'return '
        this[node.argument.type](node.argument)
    }
    
    generate(node) {
        this[node.type](node)
        return {
            sourceFile: this.generateSourceFile(),
            code: this.code
        }
    }
}

function generate(node) {
    const generateClass = new Generate(node)
    return generateClass.generate(node)
}

export default generate