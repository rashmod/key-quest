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
	reset,
	setInputFocused,
	startTestIfNeeded,
}: HiddenInputProps) {
	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		startTestIfNeeded();

		const value = event.target.value;
		const isCurrentWordCompleted = value.match(/\s/);

		const wordKey = words[currentWordIndex] + '.' + currentWordIndex;
		typedHistory.current[wordKey] = value.trim();

		// console.log(value.replace(/\s/g, '_'), value.length);
		// console.log(typedHistory.current);

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

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		switch (event.key) {
			case 'Tab':
				event.preventDefault();
				reset();
				break;

			case 'Backspace':
				if (currentWordIndex === 0 && currentInput.length === 0) return;

				if (currentInput.length === 0) {
					event.preventDefault();

					const currentWordKey =
						words[currentWordIndex] + '.' + currentWordIndex;
					const previousWordIndex = currentWordIndex - 1;
					const previousWordKey =
						words[previousWordIndex] + '.' + previousWordIndex;
					const previousWord = typedHistory.current[previousWordKey];

					delete typedHistory.current[currentWordKey];
					typedWords.current.incorrect.delete(previousWordIndex);
					typedHistory.current[previousWordKey] = '';

					if (event.ctrlKey) {
						setCurrentWordIndex((current) => current - 1);
						setCurrentLetterIndex(0);
						setCurrentInput('');
					} else {
						setCurrentWordIndex((current) => current - 1);
						setCurrentLetterIndex(previousWord.length);
						setCurrentInput(previousWord);
					}
				}
				break;

			default:
				break;
		}
	}

	function isWordCorrect() {
		return words[currentWordIndex] === currentInput;
	}

	return (
		<input
			ref={inputRef}
			value={currentInput}
			onChange={onInputChange}
			onKeyDown={onKeyDown}
			onBlur={() => setInputFocused(false)}
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
	reset: () => void;
	setInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
	startTestIfNeeded: () => void;
};

export default HiddenInput;
