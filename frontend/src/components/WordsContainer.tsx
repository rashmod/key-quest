import { useEffect, useRef } from 'react';
import Word from './Word';

function WordsContainer({
	words,
	currentWordIndex,
	currentLetterIndex,
	typedHistory,
	typedWords,
	inputFocused,
	focusInput,
}: WordsContainerProps) {
	const previousWordRef = useRef<HTMLSpanElement>(null);
	const currentWordRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!currentWordRef.current || !previousWordRef.current) return;

		if (
			currentWordIndex !== 0 &&
			previousWordRef.current.offsetLeft >
				currentWordRef.current.offsetLeft
		) {
			previousWordRef.current.scrollIntoView();
		}
	}, [currentWordIndex]);

	return (
		<div className='relative h-24 px-2 overflow-y-hidden'>
			<div
				className='flex gap-x-[1ch] flex-wrap select-none text-xl leading-relaxed tracking-widest text-gray-500 absolute left-0.5'
				onClick={focusInput}>
				{words.map((word, wordIndex) => (
					<Word
						key={wordIndex}
						words={words}
						currentWordIndex={currentWordIndex}
						currentLetterIndex={currentLetterIndex}
						word={word}
						wordIndex={wordIndex}
						typedHistory={typedHistory}
						typedWords={typedWords}
						inputFocused={inputFocused}
						currentWordRef={currentWordRef}
						previousWordRef={previousWordRef}
					/>
				))}
			</div>
		</div>
	);
}

type WordsContainerProps = {
	words: readonly string[];
	currentWordIndex: number;
	currentLetterIndex: number;
	typedHistory: React.MutableRefObject<Record<string, string>>;
	typedWords: React.MutableRefObject<{ incorrect: Set<number> }>;
	inputFocused: boolean;
	focusInput: () => void;
};

export default WordsContainer;
