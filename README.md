## Curso : Talento Tech - Node JS -
### 2°Cuatrimestre 2025
### Docente: Gustavo Ovejero
### Descripcion del proyecto
#### Se realizo una API de productos que permite utilizar datos de manera persistente utilizando dos modos de almacenamiento:
#### 1.- Archivo local, utilizando fs, modulo nativo de Node.js.
#### 2.- Archivo en Mockapi, simulando una base de datos externa.
##### Para todas las consultas del CRUD, el servidor corre en:  https://localhost:3000/productos
[Consulta para local o remoto](https://localhost:3000/productos)
#### y en la terminal la seleccion de donde consultar es con los scripts (incluidos en el package-json):
----------------------- **npm run fs**----------------**npm run mock**-------------------------
### **Siempre corriendo el servidor con https://localhost:3000/productos**
##### Se utilizo el modulo nativo de node : process con la variable const modo = process.argv[2], donde se elige el modo, dejando por defecto fs.
##### Las validaciones del crud, figuran para cada seleccion, y las dos bases (fs y mockapi) almacenan distinta informacion.

#### Se utilizo:
##### JS ---- Node ---- Nodemon ---- Express ---- fs ---- path ---- Postman ----

#### Estructura del proyecto:
```
├── node_modules/
├── src/
│   ├── routes/
│   │   └── productos.routes.js
│   ├── data/
│   │   └── productos.json
│   └── app.js
├── .gitignore
└── README.md
```

#### Endpoints del CRUD
#### [GET Trae todos los productos](https://localhost:3000/productos)   
#### [GET Trae el producto por su Id](https://localhost:3000/productos/:id)
#### [POST Cargar nuevos productos, con body, row, json](https://localhost:3000/productos)
```
{
"product": "Tv",
"description": "Tv 40",
"price": 1500,
"stock": 12,
"img": "imagen no disponible",
"category" : "electronica"
}
```
#### [PUT Modificar campo por Id del producto](https://localhost:3000/productos/:id)
#### [DELETE Eliminar producto por Id](https://localhost:3000/productos/:id)


##### No hay vistas en este proyecto en paginas HTML, ni con React, Handlebars,etc, solo esta estructura del back end.

<div align="center">
👨‍💻 Autor

Desarrollado por: Ignacio López Barg
📅 Año: 2025
📚 Curso: Talento Tech - Node.js

</div>
