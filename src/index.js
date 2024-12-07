import parser from "./packages/parser/index.js"


const code = `
let name = "Mohammad"
`
const result = parser(code)

console.log(result,'result');
