import { Parser } from 'acorn'


function parser (code, options) {
    return Parser.parse(code)
}

export default parser