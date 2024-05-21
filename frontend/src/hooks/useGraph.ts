import { useCallback, useEffect, useRef, useState } from 'react';
import { NodesMap, ReverseNodesMap } from '../constants/Nodes';

function useGraph() {
	const SIZE = 29;

	const graphData = useRef(initializeGraphData());

	const [graphDataLoaded, setGraphDataLoaded] = useState(false);

	// const graphDataLoaded =
	// 	graphData.current[NodesMap.start][NodesMap.total] > 0;

	const [
		normalizedWordLengthProbabilityDensity,
		setNormalizedWordLengthProbabilityDensity,
	] = useState<{ [key: number]: number }>({});

	useEffect(() => {
		fetchGraphData();
		fetchNormalizedWordLengthProbabilityDensity();
	}, []);

	async function fetchGraphData() {
		const response = await fetch('/graph/graphData.json');
		const data = await response.json();
		graphData.current = data;
		setGraphDataLoaded(true);
	}

	async function fetchNormalizedWordLengthProbabilityDensity() {
		const response = await fetch(
			'/graph/normalizedWordLengthProbabilityDensity.json'
		);
		const data = await response.json();
		setNormalizedWordLengthProbabilityDensity(data);
	}

	const calculateEndProbability = useCallback(
		(currentWordLength: number) => {
			let endProbability = 0;

			for (const key in normalizedWordLengthProbabilityDensity) {
				if (currentWordLength < +key) break;
				endProbability += normalizedWordLengthProbabilityDensity[+key];
			}

			const pointsToNullProbability =
				graphData.current[NodesMap.a][NodesMap.end] /
				graphData.current[NodesMap.a][NodesMap.total];
			const notEndProbability = 1 - pointsToNullProbability;
			const willItEndProbability =
				endProbability / (endProbability + notEndProbability);

			return willItEndProbability;
		},
		[normalizedWordLengthProbabilityDensity]
	);

	const getNextNode = useCallback(
		(
			start: number,
			currentWordLength: number
		): keyof typeof ReverseNodesMap => {
			const endProbability = calculateEndProbability(currentWordLength);
			const newEndFrequency = Math.ceil(
				endProbability * graphData.current[start][NodesMap.total]
			);

			const adjustedFrequencies = adjustFrequencies(
				graphData.current[start],
				newEndFrequency
			);

			const randomNumber = Math.floor(
				Math.random() * adjustedFrequencies[NodesMap.total]
			);

			return findIndex(randomNumber, adjustedFrequencies);
		},
		[calculateEndProbability]
	);

	const generateWord = useCallback(() => {
		const word: string[] = [];

		let current: keyof typeof ReverseNodesMap = NodesMap.start;

		while (current !== NodesMap.end) {
			const node = getNextNode(current, word.length);

			const letter = ReverseNodesMap[node];

			if (letter === 'end') break;

			word.push(letter);
			current = node;
		}

		return word.join('');
	}, [getNextNode]);

	function adjustFrequencies(frequencies: number[], newEndFrequency: number) {
		const adjustedFrequencies = [...frequencies];
		const oldEndFrequency = adjustedFrequencies[NodesMap.end];
		const oldTotal = adjustedFrequencies[NodesMap.total];

		adjustedFrequencies[NodesMap.end] = newEndFrequency;
		adjustedFrequencies[NodesMap.total] =
			oldTotal - oldEndFrequency + newEndFrequency;

		return adjustedFrequencies;
	}

	function findIndex(
		randomNumber: number,
		frequencies: number[]
	): keyof typeof ReverseNodesMap {
		let cumulative = 0;

		for (let i = 0; i < SIZE; i++) {
			cumulative += frequencies[i];
			if (cumulative >= randomNumber) {
				return i as keyof typeof ReverseNodesMap;
			}
		}
		return NaN as never;
	}

	function initializeGraphData(): number[][] {
		return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
	}

	return {
		graphDataLoaded,
		graphData,
		normalizedWordLengthProbabilityDensity,
		generateWord,
	};
}

export default useGraph;
