var grafo = {
  vertices: ["wea", "wea2", "xd"],
  h: [1, 2, 3],
  edges: [
    ["wea", "wea2"],
    ["wea", "xd"],
  ],
  g: [5, 6],
  start: "wea",
  end: "xd",
};

console.log(aStar(grafo));

function inSet(openSet, fscore) {
  var key = Object.keys(fscore)[0];
  if (openSet.indexOf(key) !== -1) {
    return fscore[key];
  }
}

function getMinFx(openset, fscore) {
  var filteredScores = fscore.filter((score) => {
    inSet(openset, score);
  });

  const lowest = filteredScores[0];

  for (let i = 1; i < filteredScores.length; i++) {
    if (filteredScores[i] < lowest) {
      lowest = filteredScores[i];
    }
  }
  return lowest;
}

function reconstruct_path(precursor, current) {
  var path = [current];
  while (precursor.indexOf(current) !== -1) {
    current = precursor[current];
    path.push(current);
  }
  return path.reverse();
}

function aStar(Grafo) {
  var start = Grafo.start;
  var idxStart = Grafo.vertices.indexOf(start);
  var end = Grafo.end;
  var idxEnd = Grafo.vertices.indexOf(end);
  var openSet = [start];
  var closedSet = [];
  var precursor = [];
  var gScore = {};
  gScore[start] = 0;

  var fscore = [{}];
  fscore[start] = Grafo.h[idxStart];

  while (openSet.length !== 0) {
    var current = getMinFx(openSet, fscore);
    //var currentKey =
    console.log(Object.keys(current));
    if (currentKey === end) {
      return reconstruct_path(precursor, current);
    }
    openSet.splice(currentKey, 1);
    var neighbors = [];
    var edgePair = [];
    for (let i = 0; i < Grafo.edges.length; i++) {
      var e = Grafo.edges[i];
      if (e[0] === currentKey) {
        neighbors.push(e[1]);
        edgePair.push(e);
      }
      if (e[1] === currentKey) {
        neighbors.push(e[0]);
        edgePair.push(e);
      }
    }
    for (let i = 0; i < neighbors.length; i++) {
      const element = neighbors[i];
      var idxEdgePair = Grafo.edges.indexOf(edgePair[i]);
      var idxNeighbor = Grafo.vertices.indexOf(element);
      var tentative_gScore = gScore[current] + Grafo.g[idxEdgePair];
      if (tentative_gScore < gScore[element]) {
        precursor[element] = current;
        gScore[element] = tentative_gScore;
        fscore[element] = tentative_gScore + Grafo.h[idxNeighbor];
        if (openSet.indexOf(element) === -1) {
          openSet.push(element);
        }
      }
    }
  }
  return -1;
}
