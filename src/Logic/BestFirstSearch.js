function BestFistSearch(grafo, heuristica) {
    //Arreglos para nodos cerrados y abiertos
    var abiertos = [];
    var cerrados = [];

    //Definimos nodos de comienzo y meta
    var startNodo = grafo.start;
    var goalNodo = grafo.end;

    //agregamos a los nodos abiertos el start
    abiertos.append(startNodo);

    while (abiertos.lenght > 0) {
        abiertos.sort();
        
        var actualNodo = abiertos.pop(0);

        cerrados.append(actualNodo);

        if (actualNodo == goalNodo) {
            var path = [];

            while (actualNodo != startNodo) {
                path.append(actualNodo)
                actualNodo = { [actualNodo]: -1 }
            }

            path.append(startNodo);

            return path.reverse();
        }

        var vecinos = grafo.adjList[actualNodo];

        for (let i = 0; i < vecinos.length; i++) {
            vecinoIndiv = vecinos[i][0];

            if(vecinoIndiv in cerrados)
                continue;
            
            abiertos.append(vecinos)
        }

    }
    return None;
}