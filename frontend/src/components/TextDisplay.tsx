import { useRef, useState } from 'react';

import words from '../data/words';

import HiddenInput from './HiddenInput';
import ResetButton from './ResetButton';
import WordsContainer from './WordsContainer';
import Stats from './Stats';

import useTimer from '../hooks/useTimer';
import useTest from '../hooks/useTest';

function TextDisplay() {
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

	const {
		grossWPM,
		netWPM,
		accuracy,
		calculateStats,
		reset: resetTest,
	} = useTest({
		startTime: startTime.current,
		typedWords,
		typedHistory,
	});

	const { resetTimer, timeLeft, startTestIfNeeded } = useTimer({
		currentWordIndex,
		currentLetterIndex,
		startTime,
		calculateStats,
	});

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

	if (isTestCompleted) {
		return (
			<div className='flex flex-col items-center w-full gap-4 text-white'>
				<h1 className='text-3xl text-gray-500'>Test Completed</h1>
				<div className='grid items-center grid-cols-3 text-center gap-y-4 gap-x-8'>
					<div className='col-span-3'>Your stats</div>
					<div className='row-span-2'>
						<div>Gross WPM</div>
						<div className='text-7xl'>{grossWPM.toFixed(0)}</div>
					</div>
					<div className='row-span-2'>
						<div>Net WPM</div>
						<div className='text-7xl'>{netWPM.toFixed(0)}</div>
					</div>
					<div className='row-span-2'>
						<div>Accuracy</div>
						<div className='text-7xl'>{accuracy.toFixed(0)}%</div>
					</div>
				</div>
				<ResetButton reset={reset} label='Start Again' autoFocus />
			</div>
		);
	}

	return (
		<Stats
			timeLeft={timeLeft}
			grossWPM={grossWPM}
			netWPM={netWPM}
			accuracy={accuracy}>
			<WordsContainer
				words={words}
				currentWordIndex={currentWordIndex}
				currentLetterIndex={currentLetterIndex}
				focusInput={focusInput}
				inputFocused={inputFocused}
				typedHistory={typedHistory}
				typedWords={typedWords}
			/>
			<HiddenInput
				words={words}
				inputRef={inputRef}
				currentInput={currentInput}
				setCurrentInput={setCurrentInput}
				currentWordIndex={currentWordIndex}
				setCurrentWordIndex={setCurrentWordIndex}
				setCurrentLetterIndex={setCurrentLetterIndex}
				typedHistory={typedHistory}
				typedWords={typedWords}
				reset={reset}
				setInputFocused={setInputFocused}
				startTestIfNeeded={startTestIfNeeded}
			/>
			{/* <ResetButton reset={reset} label='Reset' /> */}
		</Stats>
	);
}

export default TextDisplay;
