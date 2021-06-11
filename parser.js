let tokenList;
let tokenIndex = -1;
let current_token;
let isError = false;


// function S() {
//   if(current_token == 'a') {
//     Match('a');
//     Match('+');
//     A();
//   } else {
//     ThrowError("Simbolo inesperado, se esperaba 'a'");
//   }
// }

// function A() {
//   if(current_token == '(') {
//     Match('(');
//     S();
//     Match(')');
//   } else if(current_token == 'a') {
//     Match('a');
//   } else {
//     ThrowError("Simbolo inesperado, se esperaba '(' ó 'a' ");
//   }
// }




function Get_Next_Token() {
  tokenIndex++;
  return(tokenList[tokenIndex][0]);
}

function Match(terminalToken) {
  console.log(current_token)
  if(current_token == terminalToken) {
    current_token = Get_Next_Token()
  } else {
    ThrowError(`Match incorrecto, se esperaba ${terminalToken} en lugar de ${current_token}`);
  }
}

function ThrowError(msg) {
  // console.log( tokenIndex +" aqui " + current_token)
  throw new Error(`Error Sintáctico: ${msg}, en la posición (${tokenIndex+1}) de la lista de tokens.\n\n\n`);
  //Agregar linea de codigo
}


function program() {
  declaration_list()
}

function declaration_list(){
  declaration();
  declaration_listPrime();
}

function declaration_listPrime(){
  declaration();
  if (current_token == '$') {
    return;
  } else {
    ThrowError("Simbolo inesperado, se esperaba fin de declaración");
  }
}

function declaration(){
  var_declaration();
  fun_declaration();
  // else ?
}

function var_declaration(){
  if(current_token == 'int') {
    Match('int');
    Match('ID');
    if(current_token == '[') {
      Match('[');
      Match('Number');
      Match(']');
    }
    console.log("dsad")
    Match(';');
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'int");
  }
}

function type_specifier(){
  if(current_token == 'int') {
    Match('int');
  } else if(current_token == 'void') {
    Match('void');
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'int' ó 'void'");
  }
}

function fun_declaration(){
  type_specifier();
  if(current_token == 'ID') {
    Match('ID');
    Match('(')
    params();
    compound_stmt();
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'ID'");
  }
}

function params(){
  param_list();
  // if (current_token == '$') {
  //   return;
  // } else {
  //   ThrowError("Simbolo inesperado, se esperaba fin de declaración");
  // }
}

function param_list(){
  param();
  param_listPrime();
}

function param_listPrime(){
  if(current_token == ',') {
    Match(',');
    term();
    expPrime();
  } else if(current_token == ')') {
    return;
  } else {
    ThrowError("Simbolo inesperado, se esperaba ',' ó ')'");
  }
}

function param(){
  if(current_token == 'int') {
    Match('int');
    Match('ID');
    if(current_token == '[') {
      Match('[');
      Match(']');
    }
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'int");
  }
}

function compound_stmt(){
  if(current_token == '{') {
    Match('{');
    local_declarations();
    Match('}');
  } else {
    ThrowError("Simbolo inesperado, se esperaba '{");
  }
}

function local_declarations(){
  local_declarationsPrime();
}

function local_declarationsPrime(){
  var_declaration();
  local_declarationsPrime();
  //cambiar posiciones ^ 
  // Agregar $
  if(current_token == 'ID' || current_token == '{' || current_token == '}' || current_token == 'if' || current_token == 'while' || current_token == 'return' || current_token == 'input' || current_token == 'output') {
    return;
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'ID', '{', '}', 'if', 'while', 'return', 'input' ó 'output'");
  }
}

function statement_list(){
  statement_listPrime();
}
function statement_listPrime(){
  statement();
  statement_listPrime(); 
  //cambiar posiciones ^ 
  // Agregar $
  if(current_token == '}') {
    return;
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'ID', '{', '}', 'if', 'while', 'return', 'input' ó 'output'");
  } 
}

function statement(){
  assignment_stmt();
  call_stmt();
  compound_stmt();
  selection_stmt();
  iteration_stmt();
  return_stmt();
  input_stmt();
  output_stmt();
}



function assignment_stmt(){
  variable();
  if(current_token == '='){
    Match('=');
    expression();
    Match(';');
  } else {
    ThrowError("Simbolo inesperado, se esperaba '='");
  } 
}

function call_stmt(){
  call();
  // if(current_token == ';'){
    Match(';');
  // } else {
  //   ThrowError("Simbolo inesperado, se esperaba '='");
  // } 
}

function selection_stmt(){
  if(current_token == 'if') {
    Match('if');
    Match('(');
    expression();
    Match(')');
    statement();
    if(current_token == 'else') {
      Match('else');
      statement();
    }
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'if");
  }
}

function iteration_stmt(){
  if(current_token == 'while') {
    Match('while');
    Match('(');
    expression();
    Match(')');
    statement();
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'while");
  }
}

function return_stmt(){
  if(current_token == 'return') {
    Match('return');
    //or void
    expression();
    Match(';');
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'return");
  }
}

function input_stmt(){
  if(current_token == 'input') {
    Match('input');
    variable();
    Match(';');
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'input");
  }
}

