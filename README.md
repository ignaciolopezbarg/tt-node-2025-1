## Curso : Talento Tech - Node JS -
### 2°Cuatrimestre 2025
### Docente: Gustavo Ovejero
#### Se realizo una API que vincula los productos, para lograr la persistencia con:
#### 1.- Archivo local, utilizando fs, modulo nativo de Node.
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

#### Consultas
#### [GET Trae todos los productos](https://localhost:3000/productos)   
#### [GET Trae el producto por su Id](https://localhost:3000/productos/:id)
#### [POST Cargar nuevos productos, con body, row, json](https://localhost:3000/productos)
#### [PUT Modificar campo por Id del producto](https://localhost:3000/productos/:id)
#### [DELETE Eliminar producto por Id](https://localhost:3000/productos/:id)

##### No hay vistas en este proyecto en paginas HTML, ni con React, Handlebars,etc, solo esta estructura del back end.
