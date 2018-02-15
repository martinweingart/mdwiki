# MDWiki

Es una wiki de archivos .md en un servidor Node.js, con interfaz desarrollada con Vue.js.

La wiki es actualizada instantáneamente al momento de modificar los archivos y/o carpetas gracias a WebSockets. Utiliza la librería socket.io.

## Configuración

Crear archivo config.private con el siguiente formato:

`module.exports = {
  "host": "localhost",
  "port": 3000,
  "files": "/dir/con/archivos"
}
`
## TODO

- No funcionan bien las listas. Bulma modifica las clases de 'ul' y 'li'
- Indice de contenidos al inicio
