import { scanner } from "./scanner.js"
import { parser } from "./parser.js"

const AST = parser(scanner())
//console.log(AST);