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
    Reinputicciones del sistema
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
    Data inputucture required
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
Especificar einputuctura de dato para lista de tokens y tabla de simbolos
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

//Función principal del escáner
function* scanner(input) {
  // Arreglo con palabras reservadas validas
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
  //Arreglo con simbolos especiales validos
  let special_symbols = [
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

  //Variables para el control del programa
  // Variable para identificación del token
  let entryId = 0;
  // Iterador de la cadena de carácteres (código)
  let i = 0;
  // Carácter en curso de la cadena de caracteres
  let c = input[i];
  // Carácter consiguiente al caracter en curso
  let c_next = input[i + 1];
  // Buffer de comentarios
  let comment = "";
  // Iterador de linea de codigo
  let line = 1;
  // Iterador de columna de la linea
  let col = 1;

  // Función para llevar a cabo un salto al siguiente carácter de la cadena
  function next() {
    i++;
    col++;
    c = input[i];
    c_next = input[i + 1];
  }

  // Función para llevar a cabo un salto al anterior carácter de la cadena
  function back() {
    i--;
    c = input[i];
    c_next = input[i - 1];
    col--;
  }

  // Función para el control del iterador de lineas y columnas
  function nextLine() {
    line++;
    col = 1;
  }

  // Función para comprobar si la cadena de carácteres recibido es un námero entero
  function isNumeric(char) {
    return Number.isInteger(parseInt(char));
  }

  // Función para comprobar si el carácter recibido es una letra minúscula o mayúscula
  function isLetter(char) {
    return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
  }

  // Función para comprobar si la cadena de carácteres recibida coincide con alguna palabra reservada del arreglo keywords
  function isKeyword(val) {
    if (keywords.indexOf(val) >= 0) {
      return val;
    }
  }
  // Función para comprobar si la cadena de carácteres recibida coincide con alguna palabra reservada del arreglo special_symbols
  function isSpecialSymbol(val) {
    if (special_symbols.indexOf(val + c_next) >= 0) {
      return val + c_next;
    } else if (special_symbols.indexOf(val) >= 0) {
      return val;
    }
  }
  // Función para comprobar si la cadena de carácteres en curso es un comentario
  function isComment() {
    comment = "";
    let ite = 0;
    // Checar si se la cadena inicia con "/*"
    if (c === "/" && c_next === "*") {
      comment = comment + c + c_next;
      next();
      next();
      // While para encontrar la terminación del comentario con "*/"
      while (!endOfFile()) {
        if (c === "*" && c_next === "/") {
          comment = comment + c + c_next;
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
      // Desplegar error por no haber encontrado la finalización del comentario con "*/"
      throw "Comment not closed";
    } else {
      return null;
    }
  }

  // Funcion principal de reconocimiento de numeros
  function number() {
    let value = "";
    // Reconocer si el caracter siguiente es tambien un numero, si  es así,
    //  almacenar numero y comprobar con el siguiente
    while (isNumeric(c)) {
      value = value + c;
      next();
    }
    // En caso de encontrar un numero, regresarlo para el almacenamiento del token
    if (value.length >= 1) {
      entryId++;
      return {
        Id: entryId,
        Value: Number(value),
      };
    } else {
      //En caso de no encontrar un numero, regresar null
      return null;
    }
  }

  // Funcion principal de reconocimiento de palabras reservadas
  function keyword() {
    let value = "";
    // Checar si es una letra, y verificar si es una palabra reservada
    while (isLetter(c)) {
      value = value + c;
      next();
      if (isKeyword(value)) {
        break;
      }
    }
    // En caso de encontrar una palabra reservada, regresarlo para el almacenamiento del token
    if (value.length >= 1) {
      entryId++;
      return {
        Id: entryId,
        Value: value,
      };
    } else {
      //En caso de no encontrar una palabra reservada, regresar null
      return null;
    }
  }

  // Funcion principal de reconocimiento de símbolos especiales
  function specialSymbol() {
    let val = "";

    // Checar si un comentario inicia
    if (isComment()) {
      // val = comment;
      // Descomentar anterior linea y comentar la siguiente linea para verificar reconocimiento de comentario
      return "";
    } else {
      // Reconocer si el caracter es un símbolo especial, si  es así, almacenarlo
      while (isSpecialSymbol(c)) {
        val = val + c;
        next();
        if (isSpecialSymbol(val)) {
          break;
        }
      }
    }

    // En caso de encontrar un símbolo especial, regresarlo para el almacenamiento del token
    if (val.length >= 1) {
      entryId++;
      return {
        Id: entryId,
        Value: val,
      };
    } else {
      //En caso de no encontrar un símbolo especial, regresar null
      return null;
    }
  }

  // Funcion principal de reconocimiento de espacios en blanco
  function whitespace() {
    let value = "";
    // Checar si el carácter en curso, y los siguientes son espacios en blanco
    while (c === " " || c === "\t" || c === "\v") {
      value = value + c;
      next();
    }
    // En caso de encontrar un símbolo especial, regresarlo para el caso que necesite almacenarse
    if (value.length >= 1) {
      return {
        type: "Whitespace",
        value: value,
      };
    } else {
      //En caso de no encontrar un espacio, regresar null
      return null;
    }
  }

  // Funcion principal de reconocimiento de saltos de linea
  function endOfLine() {
    // Checar si se un salto de linea es iniciado, para así incrementar 1 al iterador de lineas
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
      //En caso de no encontrar un salto de linea, regresar null
      return null;
    }
  }

  // Funcion principal de reconocimiento del final del archivo
  function endOfFile() {
    // El carácter será undefined despues de comprobar todos los cáracteres del input proporcionado
    if (c === undefined) {
      return {
        type: "EndOfFile",
      };
    } else {
      //En caso de no encontrar un numero, regresar null
      return null;
    }
  }

  while (1) {
    // Comprobar que el cáracter en curso es un token válido
    const valid_Token =
      whitespace() ||
      specialSymbol() ||
      keyword() ||
      endOfLine() ||
      number() ||
      endOfFile();

    // En caso de que sea un token válido, comprobar si es un espacio en blanco o el fin del archivo
    if (valid_Token) {
      //Ignorar espacios en blanco y saltos en linea, saltar almacenamiento estos en tablas
      if (
        valid_Token.type === "Whitespace" ||
        valid_Token.type === "EndOfLine"
      ) {
        continue;
      }
      // Terminar programa al encontrar el final del archivo
      if (valid_Token.type === "EndOfFile") {
        break;
      }
      // Regresar token valido, para su almacenamiento en tabla
      yield valid_Token;
    } else {
      // En caso de encontrar un carácter no válido desplegar error, con la posición de este en el archivo
      throw `unexpected char: "${c}" at LINE:${line} COLUMN:${col}`;
    }
  }
}

console.log(`----------------
|Start of scanner|
----------------`);

// Archivo a escanear
const fileName = "./test/test.txt";

// Import para leer archivos
let fs = require("fs");

// Lectura de archivo, se almacena la cadena input
const input = fs.readFileSync(fileName, "utf8");

// Desplegar nombre de archivo a escanear
console.log("\nArchivo en revisión: " + fileName + "\n");

// Despliegue de tokens
console.log("Tabla de tokens");
for (const token of scanner(input)) {
  console.log(token);
}

console.log(`----------------
| End of scanner |
----------------`);
