import clsx from 'clsx';

import Letter from './Letter';
import useTestContext from '../context/TestContext/useTestContext';

function Word({
	words,
	wordIndex,
	word,
	currentWordRef,
	previousWordRef,
}: WordProps) {
	const { currentWordIndex, typedWords, typedHistory } = useTestContext();

	const wordKey = words[wordIndex] + '.' + wordIndex;
	const typedWord = typedHistory.current[wordKey] ?? '';
	const extraLetters = typedWord.slice(word.length);
	const displayedWord = word + extraLetters + ' ';
	const isWordIncorrect = typedWords.current.incorrect.has(wordIndex);

	const isCurrentWord = wordIndex === currentWordIndex;
	const isPreviousWord = wordIndex === currentWordIndex - 1;

	return (
		<span
			className={clsx({
				'text-white': wordIndex === currentWordIndex,
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
					words={words}
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
	wordIndex: number;
	word: string;
	currentWordRef: React.RefObject<HTMLSpanElement>;
	previousWordRef: React.RefObject<HTMLSpanElement>;
};

export default Word;
