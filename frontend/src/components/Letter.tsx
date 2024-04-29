import clsx from 'clsx';

function Letter({
	typedHistory,
	words,
	wordIndex,
	letterIndex,
	letter,
	currentWordIndex,
	currentLetterIndex,
}: LetterProps) {
	const wordKey = words[wordIndex] + '.' + wordIndex;
	const typedWord = typedHistory.current[wordKey];
	const typedLetter = typedWord ? typedWord[letterIndex] : undefined;
	const isTypedLetterIncorrect = typedLetter && typedLetter !== letter;

	return (
		<span
			className={clsx({
				'text-red-500': isTypedLetterIncorrect,
				'before:bg-white before:h-[1.5em] before:w-[1.5px] before:absolute before:-left-0.5 before:top-0 before:z-50 relative':
					currentWordIndex === wordIndex &&
					currentLetterIndex === letterIndex,
			})}>
			{letter}
		</span>
	);
}

type LetterProps = {
	words: readonly string[];
	typedHistory: React.MutableRefObject<Record<string, string>>;
	wordIndex: number;
	letterIndex: number;
	letter: string;
	currentWordIndex: number;
	currentLetterIndex: number;
};

export default Letter;
