import SparseGraph from './classes/SparseGraph';

// const graph = new Graph();
// console.log(graph.generateWord());

console.log('server running');

const sparseGraph = new SparseGraph('run');
setInterval(() => {
	console.log(sparseGraph.generateWord());
}, 1000);
