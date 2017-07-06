##  

Insert (i)              Modo Insertar/Reemplazar
Esc                     Salir del modo actual
yy                      Copiar línea
p                       Pegar línea
dd                      Cortar línea
v			Modo Visual
<|>			Identación hacia izq|der
.			Repetir última operación
u			Deshacer
Ctrl-R			Rehacer
Ctrl-G			Ir a fin de archivo
gg			Ir a inicio de archivo
V			Modo visual línea
K			Mostrar 'man' para palabra en cursor
/			Buscar

Modo Split:
Ctrl-W			Cambiar ventana

Búsqueda:
n			Siguiente ocurrencia
N			Anterior ocurrencia

Modo Visual:
u			Convertir a Minúscula
U			Convertir a Mayúscula
~			Revertir Minúscula/Mayúscula
d			Borrar Selección

Comandos:
:w (optional filename)  Guardar cambios
:q                      Salir
:wq                     Guardar y salir
:q!                     Salir sin guardar
gg V G			Seleccionar todo
:1,$s/x/y/g             Desde pcpio(1) al final($) reemplazar(s) todas las ocurrencias(g) de x por y

:1,2s/^/#\ /g           Comentar lineas de la 1 a la 2. Reemplaza inicio de linea(^) por #

:30,$d                  Borrar(d) las lineas a partir de la 30
:sort			Ordenar lineas
:split|vsplit		Dividir pantalla horizontal|verticalmente
:e			Abrir otro archivo. Recargar archivo.
:!			Para ejecutar comandos de terminal (Ej. :!ls)
:bn			Ir a siguiente archivo abierto
:qa			Cerrar todos los archivos
:Explore		Navegar por directorio
q:			Ver historial de comandos
