function BestFistSearch(grafo, heuristica) {
    //Arreglos para nodos cerrados y abiertos
    var abiertos = [];
    var cerrados = [];

    //Definimos nodos de comienzo y meta
    var startNodo = new Nodo(grafo.start, None, 0, 0);
    var goalNodo = new Nodo(grafo.end, None, 0, 0);

    //agregamos a los nodos abiertos el start
    abiertos.append(startNodo);

    while (abiertos.lenght > 0) {
        abiertos.sort();
        
        var actualNodo = abiertos.pop(0);

        cerrados.append(actualNodo);

        if (actualNodo == goalNodo) {
            var path = [];

            while (actualNodo != startNodo) {
                path.append(actualNodo);
                actualNodo = actualNodo.padre;
            }

            path.append(startNodo);

            return path.reverse();
        }

        var vecinos = grafo.adjList[actualNodo];

        for (let i = 0; i < vecinos.length; i++) {

            vecinoIndiv = new Nodo(vecinos[0][i], actualNodo, 0, 0);

            if(vecinoIndiv in cerrados)
                continue;

            vecinoIndiv.distNodoInicial = nodoActual.distNodoInicial + grafo.getDistNodoInicial(nodoActual.nombre);
            vecinoIndiv.distNodoObjetivo = grafo.getHeuristica(nodoActual.nombre);
            vecinoIndiv.costoTotal = vecino.distNodoObjetivo;

            
        }

    }
    return None;
}

function add_to_open(abiertos, vecinoIndiv) {
    for (node in abiertos) {
        if (vecinoIndiv == node && vecinoIndiv.costoTotal >= node.costoTotal)
            return False
    }
    return True
}

class Nodo {
    constructor (nombre, padre, distNodoInicial, distNodoObjetivo, costoTotal) {
        this.nombre = nombre;
        this.padre = padre;
        this.distNodoInicial = distNodoInicial;
        this.costoTotal = costoTotal;
    } 

    get nombre () {
        return this.nombre;
    }

    get distNodoInicial () {
        return this.distNodoInicial;
    }

    get padre () {
        return this.padre
    }

    get distNodoObjetivo () {
        return this.distNodoObjetivo;
    }
}