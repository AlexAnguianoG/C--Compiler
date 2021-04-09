/*

TODO'''''''''''FALTA HACER'''''''''''
- EXPLICAR FUNCIONES CON COMENTARIOS
- Ignorar blanks, new lines, tabs ---IGNORADOS?---
- Value para simbolos ---PONER NOMBRE---
- Ignorar contenido de comentarios ---IGNORADOS? 
- No comentarios dentro de id (tokens)
- Whitespace, id, num y keywords son delimitadores.
- PONER TOKENS EN TABLAS
- Dar id a tokens o lo que sea que sea
- Errores generados
  - Comment not closed
  - archivo vacio?
  - Comentario dentro de token
  - Simbolos invalidos


TODO'''''''''''ANOTACIONES'''''''''''
ELSE es id
else es keyword

Whitespace son blanks, new lines, tabs

Whitespace, id, num y keywords son delimitadores.

La tabla de símbolos incluye id's y números (No keywords ni simbolos especiales)
La tabla de tokens incluye símbolos especiales 

Cada símbolo especial y keyword debe tener un Token-ID único


TODO'''''''''''''REPORTE'''''''''''''

IEEE-830
Page numbers
Sections and subsetions
Titulos en tablas, imagenes


1. Intro
//   1.1 Summary
//     Descripcion del proyecto
//   1.2 Notation
//     Descripcion de
//       - Maquinas finitas de estados
//       - Regular expressions
//       - Tablas de transición
//     Porque del modelo para el desarrolo de analisis y diseño
//     Justificacion del lenguaje usado

2. Analisis
  Describir funcionalidades del diseño del sistema
  WHAT NOT THE HOWS
    I/O data
    Funciones que debe llevar a cabo
    Comportamientos del sistema
    Restricciones del sistema
    Interfaces definidas
  //WHAT THE COSTUMER REQUIRES
  BASIS FOR THE CREATION OF THE SOFTWARE

  Requirimientos para
    // Automata del lenguaje
    //   - El automata deberá reconocer las palabras reservadas de else, if, int, return, void, while, input y output.
    //   - El automata deberá reconocer los simbolos especiales "+", "-", "*", "/", "<", "<=", ">", ">=", "==", "!=", "=", ";", ",", "(", ")", "[", "]", "{", "}", "/*" y "*".
    //   - El automata deberá reconocer identificadores, estos conformados con letras mayusculas y minisculas.
    //   - El automata deberá reconocer numeros naturales.
    //   - El automata deberá reconocer e ignorar lineas nuevas, espacios en blanco y tabuladores.
    //   - El automata deberá reconocer comentarios en cualquier espacio en blanco del codigo, sin incluir dentro de tokens.
    Sistema
      - El usuario deberá proporcionar un codigo fuente del leguaje C--.
      - El sistema deberá reconocer las palabras reservadas de else, if, int, return, void, while, input y output.
      - El sistema deberá reconocer los simbolos especiales "+", "-", "*", "/", "<", "<=", ">", ">=", "==", "!=", "=", ";", ",", "(", ")", "[", "]", "{", "}", "/*" y "*".
      - El sistema deberá reconocer identificadores, estos conformados con letras mayusculas y minisculas.
      - El sistema deberá reconocer numeros naturales.
      - El sistema deberá reconocer e ignorar lineas nuevas, espacios en blanco y tabuladores.
      - El sistema deberá reconocer comentarios en cualquier espacio en blanco del codigo, sin incluir dentro de tokens.
      - El sistema deberá reconocer comentarios con multiples lineas de codigo.
      - El sistema deberá finalizar el programa al llegar al final del codigo examinado.
      - El sistema deberá detectar y desplegar errores cuando exista un token invalido.
      - El sistema deberá generar las tablas de tokens y de simbolos.
      - El sistema, al finalizar sin ningun error detectado, deberá desplegar las tablas de tokens y de simbolos.
    // Tabla de trancisiones
    Symbol table management
      Description of tables used.
      Method used to handle the tables.
  
  
  Requirimientos funcionaes para cada 5 entregables
    Pasos para completar cada uno
      Que se necesita hacer
      Por que
  
  Descripción y justificación de tokens e identificación
  Descripción y justificación de errores

3. Diseño
  Guide of how to develop the code
  Requirements transformados en como se implementará
  Como el sistema esta subdividido en susbsistemas
  Diagramas
    State diagram
    Flow diagram
    Module diagram
  Description of
    Algorithms
    Data structure required
  Pseudo code

4. Implementación
  Source code

5. Verificación y Validación
  VERIFICACION - el producto esta bien
    Chequeo de requirimientos funcionales y no funcionales
  VALIDACIÓN - es el producto planeado

  Software Test Cases design - Test model
    Test cases de los HOW del diseño (Flow diagram)
      Varios inputs para ejecutar función
      Documentar lo que dió
      Checar lo esperado con lo que dió
  
  

6. Referencias
  Chicago Manual Style
  
  R. Castelló, Class Lecture, Topic: “Chapter 2 – Lexical Analysis.” TC3048, School of Engineering and Science, ITESM, Chihuahua, Chih, April, 2020. 


  







Symbol Table Management en parte de diseño
Especificar estructura de dato para lista de tokens y tabla de simbolos
y algoritmos para buscar y agregar

Work plan al final del reporte

- Describir funcionalidad de archivos del sourcecode
- Relacionar requirimientos con partes del codigo
- Relacionar diseño con codigo


TODO'''''''''''DELIVERABLES'''''''''''
Automata del lenguaje
Tokens y su identificacion
Tabla de transicion
Symbol Table Management
  Description of tables used.
  Method used to handle the tables.
Error messages generated by scanner





*/

