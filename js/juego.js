// Declaracion de variables

//Representación de pantalla/screen
var canvas;
//Varibale de contexto
var ctx; 
//Variable que define los frames por segundo
// var fps = 3; //va mucho mas lento o rapido el bucle
var fps = 30;
//Tamaño del canvas
var canvasX = 600;  //pixels ancho
var canvasY = 600;  //pixels alto
//Variables para aumento de los pixels y que se vean mas grandes
var tileX, tileY;

//Variables relacionadas con el tablero del juego
var tablero;
var filas = 100;      //100
var columnas = 100;   //100
// Variable para los colores y no estar digitando el codigo hexa del color
var blanco = '#FFFFFF';
var negro = '#000000';
// var azul = '##0000FF';

// La función creaArray2D toma dos parámetros: f para el número de filas y c 
// para el número de columnas de la matriz que se desea crear.

// Se declara una variable obj que almacenará la matriz 2D. obj se inicializa como un nuevo array
// con una longitud igual al número de filas (f).

// Luego, se realiza un bucle for que itera desde 0 hasta el número de filas (f) y en cada iteración
// crea un nuevo array con una longitud igual al número de columnas (c) y lo asigna a la posición correspondiente en obj. 
//Esto crea un array 2D vacío con las filas y columnas especificadas.

// Finalmente, se devuelve el array obj que representa la matriz 2D creada.
function creaArray2D(f,c){
  var obj = new Array(f);
  for(y=0; y<f; y++){
    obj[y]= new Array(c);
  }

  return obj;
}


//OBJETO AGENTE O TURMITA(Maquina de Turing) 
//cada vez que se crea un agente se pasan sus coordenadas dentro del tablero (x,y) y su estado si esta vivo o muerto
var Agente = function(x,y,estado){
//Variables a guardar como atributos 
  this.x = x;
  this.y = y;
  this.estado = estado;           //vivo = 1, muerto = 0
// los automatas celulares funcionan tomando una captura del tablero como esta ahora y calculando como estara en el proximo  ciclo cada una de sus casillas 
  this.estadoProx = this.estado;  //estado que tendrá en el siguiente ciclo
// cada casilla tiene que tener constancia de cuales son sus vecinos
// Cada agente  tiene un array que guarda sus vecinos
  this.vecinos = [];    //guardamos el listado de sus vecinos

  // Método que añade los vecinos del objeto actual
  // Añade todos los vecinos a un listado
  // Declara las variables xVecino e yVecino para almacenar las coordenadas de un vecino.
  // Utiliza un bucle anidado (un bucle dentro de otro) para recorrer la matriz de 3x3 donde se encuentra el agente en el centro.
  // El bucle exterior itera sobre la variable i que va desde -1 hasta 1.
  // El bucle interior itera sobre la variable j que también va desde -1 hasta 1.
  // Calcula las coordenadas del vecino sumando la posición actual del agente (this.x y this.y) con los valores i y j, respectivamente. Luego, utiliza el operador % para asegurarse de que las coordenadas estén dentro de los límites de la matriz (columnas y filas).
  // Descarta al agente actual como vecino (no puedes ser tu propio vecino) mediante una condición que verifica si i y j no son ambos igual a cero.
  // Agrega el vecino a la lista vecinos del agente actual mediante la instrucción this.vecinos.push(tablero[yVecino][xVecino]).
  this.addVecinos = function(){
    //coordenadas del vecino
    var xVecino;
    var yVecino;
    //bucle anidado (uno dentro de otro) que recorren la matriz de 3x3 donde se encuentra en medio el agente
    for(i=-1; i<2; i++){
      for(j=-1; j<2; j++){
        xVecino = (this.x + j + columnas) % columnas;
        yVecino = (this.y + i + filas) % filas;



        //descartamos el agente actual (yo no puedo ser mi propio vecino)
        if(i!=0 || j!=0){
          this.vecinos.push(tablero[yVecino][xVecino]);
        }

      }
    }
  }


//metodo que dibuja una casilla blanca o negra en funcion del estado 
  this.dibuja = function(){

    var color;

    if(this.estado == 1){
      color = blanco;
    }
    else{
      color = negro;
    }
//Pintar el recuadro usando los colores y el contexto en fillrect para rectangulo 
    ctx.fillStyle = color;
    ctx.fillRect(this.x*tileX, this.y*tileY, tileX, tileY);

  }


  // La función nuevoCiclo realiza los cálculos necesarios para determinar el estado del agente en el siguiente ciclo, basándose en las reglas del juego de la vida de Conway. Aquí está la explicación de lo que hace:

  // Declara una variable suma e inicialízala en 0. Esta variable se utiliza para calcular la cantidad de vecinos vivos que rodean al agente.

  // Utiliza un bucle para recorrer todos los vecinos del agente. Para cada vecino, se suma su estado al valor de suma.

  // Aplica las reglas del juego de la vida de Conway para determinar el estado próximo del agente en el siguiente ciclo.
  //     Si la suma de vecinos vivos es menor que 2 o mayor que 3, el agente muere y su estado próximo se establece en 0.
  //     Si la suma de vecinos vivos es igual a 3, el agente se reproduce o mantiene vivo, y su estado próximo se establece en 1.
  //     En cualquier otro caso, el estado próximo del agente se mantiene igual que su estado actual.
  //Se programan las leyes de Conway
  this.nuevoCiclo = function(){
    var suma = 0;

    //calculamos la cantidad de vecinos vivos
    for(i=0; i<this.vecinos.length;i++){
      suma += this.vecinos[i].estado;
    }

    //APLICAMOS LAS NORMAS DE CONWAY

    //Valor por defecto lo dejamos igual
    this.estadoProx = this.estado;

    //MUERTE: tiene menos de 2 o más de 3
    if(suma <2 || suma>3){
      this.estadoProx = 0;
    }

    //VIDA/REPRODUCCIÓN: tiene exactamente 3 vecinos
    if(suma==3){
      this.estadoProx = 1;
    }

  }

//Metodo que aplica todo el cambio 
  this.mutacion = function(){
    this.estado = this.estadoProx;
  }



}



