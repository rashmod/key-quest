import { useCallback, useState } from 'react';

function useTest({ startTime, typedWords, typedHistory }: useTestInput) {
	const [grossWPM, setGrossWPM] = useState(0);
	const [netWPM, setNetWPM] = useState(0);
	const [accuracy, setAccuracy] = useState(0);

	const countCharacters = useCallback(() => {
		let count = 0;
		for (const key in typedHistory.current) {
			const value = typedHistory.current[key];
			count += value.length;
		}
		return count;
	}, [typedHistory]);

	const countIncorrectWords = useCallback(() => {
		return typedWords.current.incorrect.size;
	}, [typedWords]);

	const calculateStats = useCallback(
		(input: calculateStatsInput) => {
			if (!startTime) return;

			const elapsedTime = Date.now() - startTime;
			const timeInMinutes = elapsedTime / (1000 * 60);

			const charactersTyped = countCharacters();
			const SpacesCount = charactersTyped - 1;
			const totalCharacters = charactersTyped + SpacesCount;

			const normalizedWordCount = totalCharacters / 5;

			const incorrectWordCount = countIncorrectWords();
			const netWordCount =
				normalizedWordCount - incorrectWordCount > 0
					? normalizedWordCount - incorrectWordCount
					: 0;

			switch (input.statType) {
				case 'wpm':
					if (input.wpmType === 'gross') {
						setGrossWPM(normalizedWordCount / timeInMinutes);
					} else {
						setNetWPM(netWordCount / timeInMinutes);
					}
					break;
				case 'accuracy':
					setAccuracy((netWordCount / normalizedWordCount) * 100);
					break;
			}
		},
		[startTime, countCharacters, countIncorrectWords]
	);

	function reset() {
		setGrossWPM(0);
		setNetWPM(0);
		setAccuracy(0);
	}

	return { grossWPM, netWPM, accuracy, calculateStats, reset };
}

type useTestInput = {
	startTime: number | undefined;
	typedWords: React.MutableRefObject<{
		incorrect: Set<number>;
	}>;
	typedHistory: React.MutableRefObject<Record<string, string>>;
};

export type calculateStatsInput =
	| {
			statType: 'wpm';
			wpmType: 'gross' | 'net';
	  }
	| {
			statType: 'accuracy';
	  };

export default useTest;
