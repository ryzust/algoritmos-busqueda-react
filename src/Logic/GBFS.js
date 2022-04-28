export default function GBFS(grafo) {
  //Nodos visitados
  var closedSet = [];
  //Nodos que podrian visitarse
  var openSet = [grafo.start];
  // De donde viene un nodo especifico
  var antecesores = { [grafo.start]: -1 };
  // Costo total estimado para llegar al nodo objetivo desde un nodo especificado
  var fScore = {
    [grafo.start]: grafo.vProps[grafo.start].h,
  };
  //Mientras haya nodos por explorar...
  while (openSet.length !== 0) {
    // Elegimos el camino de menor costo disponible
    var actual = lowest_fScore_in_openSet(openSet, fScore);
    if (actual === grafo.end) {
      return reconstructPath(grafo.end, antecesores);
    }
    // Cerramos el nodo al haberlo visitado
    openSet.splice(openSet.indexOf(actual), 1);
    closedSet.push(actual);
    var neighbors = grafo.adjList[actual];
    for (let i = 0; i < neighbors.length; i++) {
      // Nombre del iesimo vecino
      var v = neighbors[i][0];
      if (closedSet.indexOf(v) !== -1) continue;
      // si el nodo v aun no ha sido abierto
      if (openSet.indexOf(v) === -1) {
        antecesores[v] = actual;
        // sabiendo que para GBFS: f(n) = h(n)
        fScore[v] = grafo.vProps[v].h;
        if (openSet.indexOf(v) === -1) {
          openSet.push(v);
        }
      }
    }
  }
  return [];
}

function lowest_fScore_in_openSet(openSet, fScore) {
  var lowest = openSet[0];
  var lowestScore = fScore[lowest];
  //si encuentra un valor menor al primero en el openSet, se reemplazará
  for (let i = 1; i < openSet.length; i++) {
    var key = openSet[i];
    const tmpScore = fScore[key];
    if (tmpScore < lowestScore) {
      lowestScore = tmpScore;
      lowest = key;
    }
  }
  return lowest;
}

//t: target, m: memory
function reconstructPath(t, m) {
  var u = t;
  var path = [];
  //recorrera los antecesores hasta que u = -1, ya que ese es el valor que se estableció
  //en el objeto de antecesores para el nodo de inicio
  while (u !== -1) {
    path.push(u);
    u = m[u];
  }
  return path.reverse();
}
