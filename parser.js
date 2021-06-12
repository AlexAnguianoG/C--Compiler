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
//     ThrowError("Símbolo inesperado, se esperaba 'a'");
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
//     ThrowError("Símbolo inesperado, se esperaba '(' ó 'a' ");
//   }
// }




function Get_Next_Token() {
  tokenIndex++;
  return(tokenList[tokenIndex][0]);
}

function Match(terminalToken) {
  console.log(current_token + "  " + tokenList[tokenIndex][1])
  if(current_token == terminalToken) {
    current_token = Get_Next_Token()
  } else {
    ThrowError(`Match incorrecto, se esperaba '${terminalToken}' en lugar de ${current_token}`);
  }
}

function ThrowError(msg) {
  // console.log( tokenIndex +" aqui " + current_token)
  throw new Error(`Error Sintáctico: ${msg}, en la posición (${tokenIndex+1}) de la lista de tokens.\n\n\n`);
  //Agregar linea de codigo
}


function program() {
  if(current_token == 'void' || current_token == 'int' ){
    declaration_list();
  } else {
    ThrowError("Símbolo inesperado, se esperaba inicio del programa con 'void' ó 'int'")
  }
}

function declaration_list(){
  if(current_token == 'void' || current_token == 'int' ){
    declaration();
    declaration_listPrime();
  }
  //return
}

function declaration_listPrime(){
  if(current_token == 'void' || current_token == 'int' ){
    declaration();
  } else if (current_token == '$') {
    return;
  } else {
    ThrowError("Símbolo inesperado, se esperaba fin de declaración");
  }
}

function declaration(){
    if(current_token == 'int'){
      var_declaration();
    }
    if(current_token == 'void' || current_token == 'int' ){
      fun_declaration();
    } 
    
  // else epsilon?
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
    Match(';');
  } else {
    ThrowError("Símbolo inesperado, se esperaba 'int");
  }
}

function type_specifier(){
  if(current_token == 'int') {
    Match('int');
  } else if(current_token == 'void') {
    Match('void');
  } else {
    ThrowError("Símbolo inesperado, se esperaba 'int' ó 'void'");
  }
}

function fun_declaration(){
  if(current_token == 'void' || current_token == 'int' ){
    type_specifier();
    if(current_token == 'ID') {
      Match('ID');
      Match('(')
      params();
      Match(')')
      compound_stmt();
    }
  } else {
    ThrowError("Símbolo inesperado, se esperaba 'ID'");
  }
}

function params(){
  if (current_token == 'int') {
    param_list();
  } else if(current_token == 'void' ){
    Match('void');
  } else if (current_token == '$'|| current_token == ')') {
    return;
  } else {
    ThrowError("Símbolo inesperado, se esperaba fin de declaración");
  }
}

function param_list(){
  if (current_token == 'int') {
    param();
    param_listPrime();
  }
}

function param_listPrime(){
  if(current_token == ',') {
    Match(',');
    param();
    param_listPrime();
  } else if(current_token == ')') {
    return;
  } else {
    ThrowError("Símbolo inesperado, se esperaba ',' ó ')'");
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
    ThrowError("Símbolo inesperado, se esperaba 'int'");
  }
}

function compound_stmt(){
  if(current_token == '{') {
    Match('{');
    local_declarations();
    statement_list();
    Match('}');
  } else {
    ThrowError("Símbolo inesperado, se esperaba '{");
  }
}

function local_declarations(){
  local_declarationsPrime();
}

function local_declarationsPrime(){
  if (current_token == 'int') {
    var_declaration();
    local_declarationsPrime();
  } else if(current_token == 'ID' || current_token == '{' || current_token == '}' || current_token == 'if' || current_token == 'while' || current_token == 'return' || current_token == 'input' || current_token == 'output') {
    return;
  } else {
    ThrowError("Símbolo inesperado, se esperaba 'ID', '{', '}', 'if', 'while', 'return', 'input' ó 'output'");
  }
}

function statement_list(){
  if(current_token == 'ID' || current_token == '{' || current_token == '}' || current_token == 'if' || current_token == 'while' || current_token == 'return' || current_token == 'input' || current_token == 'output') {
    statement_listPrime();
  }
}
function statement_listPrime(){
  if(current_token == 'ID' || current_token == '{' || current_token == 'if' || current_token == 'while' || current_token == 'return' || current_token == 'input' || current_token == 'output') {
    statement();
    statement_listPrime(); 
  } else if(current_token == '}') {
    return;
  } else {
    ThrowError("Símbolo inesperado, se esperaba '}'");
    // ThrowError("Símbolo inesperado, se esperaba 'ID', '{', '}', 'if', 'while', 'return', 'input' ó 'output'");
  } 
}

