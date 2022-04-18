export default function DFS(grafo) {
  if (grafo.start === grafo.end) return [grafo.start];
  var pila = [grafo.start];
  var antecesores = { [grafo.start]: -1 };
  var visitado = [];
  while (pila.length !== 0) {
    var actual = pila.pop();
    visitado.push(actual);
    var vecinos = grafo.adjList[actual];
    for (let i = 0; i < vecinos.length; i++) {
      var v = vecinos[i][0];
      if (!antecesores[v]) antecesores[v] = actual;
      if (visitado.indexOf(v) === -1) {
        if (grafo.end === v) {
          return reconstructPath(grafo.start, grafo.end, antecesores);
        }
        pila.push(v);
      }
    }
  }
}
//s:start, t: target, m: memory
function reconstructPath(s, t, m) {
  var u = t;
  var path = [];
  while (u !== -1) {
    path.push(u);
    u = m[u];
  }
  return path.reverse();
}
