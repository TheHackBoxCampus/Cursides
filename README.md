## Cursides School

### Proyecto de cursos en linea:
Este proyecto constara con las siguientes tablas: 
- ``capitulo``
- ``categoria``
- ``curso``
- ``docente``
- ``especializacion``
- ``estado_leccion``
- ``inscripcion``
- ``leccion``
- ``progreso``
- ``usuario``

## Objetivo general
Brindar al internauta un contenido de apoyo y de calidad sobre desarrollo web, donde el consumidor pueda incrementar sus habilidades en el entorno de la programación y sus diferentes tecnologias. Tendra acceso a cursos, lecciones, categorias, comentarios, lo que que hace que la navegación tenga mas interactividad.

## Objetivos especificos
- Endpoint donde el usuario pueda ingresar a su cuenta y crear una sesión.
- Endpoint para el registro de usuarios
- Endpoint donde el usuario consulte la informacion de los cursos donde se ha inscrito
- Inscripciones para cada curso
- Mostrar los capítulos de un curso y el número de lecciones en cada capítulo
- Mostrar la cantidad de usuarios inscritos en cada categoría de cursos.
- Listar los docentes y su cantidad de especializaciones.
- Obtener el progreso de un usuario en un curso (El estado de las lecciones)

## Tecnologias a utilizar 
- ``Node.js``
- ``Javascript``
- ``Typescript``
- ``sql``
- ``Express.js``	

## Diagrama 
<img src="diagram/diagram.png">


## inicialización del proyecto
Para iniciar el proyecto necesitas clonar el repositorio.

```bash
git clone 'URL' 
cd proyect 
```

  Una vez clonado instala las dependencias.  

> - ``Express``
> - ``nodemon``
> - ``dotenv``
> - ``class-transformer``
> - ``class-validator``
> - ``reflect-metadata``
> - ``typescript``
> - ``mysql``
> - ``jose``
> - ``argon2``
> - ``nanoid``

```bash
npm install
```

### Configuramos el nodemon en el package-json


 ```json
    "scripts": {
    "dev": "nodemon --quiet app.js"
  }
 ```

## Configurar typescript, para compilar codigo:
- Crear un archivo ``tsconfig.json``
- Colocar la configuración correspondiente

```json
{
    "compilerOptions" : {
      "target": "es6",
      "module": "ES6",
      "moduleResolution": "node",
      "outDir": "./controller",
      "esModuleInterop": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true
    }
} 
```
### Configurar el typescript en el package-json
```json 
"scripts": {
    "tsc": "tsc -w"
}
```

## Despligue 
Para desplegar el nodemon y typescript, deberas escribir el siguiente comando:
```bash
npm run /*name script*/
```
Si seguimos el ejemplo del proyecto
```bash
npm run dev | npm run tsc
```


## Configurar Express y lanzar servidor

Para que los endpoints tengan funcionamiento con el `` Router ``  de express, primero tenemos que desplegar un servidor 
```js
import express from 'express';
let app = express();

let config = {
    hostname : "IP",
    port: "port"
};

app.listen(config, () => {
    console.log(`server lanzado en http://${config.hostname}:${config.port}`);
})
```
Configuramos los middleware para que acepte valores json y de texto
```javascript
import express from 'express';
let app = express(); 
// middleware
app.use(express.text())
app.use(express.json())
```
Con el ``Router`` de express en nuestro archivo app.js definimos la ruta principal llamada dbCampus
```javascript
// importamos las rutas de nuestro archivo routes, /* mas informacion mas adelante */
import express from 'express';
import router from './router/routes.js'
let app = express(); 

app.use("consultas", router); 
```


## Conexión con base de datos MYSQL

Para la conexion se utilizan variables de entorno para administrar credenciales

- El archivo .env cuenta con estos datos 
- Archivo de guia .env-example

Para su uso se configura el archivo .env

```markdown
config={...data}
```
- En el archivo database importas la libreria `` dotevn `` para el reconocimiento de las variables definidas con anterioridad

- importas mysql para efectuar la conexión

- Ejecutas el metodo ``config()`` de la libreria ``dotenv``

- El process.env reconoce las variables de entorno, una vez ya ejecutado el metodo ``config()``, el process.env.config es el nombre del json definido en el archivo .env, en caso de cambiar el nombre deberas cambiarlo tambien en la variable

- En mysql con ``createConnection()`` lanzas la conexion, le pasas las variables previamente definidas ``createConnection(vars)`` y ejecutas un callback a la variables de conexion creada con el metodo ``connect()`` para retornar un valor en caso de que se conecte y de que NO se conecte.

- Exportas la conexion para ejecutarla en el router
```javascript
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config() // variables de entorno
let variables = process.env.config 

let connection = mysql.createConnection(variables); 
connection.connect((err) =>  err ? console.log(err) : console.log("connect!!!!!")); 

