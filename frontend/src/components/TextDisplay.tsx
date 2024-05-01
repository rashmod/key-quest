import { useRef, useState } from 'react';

import words from '../data/words';

import HiddenInput from './HiddenInput';
import Word from './Word';
import ResetButton from './ResetButton';

import useTimer from '../hooks/useTimer';

function TextDisplay() {
	const [currentInput, setCurrentInput] = useState('');
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const [inputFocused, setInputFocused] = useState(true);

	const { resetTimer, timeLeft, startTestIfNeeded } = useTimer({
		currentWordIndex,
		currentLetterIndex,
	});

	const typedWords = useRef({
		// correct: new Set<number>(),
		incorrect: new Set<number>(),
	});
	const typedHistory = useRef<Record<string, string>>({});
	const inputRef = useRef<HTMLInputElement>(null);

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
	}

	if (isTestCompleted) {
		return (
			<div className='flex flex-col items-center w-full gap-4'>
				<h1 className='text-3xl text-white'>Test Completed</h1>
				<ResetButton reset={reset} label='Start Again' autoFocus />
			</div>
		);
	}

	return (
		<>
			<div className='w-1/2 mx-auto text-white'>Timer: {timeLeft}</div>
			<div
				className='flex gap-x-[1ch] flex-wrap w-1/2 mx-auto text-xl leading-relaxed tracking-widest text-gray-500'
				onClick={focusInput}>
				{words.map((word, wordIndex) => (
					<Word
						key={wordIndex}
						words={words}
						currentWordIndex={currentWordIndex}
						currentLetterIndex={currentLetterIndex}
						word={word}
						wordIndex={wordIndex}
						typedHistory={typedHistory}
						typedWords={typedWords}
						inputFocused={inputFocused}
					/>
				))}
			</div>
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
			<ResetButton reset={reset} label='Reset' />
		</>
	);
}

export default TextDisplay;
