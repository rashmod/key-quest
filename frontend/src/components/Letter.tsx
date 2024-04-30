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
	const word = words[wordIndex];
	const wordKey = word + '.' + wordIndex;
	const typedWord = typedHistory.current[wordKey] as string | undefined;
	const typedLetter = typedWord ? typedWord[letterIndex] : undefined;
	const isLetterTyped = !!typedLetter;
	const isTypedLetterIncorrect = isLetterTyped && typedLetter !== letter;
	const isLetterExtra = letterIndex >= word.length;
	const isCorrect = !(isTypedLetterIncorrect || isLetterExtra);

	return (
		<span
			className={clsx({
				'text-white':
					wordIndex < currentWordIndex && isCorrect && isLetterTyped,
				'text-red-500': !isCorrect,
				'text-opacity-40': isLetterExtra,
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
