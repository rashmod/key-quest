import { useRef, useState } from 'react';
import words from './data/words';

// todo - add ctrl backspace to delete word

function App() {
	const [currentInput, setCurrentInput] = useState('');
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const typedWords = useRef({
		correct: new Set<number>(),
		incorrect: new Set<number>(),
	});
	const typedHistory = useRef<Record<string, string>>({});
	const inputRef = useRef<HTMLInputElement>(null);

	// function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
	// 	if (event.key === ' ') {
	// 		setCurrentInput('');
	// 		setCurrentWordIndex((currentWordIndex + 1) % words.length);
	// 		setCurrentLetterIndex(0);
	// 	} else if (event.keyCode >= 65 && event.keyCode <= 90) {
	// 		setCurrentInput((current) => current + event.key);
	// 	}
	// }

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		const isCurrentWordCompleted = value.match(/\s/);

		const wordKey = words[currentWordIndex] + '.' + currentWordIndex;
		typedHistory.current[wordKey] = value.trim();

		console.log(value.replace(/\s/g, '_'), value.length);
		console.log(typedHistory.current);

		if (isCurrentWordCompleted) {
			if (isWordCorrect())
				typedWords.current.correct.add(currentWordIndex);
			else typedWords.current.incorrect.add(currentWordIndex);

			setCurrentInput('');
			setCurrentWordIndex((current) => (current + 1) % words.length);
			setCurrentLetterIndex(0);
			return;
		}

		setCurrentInput(value);
		setCurrentLetterIndex((current) => current + 1);
	}

	function isWordCorrect() {
		return words[currentWordIndex] === currentInput;
	}

	function focusInput() {
		inputRef.current?.focus();
	}

	return (
		<main className='flex flex-col min-h-screen bg-slate-800'>
			<section className='container grid items-center flex-grow mx-auto'>
				<div
					className='flex gap-x-[1ch] flex-wrap w-1/2 mx-auto font-mono text-xl leading-relaxed tracking-wider text-gray-400'
					onClick={focusInput}>
					{words.map((word, wordIndex) => (
						<span
							className={`${
								wordIndex <= currentWordIndex
									? 'text-white'
									: ''
							} ${
								typedWords.current.incorrect.has(wordIndex)
									? 'underline underline-offset-4 decoration-red-500'
									: ''
							}`}>
							{word.split('').map((letter, letterIndex) => (
								<span
									className={`${
										typedHistory.current[
											words[wordIndex] + '.' + wordIndex
										]
											? typedHistory.current[
													words[wordIndex] +
														'.' +
														wordIndex
											  ][letterIndex]
												? typedHistory.current[
														words[wordIndex] +
															'.' +
															wordIndex
												  ][letterIndex] === letter
													? 'text-white'
													: 'text-red-500'
												: ''
											: ''
									}`}>
									{letter}
								</span>
							))}
						</span>
					))}
				</div>
				<input
					ref={inputRef}
					value={currentInput}
					onChange={onInputChange}
					// onKeyDown={onKeyDown}
					autoFocus
					type='text'
					autoCapitalize='off'
					autoComplete='off'
					autoCorrect='off'
					spellCheck='false'
					className='w-1/2 mx-auto border-2 border-blue-500 rounded-md focus:outline-none'
				/>
			</section>
		</main>
	);
}

export default App;
