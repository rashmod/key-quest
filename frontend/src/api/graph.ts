export async function fetchGraphData(): Promise<number[][]> {
	return fetch('/graph/graphData.json').then((res) => res.json());
}

export async function fetchNormalizedWordLengthProbabilityDensity(): Promise<{
	[key: string]: number;
}> {
	return fetch('/graph/normalizedWordLengthProbabilityDensity.json').then(
		(res) => res.json()
	);
}
