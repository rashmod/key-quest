import FileHelper from './FileHelper';

class Graph {
	size = 29;
	data: string[] = [];
	graphData: number[][] = [];

	constructor() {
		this.initializeGraph();
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
}

export default Graph;
