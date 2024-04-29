import clsx from 'clsx';

function Letter({
	typedHistory,
	words,
	wordIndex,
	letterIndex,
	letter,
}: LetterProps) {
	const wordKey = words[wordIndex] + '.' + wordIndex;
	const typedWord = typedHistory.current[wordKey];
	const typedLetter = typedWord ? typedWord[letterIndex] : undefined;
	const isTypedLetterIncorrect = typedLetter && typedLetter !== letter;

	return (
		<span className={clsx({ 'text-red-500': isTypedLetterIncorrect })}>
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
};

export default Letter;