function output_stmt(){
  if(current_token == 'output') {
    Match('output');
    expression();
    Match(';');
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'output");
  }
}

function variable(){
  if(current_token == 'ID') {
    Match('ID')
    if(current_token == '['){
      Match('[');
      arithmetic_expression();
      Match(']');
    }
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'ID");
  }
}

function expression(){
  arithmetic_expression();
  //optional
  relop();
  arithmetic_expression();
}


function relop(){
  if(current_token == '<='){
    Match('<=');
  } else if(current_token == '<'){
    Match('<');
  } else if(current_token == '>'){
    Match('>');
  } else if(current_token == '>='){
    Match('>=');
  } else if(current_token == '=='){
    Match('==');
  } else if(current_token == '!='){
    Match('!=');
  } else {
    ThrowError("Simbolo inesperado, se esperaba '<', '<', '>', '>=', '==' ó '!='");
  }
}

function arithmetic_expression(){
  term();
  arithmetic_expressionPrime();

}


function arithmetic_expressionPrime(){
  if(current_token == '+'){
    Match('+');
    term();
    arithmetic_expressionPrime();
  } else if(current_token == '-'){
    Match('-');
    term();
    arithmetic_expressionPrime();
  } else if(current_token == ',' || current_token == ';' || current_token == ']' || current_token == ')' || current_token == '<=' || current_token == '<' || current_token == '>' || current_token == '>=' || current_token == '==' || current_token == '!=') {
    return;
  } else {
    ThrowError("Simbolo inesperado, se esperaba '+', '-', ',', ';', ']', ')', '<=', '<', '>', '>=', '==' ó '!='");
  }
}

function term(){
  factor();
  termPrime();
}

function termPrime(){
  if(current_token == '*'){
    Match('*');
    factor();
    termPrime();
  } else if(current_token == '/'){
    Match('/');
    factor();
    termPrime();
  } else if(current_token == ',' || current_token == ';' || current_token == ']' || current_token == ')' || current_token == '<=' || current_token == '<' || current_token == '>' || current_token == '>=' || current_token == '==' || current_token == '!=' || current_token == '+' || current_token == '-') {
    return;
  } else {
    ThrowError("Simbolo inesperado, se esperaba '*', '/', ',', ';', ']', ')', '<=', '<', '>', '>=', '==','!=', '+' ó '-'");
  }
}

function factor(){
  //else ?
  variable();
  call();
  if(current_token == '(') {
    Match('(');
    arithmetic_expression();
    Match(')');
  } else if(current_token == 'Number') {
    Match('Number');
  } else {
    ThrowError("Simbolo inesperado, se esperaba apertura de paréntesis '(' ó un número");
  }
}


function call(){
  if(current_token == 'ID') {
    Match('ID');
    Match('(');
    args();
    Match(')');
  } else {
    ThrowError("Simbolo inesperado, se esperaba 'ID'");
  }
}

function args(){
  args_list();
}


function args_list(){
  arithmetic_expression()
  args_listPrime();
}

function args_listPrime(){
  if(current_token == ','){
    Match(',');
    arithmetic_expression();
    args_listPrime();
  } else if(current_token == ')') {
    return;
  } else {
    ThrowError("Simbolo inesperado, se esperaba ','");
  }
}







// function exp() {
//   term();
//   expPrime();
  
// }

// function expPrime() {
//   if(current_token == '+') {
//     Match('+');
//     term();
//     expPrime();
//   } else if(current_token == '-') {
//     Match('-');
//     term();
//     expPrime();
//   } else if(current_token == '$' || current_token == ')') {
//     return;
//   } else {
//     ThrowError("Simbolo inesperado, se esperaba '+' ó '-'");
//   }
// }

// function term() {
//   factor();
//   termPrime();
// }

// function termPrime() {
//   if(current_token == '*') {
//     Match('*');
//     factor();
//     termPrime();
//   } else if(current_token == '/') {
//     Match('/');
//     factor();
//     termPrime();
//   } else if(current_token == '$' || current_token == ')' || current_token == '+' || current_token == '-') {
//     return;
//   } else {
//     ThrowError("Simbolo inesperado, se esperaba '*' ó '/'");
//   }
// }

// function factor() {
//   if(current_token == '(') {
//     Match('(');
//     exp();
//     Match(')');
//   } else if(current_token == 'Number') {
//     Match('Number');
//   } else {
//     ThrowError("Simbolo inesperado, se esperaba apertura de paréntesis '(' ó un número");
//   }
// }


//Función principal del parser
export function parser(input) {
  console.log(`--------------------
| Inicio de parser |
--------------------`);

  let output = [];

  // console.log("ID: ")
  // input.forEach(e=> e[0] == "ID" && e[1] && console.log(e[1]))

  // console.log("Numeros: ")
  // input.forEach(e=> e[0] == "Number" && e[1] && console.log(e[1]))

  

  tokenList = input;

  // Se añade simbolo $ al final de lista de tokens
  tokenList.push(['$'])
  console.log(tokenList)
  current_token = Get_Next_Token();

  program();
  
  if(current_token == '$') {
    console.log("Análisis Sintáctico Correcto");
  } else {
    console.log("Análisis Sintáctico Incorrecto");
  }

  console.log(`-----------------
| End of Parser |
-----------------`);
}