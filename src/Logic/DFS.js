export default function DFS(grafo) {
  // Si la ruta comienza donde termina, el recorrido solo contendra dicho nodo de inicio
  if (grafo.start === grafo.end) return [grafo.start];
  var pila = [grafo.start];
  //Objeto contenedor de los antecesores de los nodos visitados, el cual
  //permitirá el backtracking de la ruta
  var antecesores = { [grafo.start]: -1 };
  var visitado = [];
  // El algoritmo expandira los nodos hasta encontrar el nodo objetivo, o hasta
  // recorrer todo el grafo desde el punto de inicio
  while (pila.length !== 0) {
    // tomamos el ultimo elemento introducido en la pila, lo eliminamos de la pila y lo introducimos a los nodos visitados
    var actual = pila.pop();
    visitado.push(actual);
    var vecinos = grafo.adjList[actual];
    for (let i = 0; i < vecinos.length; i++) {
      // Nombre del iesimo vecino
      var v = vecinos[i][0];
      //si el iesimo vecino no tiene un nodo del que desciende aún, se establece como el nodo que se está expandiendo
      if (!antecesores[v]) antecesores[v] = actual;
      // si el nodo no ha sido visitado...
      if (visitado.indexOf(v) === -1) {
        if (grafo.end === v) {
          return reconstructPath(grafo.end, antecesores);
        }
        pila.push(v);
      }
    }
  }
  //si no se encuentra el nodo debido a que está aislado, se muestra la solución vacía
  return [];
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
