let tokenList;
let tokenIndex = -1;
let current_token;

function Get_Next_Token() {
  tokenIndex++;
  return(tokenList[tokenIndex][0]);
}

function Match(terminalToken) {
  console.log(current_token)
  if(current_token == terminalToken) {
    current_token = Get_Next_Token()
  } else {
    ThrowError(`Match incorrecto, se esperaba '${terminalToken}' en lugar de ${current_token}`);
  }
}

function ThrowError(msg) {
  throw new Error(`Error Sintáctico: ${msg}, en la posicion (${tokenIndex+1}) de la lista de tokens.\n\n\n`);
}

function program() {
  if(current_token == 'void' || current_token == 'int' ){
    declaration_list();
  } else {
    ThrowError("Símbolo inesperado, se esperaba inicio del programa con 'void' o 'int'")
  }
}

function declaration_list(){
  if(current_token == 'void' || current_token == 'int' ){
    declaration();
    declaration_listPrime();
  }
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
    ThrowError("Símbolo inesperado, se esperaba 'int' o 'void'");
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
    ThrowError("Símbolo inesperado, se esperaba ',' o ')'");
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
    ThrowError("Símbolo inesperado, se esperaba 'ID', '{', '}', 'if', 'while', 'return', 'input' o 'output'");
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
}

function expression(){
  
  if(current_token == 'ID' || current_token == 'Number' || current_token == '('){
    arithmetic_expression();
    relop();
    //
    arithmetic_expression();
  }
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
    ThrowError("Símbolo inesperado, se esperaba '+', '-', ',', ';', ']', ')', '<=', '<', '>', '>=', '==' o '!='");
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
    ThrowError("Símbolo inesperado, se esperaba '*', '/', ',', ';', ']', ')', '<=', '<', '>', '>=', '==','!=', '+' o '-'");
  }
}

function factor(){
  if(current_token == 'ID'){
    variable();
    call();
  } else if(current_token == '(') {
    Match('(');
    arithmetic_expression();
    Match(')');
  } else if(current_token == 'Number') {
    Match('Number');
  } else {
    ThrowError("Símbolo inesperado, se esperaba apertura de paréntesis '(' o un número");
  }
}


function call(){
  if(current_token == 'ID') {
    Match('ID');
    Match('(');
    args();
    Match(')');
  } 
}

function args(){
  if(current_token == 'ID' || current_token == 'Number' || current_token == '('){
    args_list();
  }
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


//Función principal del parser
export function parser(input) {
  console.log(`--------------------
| Inicio de parser |
--------------------`);

  let output = [];

  tokenList = input;

  tokenList.push(['$'])
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