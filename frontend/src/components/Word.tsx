import clsx from 'clsx';

import Letter from './Letter';

function Word({
	words,
	wordIndex,
	typedHistory,
	currentWordIndex,
	typedWords,
	word,
}: WordProps) {
	return (
		<span
			className={clsx({
				'text-white': wordIndex <= currentWordIndex,
				'underline underline-offset-4 decoration-red-500':
					typedWords.current.incorrect.has(wordIndex),
			})}>
			{word.split('').map((letter, letterIndex) => (
				<Letter
					key={`${wordIndex}-${letterIndex}`}
					words={words}
					typedHistory={typedHistory}
					wordIndex={wordIndex}
					letterIndex={letterIndex}
					letter={letter}
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
	typedWords: React.MutableRefObject<{
		correct: Set<number>;
		incorrect: Set<number>;
	}>;
	word: string;
};

export default Word;
