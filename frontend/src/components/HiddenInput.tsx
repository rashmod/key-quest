function HiddenInput({
	words,
	inputRef,
	currentInput,
	setCurrentInput,
	currentWordIndex,
	setCurrentWordIndex,
	setCurrentLetterIndex,
	typedHistory,
	typedWords,
}: HiddenInputProps) {
	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		const isCurrentWordCompleted = value.match(/\s/);

		const wordKey = words[currentWordIndex] + '.' + currentWordIndex;
		typedHistory.current[wordKey] = value.trim();

		console.log(value.replace(/\s/g, '_'), value.length);
		console.log(typedHistory.current);

		if (isCurrentWordCompleted) {
			// if (isWordCorrect())
			// 	typedWords.current.correct.add(currentWordIndex);
			// else typedWords.current.incorrect.add(currentWordIndex);

			if (!isWordCorrect())
				typedWords.current.incorrect.add(currentWordIndex);

			setCurrentInput('');
			setCurrentWordIndex((current) => current + 1);
			setCurrentLetterIndex(0);
			return;
		}

		setCurrentInput(value);
		setCurrentLetterIndex(value.length);
	}

	function isWordCorrect() {
		return words[currentWordIndex] === currentInput;
	}

	return (
		<input
			ref={inputRef}
			value={currentInput}
			onChange={onInputChange}
			// onKeyDown={onKeyDown}
			autoFocus
			type='text'
			autoCapitalize='off'
			autoComplete='off'
			autoCorrect='off'
			spellCheck='false'
			className='w-1/2 mx-auto border-2 border-blue-500 rounded-md focus:outline-none'
		/>
	);
}

type HiddenInputProps = {
	words: readonly string[];
	inputRef: React.RefObject<HTMLInputElement>;
	currentInput: string;
	setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
	currentWordIndex: number;
	setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
	setCurrentLetterIndex: React.Dispatch<React.SetStateAction<number>>;
	typedHistory: React.MutableRefObject<Record<string, string>>;
	typedWords: React.MutableRefObject<{
		// correct: Set<number>;
		incorrect: Set<number>;
	}>;
};

export default HiddenInput;
