import { useEffect, useRef, useState } from 'react';

import TestContext from './TestContext';
import useTest from '../../hooks/useTest';
import useTimer from '../../hooks/useTimer';
import useScrollIntoView from '../../hooks/useScrollIntoView';
import useGraph from '../../hooks/useGraph';

function TestContextProvider({ children }: TestContextProviderProps) {
	const [currentInput, setCurrentInput] = useState('');
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const [words, setWords] = useState<string[]>([]);

	const [inputFocused, setInputFocused] = useState(true);

	const typedWords = useRef({
		// correct: new Set<number>(),
		incorrect: new Set<number>(),
	});
	const typedHistory = useRef<Record<string, string>>({});

	const inputRef = useRef<HTMLInputElement>(null);
	const startTime = useRef<number>();

	const countOfTypedWords = Object.keys(typedHistory.current).length;
	const totalWords = words.length;

	const { grossWPM, netWPM, accuracy, calculateStats, resetTestStats } =
		useTest({
			startTime: startTime.current,
			typedWords,
			typedHistory,
		});

	const { resetTimer, timeLeft, startTestIfNeeded, isTestRunning } = useTimer(
		{
			currentWordIndex,
			currentLetterIndex,
			startTime,
			calculateStats,
			countOfTypedWords,
			totalWords,
		}
	);

	const { currentWordRef, previousWordRef } =
		useScrollIntoView(currentWordIndex);

	const { generateWord, graphDataLoaded } = useGraph();

	useEffect(() => {
		if (!graphDataLoaded) return;

		const generatedWords: string[] = [];
		for (let i = 0; i < 10; i++) {
			generatedWords.push(generateWord());
		}
		setWords((prev) => prev.concat(generatedWords));
	}, [graphDataLoaded, generateWord]);

	const isTestCompleted = currentWordIndex === words.length || timeLeft <= 0;

	function focusInput() {
		if (!inputRef.current) return;
		inputRef.current.focus();
		setInputFocused(true);
	}

	function reset() {
		setCurrentInput('');
		setCurrentWordIndex(0);
		setCurrentLetterIndex(0);
		typedWords.current = {
			// correct: new Set<number>(),
			incorrect: new Set<number>(),
		};
		typedHistory.current = {};
		focusInput();
		resetTimer();
		resetTestStats();
		setWords(generateWords());
	}

	function generateWords(count = 10) {
		const generatedWords: string[] = [];
		for (let i = 0; i < count; i++) {
			generatedWords.push(generateWord());
		}
		return generatedWords;
	}

	function getMoreWords() {
		const generatedWords = generateWords();
		setWords((prev) => prev.concat(generatedWords));
	}

	console.log(words);

	return (
		<TestContext.Provider
			value={{
				currentInput,
				setCurrentInput,
				currentWordIndex,
				setCurrentWordIndex,
				currentLetterIndex,
				setCurrentLetterIndex,
				typedWords,
				typedHistory,
				inputRef,
				startTime,
				inputFocused,
				setInputFocused,
				grossWPM,
				netWPM,
				accuracy,
				calculateStats,
				resetTestStats,
				resetTimer,
				timeLeft,
				startTestIfNeeded,
				isTestCompleted,
				focusInput,
				reset,
				isTestRunning,
				words,
				currentWordRef,
				previousWordRef,
				getMoreWords,
			}}>
			{children}
		</TestContext.Provider>
	);
}

type TestContextProviderProps = {
	children: React.ReactNode;
};

export default TestContextProvider;
