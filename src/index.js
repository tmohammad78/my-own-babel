import generate from "./generator/index.js";
import parser from "./parser/index.js"
import traverse from "./traverse/traverse.js";


const code = `
let name = "Mohammad"
let age = 12
`
const ast = parser(code)

console.log(JSON.stringify(ast),'ddddddddddddddddd');

traverse(ast, {
    Program(node) {
        console.log(node,"program *******************");
    },
    Identifier(node) {
        console.log(node,"Identifier *******************");
        if(node.name === 'name') {
            node.name = "test"
        }
        // if(path.isIdentifier({ name: 'name' })) {
        //     path.node.name = 'firstName'
        // }
    },
    StringLiteral(node) {
        console.log(node,"StringLiteral *******************");
    }
    // VariableDeclarator(node) {
    //     console.log(node,"this is VariableDeclarator *******************");
    // }
    
})

console.log(generate(ast),'new code');
