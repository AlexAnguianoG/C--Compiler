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
  // Iterador de la cadena de caracteres  (código)
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

  // Función para comprobar si la cadena de caracteres  recibido es un námero entero
  function isNumeric(char) {
    return Number.isInteger(parseInt(char));
  }

  // Función para comprobar si el carácter recibido es una letra minúscula o mayúscula
  function isLetter(char) {
    return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
  }

  // Función para comprobar si la cadena de caracteres  recibida coincide con alguna palabra reservada del arreglo keywords
  function isKeyword(val) {
    if (keywords.indexOf(val) >= 0) {
      return val;
    }
  }
  // Función para comprobar si la cadena de caracteres  recibida coincide con alguna palabra reservada del arreglo special_symbols
  function isSpecialSymbol(val) {
    if (special_symbols.indexOf(val + c_next) >= 0) {
      return val + c_next;
    } else if (special_symbols.indexOf(val) >= 0) {
      return val;
    }
  }
  // Función para comprobar si la cadena de caracteres  en curso es un comentario
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
      throw "Syntax Error: Comment not closed";
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
      throw `Syntax Error: unexpected char: "${c}" at LINE:${line} COLUMN:${col}`;
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
const charStr = fs.readFileSync(fileName, "utf8");

// Desplegar nombre de archivo a escanear
console.log("\nArchivo en revisión: " + fileName + "\n");

// Despliegue de tokens
console.log("Tabla de tokens");
for (const token of scanner(charStr)) {
  console.log(token);
}

console.log(`----------------
| End of scanner |
----------------`);
