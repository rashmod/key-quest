import { useRef, useState } from 'react';

import words from '../data/words';
import HiddenInput from './HiddenInput';
import Word from './Word';

// todo - show caret
// todo - fix - caret hides when typed words more than given word
// todo - show result page
// todo - show timer
// todo - add ctrl backspace to delete word

function TextDisplay() {
	const [currentInput, setCurrentInput] = useState('');
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const typedWords = useRef({
		// correct: new Set<number>(),
		incorrect: new Set<number>(),
	});
	const typedHistory = useRef<Record<string, string>>({});
	const inputRef = useRef<HTMLInputElement>(null);

	const isTestCompleted = currentWordIndex === words.length;

	function focusInput() {
		inputRef.current?.focus();
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
	}

	if (isTestCompleted) {
		return (
			<div className='flex flex-col items-center w-full gap-4'>
				<h1 className='text-3xl text-white'>Test Completed</h1>
				<button
					autoFocus
					onClick={reset}
					className='w-1/2 py-2 mx-auto text-white transition rounded-md focus:outline-none focus:bg-slate-700 hover:bg-slate-700'>
					Start Again
				</button>
			</div>
		);
	}

	return (
		<>
			<div
				className='flex gap-x-[1ch] flex-wrap w-1/2 mx-auto font-mono text-xl leading-relaxed tracking-widest text-gray-500'
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
			/>
			<button
				onClick={reset}
				className='w-1/2 py-2 mx-auto text-white transition rounded-md focus:outline-none focus:bg-slate-700 hover:bg-slate-700'>
				Reset
			</button>
		</>
	);
}

export default TextDisplay;