export default connection; 
```

## Enrutado con Router / Express 

### Consultas HTTP en Router / Express

Para ejecutar esta consultas:
- Importar el MODULO ``Router`` de express
- importar la conexión exportada con anterioridad

En mi caso utilice la libreria nanoID para ids aleatorias no repetibles, puedes utilizar mas metodos u otras librerias para hacer este paso (opcional).
- Importamos el modulo ``customAlphabet`` de nanoID
- definimos el  ``Router`` en una variable
- Efectuamos lógica para las consultas ``http``

```javascript
import { Router } from "express";
import { customAlphabet } from "nanoid";
import connection from "./config/database.js";

let router = Router(); 

// diferentes metodos get, post, put, delete
router.get(/*query*/, (req, res) => {
    err ? 
        res
          .send(err)
        :
         // logica de consulta
} )
```

## DTO 
Tus datos necesitan seguridad, ¿Cómo se puede garantizar una seguridad?, Precisamente con los Data Transfer Object (Transferencia de los datos), El dto es una capa de abstraccion que nos permite transformar y manipular los datos de la forma que queramos, por ende dando validaciones y permisos, lo que hace que tus datos lleguen de manera mas segura al backend de tu aplicacion.

Para la utilizacion de los dto: 
-  Se utilza javascript tipado, teniendo en cuenta de que typescript se compila a javascript y el funcionamiento de los tipados es unicamente en el proceso de compilación no de ``Ejecucion`` 
- Por lo mismo se utilizan las librerias, para informar los errores cuando se detecten en la compilacion

### Ejemplo de un dto con los decoradores
```ts
// libraries 
import { Transform, Expose } from "class-transformer";

class CLASS {
  @Expose({ name: "prop" })
  @Transform(({ value }) => {
     // * validations
  })
  prop: number;
  constructor(prop: number) {
    this.prop = prop;
  }
}

export default CLASS;
```

## JWT (Json Web Tokens)
Los datos estan un poco mas sanitizados pero ¿Cómo puedo autorizar al usuario o dar permisos al usuario?, El algoritmo HS256 del tipo JWT permite crear tokens, que son los tokens, El token es una referencia (un identificador) que regresa a los datos sensibles a través de un sistema de tokenización.

### ¿Que funcionamiento tienen los tokens?
En el mismo se define un mecanismo para poder propagar entre dos partes, y de forma segura, la identidad de un determinado usuario, además con una serie de claims o privilegios.

Estos privilegios están codificados en objetos de tipo JSON, que se incrustan dentro de del payload o cuerpo de un mensaje que va firmado digitalmente.

### Ejemplo de token
<img src="https://dc722jrlp2zu8.cloudfront.net/media/uploads/2019/12/04/cap1-seguridad2.png">

### Estructura de un token 
<img src="https://byte-mind.net/wp-content/uploads/2022/02/jwt-parts.png">

* Header: encabezado dónde se indica, al menos, el algoritmo y el tipo de token, que en el caso del ejemplo anterior era el algoritmo HS256 y un token JWT.

* Payload: donde aparecen los datos de usuario y privilegios, así como toda la información que queramos añadir, todos los datos que creamos convenientes.

* Signature: una firma que nos permite verificar si el token es válido, y aquí es donde radica el quid de la cuestión, ya que si estamos tratando de hacer una comunicación segura entre partes y hemos visto que podemos coger cualquier token y ver su contenido con una herramienta sencilla, ¿dónde reside entonces la potencia de todo esto?


### Ejemplo en codigo 
Para la utilización del token JWT, se puede implementar con la libreria jsonwebtokens, pero en este caso aprovechando los modulos de la libreria ``jose``
```js
import { SignJWT, jwtVerify } from "jose";
```
Verificar el token:
```js
// jwtverify
try {
  let encoder = new TextEncoder();
  let jwtaccess = await jwtVerify(token, encoder.encode(key));
  next();
} catch (err) {
  res.send({ status: 401, message: "token invalid" });
}
```
Crear el token:
```js
// SignJWT
let encoder = new TextEncoder(); // encoder 
let jwtConstruct = new SignJWT({ structure...});
let jwt = await jwtConstruct
  .setProtectedHeader({ alg: "HS256", typ: "JWT" })
  .setIssuedAt()
  .setExpirationTime(time)
  .sign(encoder.encode(key));
res.cookie(`auth`, jwt, {
  httpOnly: true, // ! cookie readonly
});
```
De esta manera, puedes configurar tus tokens y agregar una capa de seguridad en tu aplicacion 😄

## Argon2 
¿Seguridad para las contraseñas?, todos sabemos que las contraseñas deben estar seguras, precisamente por ello se utiliza la libreria argon2 // * Aunque no es la unica.

Argon2 permite crear un hash para las contraseñas, patrones de 97 caracteres aleatorios para encriptar tus contraseñas, Así los hackers no sabran tu contraseña 😃

### Ejemplo en codigo
```js
import argon2 from "argon2"; 

