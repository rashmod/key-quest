import FileHelper from './FileHelper';

type AdjacencyList = {
	[key: 'START' | 'END' | string]: {
		[node: string]: number;
		total: number;
	};
};

type WordData = { word: string; frequency: number; length: number };

type NGram = 'UNIGRAM' | 'BIGRAM' | 'TRIGRAM';

class SparseGraph {
	private adjacencyList: AdjacencyList;
	private data: WordData[] = [];
	wordLengthFrequencies: { [key: number]: number } = {};

	private ngrams = ['UNIGRAM', 'BIGRAM', 'TRIGRAM'] as const;
	private UNIGRAM = 1;
	private BIGRAM = 2;
	private TRIGRAM = 3;

	constructor() {
		this.adjacencyList = {};
		this.initializeGraph();
		this.connectGraph();
		this.generateFrequencyForWordLength();
		console.log('constructor complete');
	}

	private initializeGraph() {
		this.data = FileHelper.readFile('..', 'inputs', 'word_frequency.txt')
			.split('\n')
			.map((x) => {
				const [word, frequency] = x.split('\t').map((x) => x.trim());
				return {
					word,
					frequency: Number(frequency),
					length: word.length,
				};
			});
	}

	writeToFile() {
		console.log('writing');
		FileHelper.writeFile(
			JSON.stringify(this.adjacencyList),
			'..',
			'inputs',
			'sparseGraph.json.txt'
		);
		console.log('writing complete');
	}

	private addNode(node: string) {
		if (!this.adjacencyList[node]) {
			this.adjacencyList[node] = { total: 0 };
		}
	}
	private addEdge(fromNode: string, toNode: string, frequency = 0) {
		this.addNode(fromNode);
		this.addNode(toNode);

		if (!this.hasEdge(fromNode, toNode))
			this.adjacencyList[fromNode][toNode] = 0;

		this.adjacencyList[fromNode][toNode] += frequency;
		this.adjacencyList[fromNode].total += frequency;
	}

	private hasEdge(fromNode: string, toNode: string) {
		if (!this.adjacencyList[fromNode]) return false;

		return this.adjacencyList[fromNode][toNode] !== undefined;
	}

	private processEdge(
		start: string,
		index: number,
		word: string,
		frequency: number
	) {
		const nextStart = index + start.length;

		if (index === 0) this.addEdge('START', start, frequency);

		if (index === word.length - start.length)
			this.addEdge(start, 'END', frequency);

		const nextUnigram = this.getNGram('UNIGRAM', word, nextStart);
		if (nextUnigram) this.addEdge(start, nextUnigram, frequency);

		const nextBigram = this.getNGram('BIGRAM', word, nextStart);
		if (nextBigram) this.addEdge(start, nextBigram, frequency);

		const nextTrigram = this.getNGram('TRIGRAM', word, nextStart);
		if (nextTrigram) this.addEdge(start, nextTrigram, frequency);
	}

	private connectGraph() {
		for (let i = 0; i < this.data.length; i++) {
			const { word, frequency } = this.data[i];

			for (let j = 0; j < word.length; j++) {
				this.ngrams.forEach((gram) => {
					const ngram = this.getNGram(gram, word, j);
					if (ngram) this.processEdge(ngram, j, word, frequency);
				});
			}
		}
	}

	getNextNode(currentWord: string) {
		if (currentWord === '') {
			const options: { [key: string]: number } = {
				...this.adjacencyList['START'],
			};
			delete options.total;
			return this.chooseWeightedRandom(options);
		}

		const candidates: { [key: string]: number } =
			this.collectCandidate(currentWord);

		const endFrequency = candidates['END'] || 0;

		candidates['END'] = this.endFrequencyForWordLength(currentWord.length);

		return this.chooseWeightedRandom(candidates);
	}

	private collectCandidate(currentWord: string) {
		const candidates: { [key: string]: number } = {};

		this.ngrams.forEach((gram) => {
			const ngram = this.getNGram(
				gram,
				currentWord,
				currentWord.length - this[gram]
			);

			if (ngram && this.adjacencyList[ngram]) {
				for (const node in this.adjacencyList[ngram]) {
					if (node === 'total') continue;
					candidates[node] =
						(candidates[node] || 0) +
						this.adjacencyList[ngram][node];
				}
			}
		});

		return candidates;
	}

	private generateFrequencyForWordLength() {
		for (const { length, frequency } of this.data) {
			this.wordLengthFrequencies[length] =
				(this.wordLengthFrequencies[length] || 0) + frequency;
		}
	}

	private endFrequencyForWordLength(length: number) {
		let frequency = 0;
		for (const key in this.wordLengthFrequencies) {
			if (Number(key) <= length)
				frequency += this.wordLengthFrequencies[key];
		}
		return frequency;
	}

	generateWord() {
		const word: string[] = [];

		let current = '';

		while (true) {
			const node = this.getNextNode(current);

			if (node === 'END') break;

			word.push(node);
			current = word.join('');
		}

		return word.join('');
	}

	private chooseWeightedRandom(options: { [key: string]: number }) {
		const sum = Object.values(options).reduce((acc, curr) => acc + curr, 0);
		const random = Math.floor(Math.random() * sum);

		let currentSum = 0;
		for (const key in options) {
			currentSum += options[key];
			if (currentSum >= random) {
				return key;
			}
		}

		return null as never;
	}

	private getNGram(type: NGram, word: string, index: number) {
		const n = this[type];
		const ngram = word.slice(index, index + n);
		return ngram.length === n ? ngram : false;
	}

	displayGraph() {
		console.log(this.adjacencyList);
		console.log('------------------');
		// for (let vertex in this.adjacencyList) {
		// 	console.log(`${vertex} ->`);
		// 	for (let neighbor in this.adjacencyList[vertex]) {
		// 		if (neighbor !== 'total') {
		// 			console.log(
		// 				`${neighbor} (${this.adjacencyList[vertex][neighbor]})`
		// 			);
		// 		}
		// 	}
		// 	console.log(`total: ${this.adjacencyList[vertex].total}`);
		// 	console.log('---------');
		// }
	}
}

export default SparseGraph;
