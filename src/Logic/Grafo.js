export default class Grafo {
  constructor() {
    this.adjList = {};
    this.h = new Map();
    this.d = new Map();
  }

  addVertex(vertex, h = 0) {
    // to avoid overwriting the existing vertex, we need if statement
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, d = 0) {
    // undirected graph is two way connection
    //we push both vertices to each other's array
    this.adjList[vertex1].push(vertex2);
    this.adjList[vertex2].push(vertex1);
  }

  removeEdge(ver1, ver2) {
    // two way connection, delete from both arrays
    this.adjList[ver1] = this.adjList[ver1].filter((v) => v !== ver2);
    this.adjList[ver2] = this.adjList[ver2].filter((v) => v !== ver1);
  }

  removeVertex(vertex) {
    // first find all the conncetion, and remove all edges from both parties,
    // and then delete the vertex from the adjacency list
    let edges = this.adjList[vertex];

    for (let edge of edges) {
      this.removeEdge(vertex, edge);
    }
    delete this.adjList[vertex];
  }
}
