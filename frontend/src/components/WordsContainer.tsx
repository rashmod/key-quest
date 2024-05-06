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
	return (
		<div
			className='flex gap-x-[1ch] flex-wrap text-xl leading-relaxed tracking-widest text-gray-500'
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
				/>
			))}
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
