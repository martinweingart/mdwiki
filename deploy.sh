#!/bin/bash

echo "Bienvendio a la configuracioń de su propia wiki!"

echo "Ingrese el host (ej: localhost'):"
read HOST
echo "\n"

echo "Ingrese el puerto (ej: 3000):"
read PORT
echo "\n"

echo "Ingrese el path de los archivo .md (ej: /home/mweingart/wiki):"
read DIR
echo "\n"

echo "(Opcional si se usa proxy reverso en Apache)"
echo "Ingrese el nombre de la App (ej: wiki, si se va a acceder desde localhost/wiki):"
read WEBAPP
echo "\n"

npm install

#Creo el archivo de configuración del servicio MDWiki
cat > config.json <<- EOM
{
  "host": "$HOST",
  "port": $PORT,
  "files": "$DIR"
}
EOM

#Creo el archivo de configuración para la APP Web
cat > gui/src/Config.js <<- EOM
export const Config = {
  host: '$HOST',
  port: $PORT
}
EOM

(cd gui;npm install;npm run build)

#Verifico si la variable WEBAPP no es vacía, reemplazar dirección en index.html
if [ -n "$WEBAPP" ]; then
    sed -i 's,/static/,/'"$WEBAPP"'/static/,g' "gui/dist/index.html";
fi

echo "Aplicación generada exitosamente!"
echo "Para probar ejecutar: npm run serve"
