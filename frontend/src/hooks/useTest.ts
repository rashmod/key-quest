import { useCallback, useState } from 'react';
import { AVERAGE_NUMBER_OF_LETTERS_IN_WORD } from '../constants/constants';

function useTest({ startTime, typedWords, typedHistory }: useTestInput) {
	const [grossWPM, setGrossWPM] = useState(0);
	const [netWPM, setNetWPM] = useState(0);
	const [accuracy, setAccuracy] = useState(0);

	const analyzeText = useCallback(
		(type: 'characters' | 'words') => {
			let count = 0;
			for (const key in typedHistory.current) {
				if (type === 'characters') {
					const value = typedHistory.current[key];
					count += value.length;
				} else {
					count++;
				}
			}
			return count;
		},
		[typedHistory]
	);

	const countIncorrectWords = useCallback(() => {
		return typedWords.current.incorrect.size;
	}, [typedWords]);

	const calculateStats = useCallback(
		(input: calculateStatsInput) => {
			if (!startTime) return;

			const elapsedTime = Date.now() - startTime;
			const timeInMinutes = elapsedTime / (1000 * 60);

			const charactersTyped = analyzeText('characters');
			const wordsTyped = analyzeText('words');
			const SpacesCount = Math.max(wordsTyped - 1, 0);
			const totalCharacters = charactersTyped + SpacesCount;

			const normalizedWordCount =
				totalCharacters / AVERAGE_NUMBER_OF_LETTERS_IN_WORD;

			const incorrectWordCount = countIncorrectWords();
			const netWordCount = Math.max(
				normalizedWordCount - incorrectWordCount,
				0
			);

			switch (input.statType) {
				case 'wpm':
					if (input.wpmType === 'gross') {
						setGrossWPM(normalizedWordCount / timeInMinutes);
					} else {
						setNetWPM(netWordCount / timeInMinutes);
					}
					break;
				case 'accuracy':
					if (netWordCount === 0) setAccuracy(0);
					else
						setAccuracy((netWordCount / normalizedWordCount) * 100);
					break;
			}
		},
		[startTime, analyzeText, countIncorrectWords]
	);

	function resetTestStats() {
		setGrossWPM(0);
		setNetWPM(0);
		setAccuracy(0);
	}

	return { grossWPM, netWPM, accuracy, calculateStats, resetTestStats };
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