let password = argon2.hash("text") // password => Promise
Promise.resolve(password).then(ps=> ps)
```
Puedes hashear la contraseña que pasa el usuario y subir el hash a la base de datos 😚

### Ejemplo de hash creado con ``argon2``
<img src="https://pbs.twimg.com/media/DspDZDSV4AAwCXr.jpg">

Listo de esta forma es como puedes hashear tus contraseñas para una mayor seguridad. 

## Nanoid
Nanoid es una biblioteca de software que genera identificadores únicos, cortos y aleatorios. Su funcionamiento se basa en el uso de caracteres seguros y aleatorios para crear IDs que son altamente improbables de duplicarse. Es ampliamente utilizado en el desarrollo web y aplicaciones para generar identificadores únicos de manera eficiente y segura.

### Ejemplo en codigo 
```js
import {nanoid} from "nanoid"; 

let randomID = nanoid();
console.log(randomID) // "V1StGXR8_Z5jdHi6B-myT"
```

## Mas información de las librerias utilizadas
- class validator
[![class-validator](https://github.com/typestack/class-validator/workflows/CI/badge.svg)](https://github.com/typestack/class-validator.git)

- class transformer
[![class-transformer](https://github.com/typestack/class-validator/workflows/CI/badge.svg)](https://github.com/typestack/class-transformer.git)

- reflect metadata
[![reflect-metadata](https://github.com/typestack/class-validator/workflows/CI/badge.svg)](https://github.com/rbuckton/reflect-metadata.git)

- NanoID
[![nanoid](https://github.com/typestack/class-validator/workflows/CI/badge.svg)](https://github.com/ai/nanoid.git)

- argon2 [![argon2](https://camo.githubusercontent.com/87c66b56461ab57e8c04a75255ee1c14fe9cd0a7269adcbbf8079cce7e2c5d17/68747470733a2f2f696d672e736869656c64732e696f2f6f70656e636f6c6c6563746976652f616c6c2f6e6f64652d6172676f6e322e7376673f7374796c653d666c61742d737175617265)](https://www.npmjs.com/package/argon2)


## Funcionamiento de la aplicación 

1 Ruta ``/ingresar/:usuario/:contraseña``

Para este punto de acceso necesitaras ingresar 2 parametros en la URL

```json
POST => /ingresar/estebanGameplay/jose12354
```

- ! Este usuario ``estebanGameplay/jose12354`` esta registrado. Puedes utilizar y probar las otras consultas con el.
- Coloca tus credenciales y si pasa los filtros tendras acceso.

### Cosas a tener en consideracion

- No utilizar caracteres especiales
- No utilizar consultas SQL
- No utilzar sentencias fuera de lo esperado

** En caso contrario recibiras excepciones.**

-------------------------------------------------------------------------------------------------------------------

2 Ruta ``/registro/:usuario/:nueva_clave/:correo``

Para este punto de acceso necesitaras ingresar 3 parametros en las URL 

```json 
POST => /registro/``param``/``param``/``param``
```
- Una vez realizado el registro puedes utilizar los otros puntos de acceso.

### Cosas a tener en consideracion

- No utilizar caracteres especiales
- No utilizar consultas SQL
- No utilzar sentencias fuera de lo esperado

** En caso contrario recibiras excepciones.**

-------------------------------------------------------------------------------------------------------------------

3 Ruta ``/informacion_cursos``

Para este punto de acceso NO necesitaras enviar datos

```json
GET => /informacion_cursos
```

El punto de acceso te mandara la información de en que cursos estas actualmente.

-------------------------------------------------------------------------------------------------------------------

4 Ruta ``/inscripcion/:id_curso``

Para este punto de acceso necesitaras Ingresar 1 parametro en la URL

```json
POST => /inscripcion/1 || 2 || 3 ....
```

- Una vez enviado el registro, estaras dentro del curso.

### Cosas a tener en consideracion

- No utilizar caracteres especiales
- No utilizar consultas SQL
- No utilzar sentencias fuera de lo esperado
- Enviar parametros de tipo NUMBER

** En caso contrario recibiras excepciones.**

-------------------------------------------------------------------------------------------------------------------

5 Ruta ``/lecciones_capitulo``

Para este punto de acceso NO necesitaras enviar datos

```json
GET => /lecciones_capitulo
```

te mostrara los capítulos de un curso y el número de lecciones en cada capítulo

-------------------------------------------------------------------------------------------------------------------

6 Ruta ``/usuarios_inscritos``

Para este punto de acceso NO necesitaras enviar datos

```json
GET => /usuarios_inscritos
```
Te mostrara la cantidad de usuarios inscritos en cada categoría de cursos.

-------------------------------------------------------------------------------------------------------------------

7 Ruta ``/docentes``

Para este punto de acceso NO necesitaras enviar datos

```json
GET => /docentes
```
Lista los docentes y su cantidad de especializaciones.

-------------------------------------------------------------------------------------------------------------------

8 Ruta ``/lecciones_capitulo``

Para este punto de acceso NO necesitaras enviar datos

```json
GET => /lecciones_capitulo
```
Obtiene el progreso de un usuario en un curso (el estado de las lecciones)