function statement(){
  if(current_token == 'ID'){
    assignment_stmt();
  } else if(current_token == 'ID'){
    call_stmt();
  } else if(current_token == '{'){
    compound_stmt();
  } else if(current_token == 'if'){
    selection_stmt();
  } else if(current_token == 'while'){
    iteration_stmt();
  } else if(current_token == 'return'){
    return_stmt();
  } else if(current_token == 'input'){
    input_stmt();
  } else if(current_token == 'output'){
    output_stmt();
  } 
  //Intercambio assignment y call 
}



function assignment_stmt(){
  if(current_token == 'ID'){
    variable();
    Match('=');
    expression();
    Match(';');
  }
}

function call_stmt(){
  if(current_token == 'ID'){
    call();
    Match(';');
  }
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
    ThrowError("Símbolo inesperado, se esperaba 'if");
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
    ThrowError("Símbolo inesperado, se esperaba 'while");
  }
}

function return_stmt(){
  if(current_token == 'return') {
    Match('return');
    if(current_token == ';'){
      Match(';');
      //O poner expression al principio
    } else {
      expression();
      Match(';');
    }
  } else {
    ThrowError("Símbolo inesperado, se esperaba 'return");
  }
}

function input_stmt(){
  if(current_token == 'input') {
    Match('input');
    variable();
    Match(';');
  } else {
    ThrowError("Símbolo inesperado, se esperaba 'input");
  }
}

function output_stmt(){
  if(current_token == 'output') {
    Match('output');
    expression();
    Match(';');
  } else {
    ThrowError("Símbolo inesperado, se esperaba 'output");
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
  } 
  // else {
  //   ThrowError("Símbolo inesperado, se esperaba 'ID'");
  // }
}

function expression(){
  
  if(current_token == 'ID' || current_token == 'Number' || current_token == '('){
    arithmetic_expression();
    relop();
    //
    arithmetic_expression();
  }
  // Otro?
  // arithmetic_expression();
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
  } 
  // else {
  //   ThrowError("Símbolo inesperado, se esperaba '<', '<', '>', '>=', '==' ó '!='");
  // }
}

function arithmetic_expression(){
  if(current_token == 'ID' || current_token == 'Number' || current_token == '('){
    term();
    arithmetic_expressionPrime();
  }
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
    ThrowError("Símbolo inesperado, se esperaba '+', '-', ',', ';', ']', ')', '<=', '<', '>', '>=', '==' ó '!='");
  }
}

function term(){
  if(current_token == 'ID' || current_token == 'Number' || current_token == '('){
    factor();
    termPrime();
  }
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
    ThrowError("Símbolo inesperado, se esperaba '*', '/', ',', ';', ']', ')', '<=', '<', '>', '>=', '==','!=', '+' ó '-'");
  }
}

function factor(){
  if(current_token == 'ID'){
    variable();
    call();
    //problem
  } else if(current_token == '(') {
    Match('(');
    arithmetic_expression();
    Match(')');
  } else if(current_token == 'Number') {
    Match('Number');
  } else {
    ThrowError("Símbolo inesperado, se esperaba apertura de paréntesis '(' ó un número");
  }
}


function call(){
  if(current_token == 'ID') {
    Match('ID');
    Match('(');
    args();
    Match(')');
  } 
  // else {
  //   ThrowError("Símbolo inesperado, se esperaba 'ID'");
  // }
}

function args(){
  if(current_token == 'ID' || current_token == 'Number' || current_token == '('){
    args_list();
  }
  // else if(current_token == ')') {
  //   return;
  // } else {
  //   ThrowError("Símbolo inesperado, se esperaba ')'");
  // }
}


function args_list(){
  if(current_token == 'ID' || current_token == 'Number' || current_token == '('){
    arithmetic_expression()
    args_listPrime();
  }
}

function args_listPrime(){
  if(current_token == ','){
    Match(',');
    arithmetic_expression();
    args_listPrime();
  } else if(current_token == ')') {
    return;
  } else {
    ThrowError("Símbolo inesperado, se esperaba ','");
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
//     ThrowError("Símbolo inesperado, se esperaba '+' ó '-'");
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
//     ThrowError("Símbolo inesperado, se esperaba '*' ó '/'");
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
//     ThrowError("Símbolo inesperado, se esperaba apertura de paréntesis '(' ó un número");
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

  // Se añade Símbolo $ al final de lista de tokens
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