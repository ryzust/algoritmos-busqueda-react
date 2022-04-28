//maximo local
export function HC_max(grafo) {
  var actual = grafo.start;
  while (true) {
    var vecinos = grafo.adjList[actual];
    // inicializamos en un numero muy pequeño para asegurar que el siguiente sea mayor y se reemplace sin modificar el algoritmo
    var nextEval = -9999999;
    var nextNode = null;
    // expandimos el nodo actual
    for (let i = 0; i < vecinos.length; i++) {
      //iesimo vecino
      var v = vecinos[i][0];
      //si la heuristica de v es menor que el de nextEval (posible vecino anterior)
      if (grafo.vProps[v].h > nextEval) {
        nextNode = v;
        nextEval = grafo.vProps[v].h;
      }
      // si el nuevo valor nextEval es mayor que la heuristica del nodo "actual"
      // esto quiere decir que estamos bajando en lugar de subir, por lo que
      // podemos asegurar que estamos en un maximo local
      if (nextEval <= grafo.vProps[actual].h) {
        return [actual];
      }
      actual = nextNode;
    }
  }
}

//minimo local
export function HC_min(grafo) {
  var actual = grafo.start;
  while (true) {
    var vecinos = grafo.adjList[actual];
    // inicializamos en un numero muy grande para asegurar que el siguiente sea menor y se reemplace sin modificar el algoritmo
    var nextEval = 9999999;
    var nextNode = null;
    // expandimos el nodo actual
    for (let i = 0; i < vecinos.length; i++) {
      //iesimo vecino
      var v = vecinos[i][0];
      //si la heuristica de v es menor que el de nextEval (posible vecino anterior)
      if (grafo.vProps[v].h < nextEval) {
        nextNode = v;
        nextEval = grafo.vProps[v].h;
      }
      // si el nuevo valor nextEval es mayor que la heuristica del nodo "actual"
      // esto quiere decir que estamos subiendo en lugar de bajar, por lo que
      // podemos asegurar que estamos en un minimo local
      if (nextEval >= grafo.vProps[actual].h) {
        return [actual];
      }
      actual = nextNode;
    }
  }
}
