import clsx from 'clsx';

import Letter from './Letter';
import useTestContext from '../context/TestContext/useTestContext';
import generateWordKey from '../utilities/generateWordKey';

function Word({ wordIndex, word }: WordProps) {
	const {
		currentWordIndex,
		typedWords,
		typedHistory,
		words,
		currentWordRef,
		previousWordRef,
	} = useTestContext();

	const wordKey = generateWordKey(words[wordIndex], wordIndex);
	const typedWord = typedHistory.current[wordKey] ?? '';
	const extraLetters = typedWord.slice(word.length);
	const displayedWord = word + extraLetters + ' ';
	const isWordIncorrect = typedWords.current.incorrect.has(wordIndex);

	const isCurrentWord = wordIndex === currentWordIndex;
	const isPreviousWord = wordIndex === currentWordIndex - 1;

	return (
		<span
			className={clsx({
				'underline underline-offset-4 decoration-red-500':
					isWordIncorrect,
			})}
			ref={
				isCurrentWord
					? currentWordRef
					: isPreviousWord
					? previousWordRef
					: null
			}>
			{displayedWord.split('').map((letter, letterIndex) => (
				<Letter
					key={`${wordIndex}-${letterIndex}`}
					wordIndex={wordIndex}
					letterIndex={letterIndex}
					letter={letter}
				/>
			))}
		</span>
	);
}

type WordProps = {
	wordIndex: number;
	word: string;
};

export default Word;