function* lex(str) {
  let keywords = [
    "else",
    "if",
    "int",
    "return",
    "void",
    "while",
    "input",
    "output",
  ];

  let specialSymbols = [
    "+",
    "-",
    "*",
    "/",
    "<=",
    "<",
    ">=",
    ">",
    "==",
    "!=",
    "=",
    ";",
    ",",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
  ];

  let entryId = 0;
  let i = 0;
  let c = str[i];
  let cNext = str[i + 1];
  let comment = "";
  let line = 1;
  let col = 1;

  function next() {
    i++;
    c = str[i];
    cNext = str[i + 1];
    col++;
  }

  function back() {
    i--;
    c = str[i];
    cNext = str[i - 1];
    col--;
  }

  function nextLine() {
    line++;
    col = 1;
  }

  function isNumeric(char) {
    return Number.isInteger(parseInt(char));
  }

  function isLetter(char) {
    return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
  }

  function isKeyword(val) {
    if (keywords.indexOf(val) >= 0) {
      return val;
    }
  }

  console.log("dasdsada " + isSpecialSymbol("<="));

  function number() {
    let value = "";
    while (isNumeric(c)) {
      value = value + c;
      next();
    }

    if (value.length >= 1) {
      entryId++;
      return {
        Id: entryId,
        type: "Number",
        Value: Number(value),
      };
    } else {
      return null;
    }
  }

  function keyword() {
    let value = "";
    let type = "ID";

    while (isLetter(c)) {
      value = value + c;
      next();
      if (isKeyword(value)) {
        type = value;
        break;
      }
    }
    if (value.length >= 1) {
      entryId++;
      return {
        Id: entryId,
        type: type,
        Value: value,
      };
    } else {
      return null;
    }
  }

  function isComment() {
    comment = "";
    let ite = 0;
    if (c === "/" && cNext === "*") {
      comment = comment + c + cNext;
      next();
      next();
      while (!endOfFile()) {
        if (c === "*" && cNext === "/") {
          comment = comment + c + cNext;
          next();
          next();
          return comment;
        }
        if (endOfLine()) {
          back();
        }
        comment = comment + c;
        next();
        ite++;
      }
      for (let j = 0; j < ite + 2; j++) {
        back();
      }
      throw "Comment not closed";
    } else {
      return null;
    }
  }

  function isSpecialSymbol(val) {
    if (specialSymbols.indexOf(val + cNext) >= 0) {
      return val + cNext;
    } else if (specialSymbols.indexOf(val) >= 0) {
      return val;
    }
  }

  function specialSymbol() {
    let val = "";
    let type = "";

    if (isComment()) {
      type = "Comment";
      val = comment;
    } else {
      while (isSpecialSymbol(c)) {
        val = val + c;
        next();
        if (isSpecialSymbol(val + cNext)) {
          break;
        }
      }
    }

    if (val.length >= 1) {
      entryId++;
      return {
        Id: entryId,
        type: type,
        Value: val,
      };
    } else {
      return null;
    }
  }

  function whitespace() {
    let value = "";

    while (c === " " || c === "\t" || c === "\v") {
      value = value + c;
      next();
    }

    if (value.length >= 1) {
      return {
        type: "Whitespace",
        value: value,
      };
    } else {
      return null;
    }
  }

  function endOfLine() {
    if (c === "\n" || c === "\r") {
      next();
      let val = c;
      next();
      nextLine();
      return {
        type: "EndOfLine",
        value: val,
      };
    } else {
      return null;
    }
  }

  function endOfFile() {
    if (c === undefined) {
      return {
        type: "EndOfFile",
      };
    } else {
      return null;
    }
  }

  while (1) {
    const token =
      whitespace() ||
      specialSymbol() ||
      keyword() ||
      endOfLine() ||
      number() ||
      endOfFile();

    if (token) {
      if (token.type === "Whitespace" || token.type === "EndOfLine") {
        continue;
      }
      // if (token.type === "EndOfLine") {
      //   yield token;
      // }
      yield token;
      if (token.type === "EndOfFile") {
        break;
      }
    } else {
      throw `unexpected char: "${c}" at LINE:${line} COLUMN:${col}`;
    }
  }
}

console.log(`----------------
|Start of lexer|
----------------`);

const fileName = "./test/test2.txt";

let fs = require("fs");

const input = fs.readFileSync(fileName, "utf8");
console.log("Tabla de tokens");
for (const token of lex(input)) {
  console.log(token);
}

console.log(`----------------
| End of lexer |
----------------`);
