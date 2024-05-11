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
		this.data = FileHelper.readFile('inputs', 'word.txt').split('\n');
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

		FileHelper.writeFile(JSON.stringify(data), 'inputs', 'graph.json');
	}

	private generateMap() {
		for (const [key, value] of Object.entries(Nodes)) {
			if (typeof value === 'string') this.map[+key] = value;
		}
	}

	private generateProbabilityDensityOfWordLength() {
		const data = FileHelper.readFile('inputs', 'word_frequency.txt');

		const cleanData = data.split('\n').map((x) => {
			const [word, frequency] = x.replace('\r', '').split('\t');

			return { word, frequency: +frequency, length: word.length };
		});

		FileHelper.writeFile(
			JSON.stringify(cleanData),
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
}

export default Graph;
