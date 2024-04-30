import clsx from 'clsx';

import Letter from './Letter';

function Word({
	words,
	wordIndex,
	typedHistory,
	currentWordIndex,
	currentLetterIndex,
	typedWords,
	word,
	inputFocused,
}: WordProps) {
	const wordKey = words[wordIndex] + '.' + wordIndex;
	const typedWord = typedHistory.current[wordKey] ?? '';
	const extraLetters = typedWord.slice(word.length);
	const displayedWord = word + extraLetters + ' ';
	const isWordIncorrect = typedWords.current.incorrect.has(wordIndex);

	return (
		<span
			className={clsx({
				'text-white': wordIndex === currentWordIndex,
				'underline underline-offset-4 decoration-red-500':
					isWordIncorrect,
			})}>
			{displayedWord.split('').map((letter, letterIndex) => (
				<Letter
					key={`${wordIndex}-${letterIndex}`}
					words={words}
					typedHistory={typedHistory}
					wordIndex={wordIndex}
					letterIndex={letterIndex}
					letter={letter}
					currentWordIndex={currentWordIndex}
					currentLetterIndex={currentLetterIndex}
					inputFocused={inputFocused}
				/>
			))}
		</span>
	);
}

type WordProps = {
	words: readonly string[];
	typedHistory: React.MutableRefObject<Record<string, string>>;
	wordIndex: number;
	currentWordIndex: number;
	currentLetterIndex: number;
	typedWords: React.MutableRefObject<{
		// correct: Set<number>;
		incorrect: Set<number>;
	}>;
	word: string;
	inputFocused: boolean;
};

export default Word;
