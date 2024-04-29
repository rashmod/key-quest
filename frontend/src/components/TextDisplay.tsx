import { useRef, useState } from 'react';

import words from '../data/words';
import HiddenInput from './HiddenInput';
import Word from './Word';

// todo - add ctrl backspace to delete word

function TextDisplay() {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const typedWords = useRef({
		correct: new Set<number>(),
		incorrect: new Set<number>(),
	});
	const typedHistory = useRef<Record<string, string>>({});
	const inputRef = useRef<HTMLInputElement>(null);

	function focusInput() {
		inputRef.current?.focus();
	}
	return (
		<>
			<div
				className='flex gap-x-[1ch] flex-wrap w-1/2 mx-auto font-mono text-xl leading-relaxed tracking-wider text-gray-400'
				onClick={focusInput}>
				{words.map((word, wordIndex) => (
					<Word
						key={wordIndex}
						words={words}
						currentWordIndex={currentWordIndex}
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
				currentWordIndex={currentWordIndex}
				setCurrentWordIndex={setCurrentWordIndex}
				setCurrentLetterIndex={setCurrentLetterIndex}
				typedHistory={typedHistory}
				typedWords={typedWords}
			/>
		</>
	);
}

export default TextDisplay;
