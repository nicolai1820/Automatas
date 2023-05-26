# Automatas
Automata Celular 

****Reglas del Juego de la Vida original:

1.Una celda vacía con exactamente tres células vecinas vivas se convierte en una célula viva. (Regla original)
2. Una célula viva con dos o tres células vecinas vivas permanece viva en el siguiente paso. (Regla original)
3. En cualquier otro caso, una célula viva muere o permanece muerta. (Regla original)
Modificaciones para el juego "Zombi Life":

1.Una celda vacía permanece vacía a menos que tenga exactamente tres células vecinas zombis, en cuyo caso se convierte en una nueva célula zombi. (Modificación)
2.Una celda con un humano muerto se convierte en un cadáver en el siguiente paso. (Modificación)
3.Una celda con un zombi muerto se convierte en una celda vacía en el siguiente paso. (Modificación)
4.Un humano vivo se convierte en un zombi si tiene al menos un zombi como vecino en el siguiente paso. (Modificación)
5.Un zombi se queda en su estado actual si no tiene ningún humano vivo como vecino en el siguiente paso. (Modificación)
6.Un zombi muerto permanece muerto a menos que tenga exactamente tres células vecinas zombis, en cuyo caso se convierte en una nueva célula zombi. (Modificación)

****Los estados posibles para cada celda son: 

  

Vacío: Representa una celda desocupada en el tablero. 

Humano: Representa a un humano vivo. 

Zombi: Representa a un zombi activo. 

Cadáver: Representa a un humano muerto o zombi inactivo. 

 

Las reglas para el cambio de estado de cada celda se definen como sigue: 

  

Una celda vacía permanece vacía a menos que tenga exactamente tres células vecinas (arriba, abajo, izquierda, derecha, y diagonales) que sean zombis, en cuyo caso se convierte en una nueva célula zombi. 

  

Una celda con un humano muerto se convierte en un cadáver en el siguiente paso. 

  

Una celda con un zombi muerto se convierte en un vacío en el siguiente paso. 

  

Un humano vivo se convierte en un zombi si tiene al menos un zombi como vecino en el siguiente paso. 

  

Un zombi se queda en su estado actual si no tiene ningún humano vivo como vecino en el siguiente paso. 

  

Un zombi muerto permanece muerto a menos que tenga exactamente tres células vecinas que sean zombis, en cuyo caso se convierte en una nueva célula zombi. 

  

Estas reglas permiten simular la propagación de una infección zombi en una población humana.

****Implementación  

 

- Crear una función que represente cada celda del tablero. Esta función debe llevar un parámetro que indique el estado actual de la célula (vacío, humano, zombi o cadáver). 

 

- Determinar los vecinos más cercanos de cada célula. Para ello, se puede crear una función que tome como parámetros la posición de la célula en el tablero y devuelva un array con las posiciones de sus vecinos. 

 

- Calcular el estado siguiente de los vecinos. Esto implica aplicar las reglas del autómata celular a cada vecino para determinar su nuevo estado. 

Por ejemplo, si un humano tiene al menos un vecino zombi, se convierte en un zombi en el siguiente ciclo. 

 

- Cambiar el estado de la célula de acuerdo a las reglas. Para ello, se puede crear una función que tome como parámetro el estado actual de la célula y el estado siguiente calculado en el paso anterior. 

 

- Dibujar la célula en el tablero. Para visualizar el estado actual del autómata celular, se debe dibujar cada célula en el tablero. 

 

- Crear un array en 2D para representar el tablero. Este array debe tener una dimensión predefinida, que puede ser modificada en el código. creaArray2D en JS 

 

- Inicializar el juego. Para comenzar la ejecución del autómata celular, se deben inicializar las células del tablero con un estado inicial. 

 

- Borrar las celdas. Antes de dibujar cada ciclo del autómata celular, se debe borrar el contenido anterior del tablero para evitar la acumulación de células dibujadas previamente.

