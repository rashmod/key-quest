import { useRef, useState } from 'react';

import TestContext from './TestContext';
import useTest from '../../hooks/useTest';
import useTimer from '../../hooks/useTimer';

function TestContextProvider({ children, words }: TestContextProviderProps) {
	const [currentInput, setCurrentInput] = useState('');
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const [inputFocused, setInputFocused] = useState(true);

	const typedWords = useRef({
		// correct: new Set<number>(),
		incorrect: new Set<number>(),
	});
	const typedHistory = useRef<Record<string, string>>({});

	const inputRef = useRef<HTMLInputElement>(null);
	const startTime = useRef<number>();

	const { grossWPM, netWPM, accuracy, calculateStats, resetTest } = useTest({
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
		}
	);

	const isTestCompleted = currentWordIndex === words.length || timeLeft <= 0;

	function focusInput() {
		inputRef.current?.focus();
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
		resetTest();
	}

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
				resetTest,
				resetTimer,
				timeLeft,
				startTestIfNeeded,
				isTestCompleted,
				focusInput,
				reset,
				isTestRunning,
				words,
			}}>
			{children}
		</TestContext.Provider>
	);
}

type TestContextProviderProps = {
	children: React.ReactNode;
	words: readonly string[];
};

export default TestContextProvider;