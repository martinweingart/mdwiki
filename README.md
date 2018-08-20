# MDWiki

Es una wiki de archivos .md en un servidor Node.js, con interfaz desarrollada con Vue.js.

La wiki es actualizada instantáneamente al momento de modificar los archivos y/o carpetas gracias a WebSockets. Utiliza la librería socket.io.

# Instalación

## Requerimientos

* Node v6 +
* NPM v3 +
* Git
* Linux

## Clonar Proyecto

`git clone https://github.com/argnu/mdwiki`
`cd mdwiki`

## Configuración

Ejecutar comando de configuración:

`npm run build`

## Ejecutar servicio

Ejecutar comando para iniciar aplicación:

`npm run serve`

La wiki está lista para ejecutarse en `http://host:port` (dependiendo de los parámetros configurados)

*Recomendación*: crear servicio para systemd para que la aplicación se ejecute automáticamente al inicio del sistema.


# Servicio para systemd

## Crear servicio

Con permisos de administrador crear un archivo en la carpeta `/etc/systemd/system` con el nombre a elección. Por ejemplo:

`sudo nano /etc/systemd/system/wiki.service`

El contenido del archivo debe ser similar al siguiente:

```javascript
  [Unit]
  Description=Servicio WIKI

  [Service]
  ExecStart=/usr/bin/node /dir/del/proyecto/index.js
  Restart=always
  # Reinicia el servicio luego de 10 segundos si se rompe
  RestartSec=10
  # Loggin en syslog
  StandardOutput=syslog
  StandardError=syslog
  SyslogIdentifier=wiki

  [Install]
  WantedBy=multi-user.target
```

Notar que debe especificarse la dirección donde clonamos el proyecto para la ejecución.

## Habilitar servicio

`systemctl enable wiki.service`

## Ejecutar servicio 

Luego podemos ejectuar los comandos para iniciar, reiniciar y parar servicio:

`service wiki start`

`service wiki restart`

`service wiki stop`


# TODO

- No funcionan bien las listas. Bulma modifica las clases de 'ul' y 'li'
- Indice de contenidos al inicio