// Declara una variable llamada estado que se utilizará para almacenar el estado de cada agente en el tablero.

// Utiliza un bucle anidado (un bucle dentro de otro) para recorrer todo el tablero de agentes. El bucle exterior itera sobre la variable y que va desde 0 hasta el número de filas. El bucle interior itera sobre la variable x que va desde 0 hasta el número de columnas.

// Dentro del bucle, se genera un número aleatorio entre 0 y 1 utilizando Math.random() y se redondea hacia abajo utilizando Math.floor(). Esto asigna un valor aleatorio de 0 o 1 al estado de cada agente en el tablero.

// Crea un nuevo objeto Agente en la posición obj[y][x] del tablero, pasando las coordenadas x e y, así como el estado generado anteriormente.

// Después de que se haya creado todo el tablero de agentes, se realiza otro bucle anidado para recorrer nuevamente el tablero y llamar al método addVecinos() en cada agente. Esto agrega los vecinos correspondientes a cada agente según su posición en el tablero.
//Funcion que inicializa el tablero dando valores aleatorios a los distintos agentes, valores en 1 o 0
function inicializaTablero(obj){

  var estado;
//buvle anidado para recorrer todo el tablero
  for(y=0; y<filas; y++){
    for(x=0; x<columnas; x++){
      //se busca un numero aleatorio entre cero y uno, usando mathfloor para redonder
      estado = Math.floor(Math.random()*2);
      //las coordenadas pasadas al objeto 
      obj[y][x] = new Agente(x,y,estado);
    }
  }

// cuando ya esta creado el objeto se invoca la funcion para añadir los vecinos 
  for(y=0; y<filas; y++){
    for(x=0; x<columnas; x++){
      obj[y][x].addVecinos();
    }
  }

}

//Tras cada fotograma se borra la pantalla, reiniciando el ancho y el alto al tamaño inicial
function borraCanvas(){
  canvas.width=canvas.width;
  canvas.height=canvas.height;
}




function inicializa(){

  //Asociamos el canvas al objeto del index html con id screen
  canvas = document.getElementById('screen');
  ctx = canvas.getContext('2d');


  //Ajustamos el tamaño del canvas definiendo el width y el height e invocando los valores de canvasX y canvasY en 500
  canvas.width = canvasX;
  canvas.height = canvasY;

  //calculamos el tamaño de los tiles 
  // Math.floor() es una función que redondea un número hacia abajo al entero más cercano. 
  // Esto significa que elimina la parte decimal del número y devuelve el número entero resultante.
  tileX = Math.floor(canvasX/filas);
  tileY = Math.floor(canvasY/columnas);

  console.log("AQUI_TILEX", filas);
  console.log("AQUI_TILEY", columnas);

  //creamos el tablero
  tablero = creaArray2D(filas,columnas);
  //Lo inicializamos
  inicializaTablero(tablero);



  // Ejecutamos el bucle principal
  // Establecemos un temporizador utilizando setInterval para llamar a la función principal() repetidamente 
  // a una frecuencia determinada por el valor de fps. Lo cual es comúnmente utilizado en animaciones o 
  // actualizaciones periódicas en aplicaciones y juegos para mantener una tasa de fotogramas constante.
  // cada 1000ms sobre el valor de los fps (fotogramas)
  setInterval(function(){principal();},1000/fps);

}

// Dibuja los agentes en el tablero: Utiliza un bucle anidado para recorrer cada agente en el tablero representado por el objeto obj. Para cada agente, llama al método dibuja() del agente para dibujarlo en el contexto de lienzo.

// Calcula el siguiente ciclo: Utiliza otro bucle anidado para recorrer cada agente en el tablero. Para cada agente, llama al método nuevoCiclo() del agente para realizar los cálculos necesarios para el siguiente ciclo.

// Aplica la mutación: Utiliza un tercer bucle anidado para recorrer cada agente en el tablero. Para cada agente, llama al método mutacion() del agente para aplicar la mutación, que puede ser algún tipo de cambio en su estado o comportamiento.

function dibujaTablero(obj){

  //DIBUJA LOS AGENTES
  for(y=0; y<filas; y++){
    for(x=0; x<columnas; x++){
      obj[y][x].dibuja();
    }
  }

  //CALCULA EL SIGUIENTE CICLO
  for(y=0; y<filas;y++){
    for(x=0; x<columnas; x++){
      obj[y][x].nuevoCiclo();
    }
  }

  //APLICA LA MUTACIÓN
  for(y=0; y<filas;y++){
    for(x=0; x<columnas; x++){
      obj[y][x].mutacion();
    }
  }

}




//Bucle principal o funcion que se va a ejecutar todo el tiempo
function principal(){
  //primero borra 
  borraCanvas();
  //luego dibuja
  dibujaTablero(tablero);
  console.log("fotograma");

}
