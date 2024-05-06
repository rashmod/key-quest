import useTestContext from '../context/TestContext/useTestContext';
import generateWordKey from '../utilities/generateWordKey';

function HiddenInput() {
	const {
		currentInput,
		setCurrentInput,
		currentWordIndex,
		setCurrentWordIndex,
		setCurrentLetterIndex,
		typedWords,
		typedHistory,
		inputRef,
		setInputFocused,
		startTestIfNeeded,
		reset,
		words,
	} = useTestContext();

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		startTestIfNeeded();

		const value = event.target.value;
		const isCurrentWordCompleted = value.match(/\s/);

		const wordKey = generateWordKey(
			words[currentWordIndex],
			currentWordIndex
		);
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

					const currentWordKey = generateWordKey(
						words[currentWordIndex],
						currentWordIndex
					);
					const previousWordIndex = currentWordIndex - 1;
					const previousWordKey = generateWordKey(
						words[previousWordIndex],
						previousWordIndex
					);
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
			onFocus={() => setInputFocused(true)}
			autoFocus
			type='text'
			autoCapitalize='off'
			autoComplete='off'
			autoCorrect='off'
			spellCheck='false'
			className='absolute top-0 left-0 opacity-0'
		/>
	);
}

export default HiddenInput;
