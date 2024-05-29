import Graph from './classes/Graph';
import SparseGraph from './classes/SparseGraph';

// const graph = new Graph();
// console.log(graph.generateWord());

console.log('server running');

const sparseGraph = new SparseGraph();
// sparseGraph.displayGraph();
setInterval(() => {
	console.log(sparseGraph.generateWord());
}, 1000);

const obj: { [key: number]: number } = {};

const generateAndCountWord = async () => {
	const generatedWord = sparseGraph.generateWord();
	const length = generatedWord.length;

	obj[length] = (obj[length] || 0) + 1;
};

const processBatch = async (batchSize: number, start: number) => {
	const promises = [];
	for (let i = 0; i < batchSize; i++) {
		promises.push(generateAndCountWord());
	}
	await Promise.all(promises);
	console.log(`Processed ${start + batchSize} words.`);
};

const main = async () => {
	const totalWords = 1000;
	const batchSize = 100; // Adjust batch size as needed
	for (let start = 0; start < totalWords; start += batchSize) {
		await processBatch(batchSize, start);
	}
};

// main().then(() => {
// 	console.log(obj);
// 	console.log(sparseGraph.wordLengthFrequencies);

// 	const generatedTotal = Object.values(obj).reduce(
// 		(acc, curr) => acc + curr,
// 		0
// 	);

// 	for (const key in obj) {
// 		obj[key] = (obj[key] * 100) / generatedTotal;
// 	}

// 	const total = Object.values(sparseGraph.wordLengthFrequencies).reduce(
// 		(acc, curr) => acc + curr,
// 		0
// 	);

// 	const temp: { [key: number]: number } = {};

// 	for (const key in sparseGraph.wordLengthFrequencies) {
// 		temp[key] = (sparseGraph.wordLengthFrequencies[key] * 100) / total;
// 	}

// 	console.log('------------------------');
// 	console.log(obj);
// 	console.log(temp);
// });
