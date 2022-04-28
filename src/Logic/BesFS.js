var _pj;

function _pj_snippets(container) {
    function in_es6(left, right) {
        if (right instanceof Array || typeof right === "string") {
            return right.indexOf(left) > -1;
        } else {
            if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
                return right.has(left);
            } else {
                return left in right;
            }
        }
    }

    container["in_es6"] = in_es6;
    return container;
}

_pj = {};

_pj_snippets(_pj);

function bfs(start, target, graph, queue = [], visited = []) {
    var processing;

    if (!_pj.in_es6(start, visited)) {
        console.log(start);
        visited.append(start);
    }

    queue = queue + function () {
        var _pj_a = [],
            _pj_b = graph[start];

        for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
            var x = _pj_b[_pj_c];

            if (!_pj.in_es6(x[0][0], visited)) {
                _pj_a.push(x);
            }
        }

        return _pj_a.reverse();
    }.call(this);

    queue.sort({
        "key": x => {
            return x[1];
        }
    });

    if (queue[0][0] === target) {
        console.log(queue[0][0]);
    } else {
        processing = queue[0];
        queue.remove(processing);
        bfs(processing[0], target, graph, queue, visited);
    }
}