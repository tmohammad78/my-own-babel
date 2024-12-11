import { Parser } from 'acorn'


function literal(prevParser) {
  return class extends prevParser {
    parseLiteral(...args) {
      const node = super.parseLiteral(...args)
      
      switch (typeof node.value) {
        case 'number':
          node.type = 'NumericLiteral'
          break;
        case 'string':
          node.type = 'StringLiteral'
          break;
        default:
          break;
      }

      return node
    }
  }
}

function parser (code, options) {
    const nextParser = Parser.extend(literal)
    return nextParser.parse(code)
}

export default parser