import Nodes from '../constants/Nodes';
import FileHelper from './FileHelper';

class Graph {
	size = 29;
	data: string[] = [];
	graphData: number[][] = [];
	map: { [key: number]: string } = {};
	normalizedWordLengthProbabilityDensity: { [key: number]: number } = {};

	constructor() {
		this.initializeGraph();
		this.connectGraph();
		this.generateMap();
		this.generateProbabilityDensityOfWordLength();
	}

	private initializeGraph() {
		this.data = FileHelper.readFile('..', 'inputs', 'words.txt').split(
			'\n'
		);
		this.initializeGraphData();
	}

	private initializeGraphData() {
		this.graphData = Array.from({ length: this.size }, () =>
			Array(this.size).fill(0)
		);
	}

	private connectGraph() {
		for (let i = 0; i < this.data.length; i++) {
			const word = this.data[i];

			for (let j = 0; j < word.length; j++) {
				const letter = word[j] as keyof typeof Nodes;
				const nextLetter = word[j + 1] as keyof typeof Nodes;

				if (j === 0) {
					this.incrementNode('start', letter);
					this.incrementNode('start', 'total');
				} else if (j === word.length - 1) {
					this.incrementNode(letter, 'end');
					this.incrementNode(letter, 'total');
				} else {
					this.incrementNode(letter, nextLetter);
					this.incrementNode(letter, 'total');
				}
			}
		}
	}

	private incrementNode(
		node: keyof typeof Nodes,
		nextNode: keyof typeof Nodes
	) {
		this.graphData[Nodes[node]][Nodes[nextNode]] += 1;
	}

	writeFile() {
		const data: { [key: string]: any } = {
			object: {},
			array: this.graphData,
		};

		for (const [key, value] of Object.entries(Nodes)) {
			if (typeof value === 'number') data.object[key] = value;
		}
		const temp = { ...data.object };

		for (const [key] of Object.entries(data.object)) {
			data.object[key] = { ...temp };
		}

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				data.object[this.map[i]][this.map[j]] = this.graphData[i][j];
			}
		}

		FileHelper.writeFile(
			JSON.stringify(data),
			'..',
			'inputs',
			'graph.json'
		);
	}

	private generateMap() {
		for (const [key, value] of Object.entries(Nodes)) {
			if (typeof value === 'string') this.map[+key] = value;
		}
	}

	private generateProbabilityDensityOfWordLength() {
		const data = FileHelper.readFile('..', 'inputs', 'word_frequency.txt');

		const cleanData = data.split('\n').map((x) => {
			const [word, frequency] = x.replace('\r', '').split('\t');

			return { word, frequency: +frequency, length: word.length };
		});

		FileHelper.writeFile(
			JSON.stringify(cleanData),
			'..',
			'inputs',
			'clean_data.txt'
		);

		const totalFrequency = cleanData.reduce(
			(acc, curr) => acc + curr.frequency,
			0
		);

		const wordLengthProbabilities = cleanData.reduce(
			(acc: Record<string, number>, curr) => {
				const length = curr.length;
				const frequency = curr.frequency;
				acc[length] = (acc[length] || 0) + frequency / totalFrequency;
				return acc;
			},
			{}
		);

		const totalProbability = Object.values(wordLengthProbabilities).reduce(
			(acc, curr) => acc + curr,
			0
		);

		const normalizedWordLengthProbabilities = Object.entries(
			wordLengthProbabilities
		).reduce((acc: Record<string, number>, [key, value]) => {
			acc[key] = value / totalProbability;
			return acc;
		}, {});

		this.normalizedWordLengthProbabilityDensity =
			normalizedWordLengthProbabilities;
	}

	generateWord() {
		const word: string[] = [];

		let current = Nodes.start;

		current = Nodes.start;
		while (current !== Nodes.end) {
			const node = this.getNextNode(current, word.length);
			const letter = this.map[node];

			if (letter === 'end') break;

			word.push(letter);
			current = node;
		}

		return word.join('');
	}

	private getNextNode(start: number, currentWordLength: number): number {
		const endProbability = this.calculateEndProbability(currentWordLength);
		const newEndFrequency = Math.ceil(
			endProbability * this.graphData[start][Nodes.total]
		);

		const adjustedFrequencies = this.adjustFrequencies(
			this.graphData[start],
			newEndFrequency
		);

		const randomNumber = Math.floor(
			Math.random() * adjustedFrequencies[Nodes.total]
		);

		return this.findIndex(randomNumber, adjustedFrequencies);
	}

	private calculateEndProbability(currentWordLength: number) {
		let endProbability = 0;

		for (const key in this.normalizedWordLengthProbabilityDensity) {
			if (currentWordLength < +key) break;
			endProbability += this.normalizedWordLengthProbabilityDensity[+key];
		}

		const pointsToNullProbability =
			this.graphData[Nodes.a][Nodes.end] /
			this.graphData[Nodes.a][Nodes.total];
		const notEndProbability = 1 - pointsToNullProbability;
		const willItEndProbability =
			endProbability / (endProbability + notEndProbability);

		return willItEndProbability;
	}

	private adjustFrequencies(frequencies: number[], newEndFrequency: number) {
		const adjustedFrequencies = [...frequencies];
		const oldEndFrequency = adjustedFrequencies[Nodes.end];
		const oldTotal = adjustedFrequencies[Nodes.total];

		adjustedFrequencies[Nodes.end] = newEndFrequency;
		adjustedFrequencies[Nodes.total] =
			oldTotal - oldEndFrequency + newEndFrequency;

		return adjustedFrequencies;
	}

	private findIndex(randomNumber: number, frequencies: number[]) {
		let cumulative = 0;

		for (let i = 0; i < this.size; i++) {
			cumulative += frequencies[i];
			if (cumulative >= randomNumber) return i;
		}
		return NaN;
	}
}

export default Graph;
