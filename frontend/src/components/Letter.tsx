import clsx from 'clsx';
import useTestContext from '../context/TestContext/useTestContext';
import generateWordKey from '../utilities/generateWordKey';

function Letter({ wordIndex, letterIndex, letter }: LetterProps) {
	const {
		currentWordIndex,
		currentLetterIndex,
		typedHistory,
		inputFocused,
		words,
	} = useTestContext();

	const word = words[wordIndex];
	const wordKey = generateWordKey(word, wordIndex);
	const typedWord = typedHistory.current[wordKey] as string | undefined;
	const typedLetter = typedWord ? typedWord[letterIndex] : undefined;
	const isLetterTyped = !!typedLetter;
	const isTypedLetterIncorrect = isLetterTyped && typedLetter !== letter;
	const isLetterExtra = letterIndex >= word.length;
	const isIncorrect = isTypedLetterIncorrect || isLetterExtra;

	const showCaret =
		inputFocused &&
		currentWordIndex === wordIndex &&
		currentLetterIndex === letterIndex;

	return (
		<span
			className={clsx({
				'text-white':
					wordIndex < currentWordIndex &&
					!isIncorrect &&
					isLetterTyped,
				'text-red-500': isIncorrect,
				'text-opacity-40': isLetterExtra,
				'relative before:bg-white before:h-[1.5em] before:w-[1.5px] before:absolute before:-left-0.5 before:top-0 before:z-50 before:animate-blink':
					showCaret,
			})}>
			{letter}
		</span>
	);
}

type LetterProps = {
	wordIndex: number;
	letterIndex: number;
	letter: string;
};

export default Letter;
