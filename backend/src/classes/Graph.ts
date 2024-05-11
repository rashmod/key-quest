import Nodes from '../constants/Nodes';
import FileHelper from './FileHelper';

class Graph {
	size = 29;
	data: string[] = [];
	graphData: number[][] = [];

	constructor() {
		this.initializeGraph();
		this.connectGraph();
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
}

export default Graph;
