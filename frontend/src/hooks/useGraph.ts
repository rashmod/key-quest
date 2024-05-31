import { NodesMap, ReverseNodesMap } from '../constants/Nodes';
import { useQueries } from '@tanstack/react-query';
import {
	fetchGraphData,
	fetchNormalizedWordLengthProbabilityDensity,
} from '../api/graph';
import { useCallback } from 'react';

function useGraph() {
	const SIZE = 29;

	const {
		data: { graph, density },
		isLoading,
		isError,
	} = useQueries({
		queries: [
			{
				queryKey: ['graphData'],
				queryFn: fetchGraphData,
			},
			{
				queryKey: ['normalizedWordLengthProbabilityDensity'],
				queryFn: fetchNormalizedWordLengthProbabilityDensity,
			},
		],
		combine: (results) => {
			return {
				data: { graph: results[0].data, density: results[1].data },
				isLoading: results.some((result) => result.isLoading),
				isError: results.some((result) => result.isError),
			};
		},
	});

	const calculateEndProbability = useCallback(
		(currentWordLength: number) => {
			if (!density || !graph) throw new Error();

			let endProbability = 0;

			for (const key in density) {
				if (currentWordLength < +key) break;
				endProbability += density[+key];
			}

			const pointsToNullProbability =
				graph[NodesMap.a][NodesMap.end] /
				graph[NodesMap.a][NodesMap.total];
			const notEndProbability = 1 - pointsToNullProbability;
			const willItEndProbability =
				endProbability / (endProbability + notEndProbability);

			return willItEndProbability;
		},
		[density, graph]
	);

	const adjustFrequencies = useCallback(
		(frequencies: number[], newEndFrequency: number) => {
			const adjustedFrequencies = [...frequencies];
			const oldEndFrequency = adjustedFrequencies[NodesMap.end];
			const oldTotal = adjustedFrequencies[NodesMap.total];

			adjustedFrequencies[NodesMap.end] = newEndFrequency;
			adjustedFrequencies[NodesMap.total] =
				oldTotal - oldEndFrequency + newEndFrequency;

			return adjustedFrequencies;
		},
		[]
	);

	const findIndex = useCallback(
		(
			randomNumber: number,
			frequencies: number[]
		): keyof typeof ReverseNodesMap => {
			let cumulative = 0;

			for (let i = 0; i < SIZE; i++) {
				cumulative += frequencies[i];
				if (cumulative >= randomNumber) {
					return i as keyof typeof ReverseNodesMap;
				}
			}
			return NaN as never;
		},
		[]
	);

	const getNextNode = useCallback(
		(
			start: number,
			currentWordLength: number
		): keyof typeof ReverseNodesMap => {
			if (!density || !graph) throw new Error();

			const endProbability = calculateEndProbability(currentWordLength);
			const newEndFrequency = Math.ceil(
				endProbability * graph[start][NodesMap.total]
			);

			const adjustedFrequencies = adjustFrequencies(
				graph[start],
				newEndFrequency
			);

			const randomNumber = Math.floor(
				Math.random() * adjustedFrequencies[NodesMap.total]
			);

			return findIndex(randomNumber, adjustedFrequencies);
		},
		[adjustFrequencies, calculateEndProbability, density, findIndex, graph]
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

	return {
		graphDataIsLoading: isLoading,
		graphDataIsError: isError,
		graphData: graph,
		normalizedWordLengthProbabilityDensity: density,
		generateWord,
	};
}

export default useGraph;
