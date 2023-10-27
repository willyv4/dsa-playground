class Node {
	constructor(val, adjacent = new Set()) {
		this.val = val;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	addVertex(val) {
		this.nodes.add(val);
	}

	addVertices(vals) {
		vals.forEach((val) => this.nodes.add(val));
	}

	removeVertex(val) {
		this.nodes.delete(val);
	}

	addEdge(v1, v2) {
		v1.adjacent.add(v2);
		v2.adjacent.add(v1);
	}

	removeEdge(v1, v2) {
		v1.adjacent.delete(v2);
		v2.adjacent.delete(v1);
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch(start) {
		let arr = [];
		// initialize array with the start of the graph
		let toVisitStack = [start];
		// take values from array and assing them to a set defined as seen
		// seen captures all the items in the array that have been visited
		let seen = new Set(toVisitStack);

		// if length is not zero loop
		while (toVisitStack.length) {
			// remove the last value in the visitstack arr to and assign as current node
			let currNode = toVisitStack.pop();
			// push curr node value to arr
			arr.push(currNode.val);

			// if there is adjecents continue looping through adjecents
			for (let adjacent of currNode.adjacent) {
				// continue if adjacent value has been seen
				if (seen.has(adjacent)) continue;

				//	push adjecent onto the visited stack
				toVisitStack.push(adjacent);
				// update seen set by adding adjacent
				seen.add(adjacent);
			}
		}

		return arr;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start) {
		let arr = [];
		let toVisitQueue = [start];
		let seen = new Set(toVisitQueue);
		while (toVisitQueue.length) {
			let currNode = toVisitQueue.shift();
			arr.push(currNode.val);

			for (let adjacent of currNode.adjacent) {
				if (seen.has(adjacent)) continue;
				toVisitQueue.push(adjacent);
				seen.add(adjacent);
			}
		}
		return arr;
	}
}

module.exports = { Graph, Node };
