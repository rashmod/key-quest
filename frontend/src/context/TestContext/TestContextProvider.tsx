import { useRef, useState } from 'react';

import TestContext from './TestContext';

function TestContextProvider({ children }: TestContextProviderProps) {
	const [currentInput, setCurrentInput] = useState('');
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const [inputFocused, setInputFocused] = useState(true);

	const typedWords = useRef({
		// correct: new Set<number>(),
		incorrect: new Set<number>(),
	});
	const typedHistory = useRef<Record<string, string>>({});

	const inputRef = useRef<HTMLInputElement>(null);
	const startTime = useRef<number>();

	return (
		<TestContext.Provider
			value={{
				currentInput,
				setCurrentInput,
				currentWordIndex,
				setCurrentWordIndex,
				currentLetterIndex,
				setCurrentLetterIndex,
				typedWords,
				typedHistory,
				inputRef,
				startTime,
				inputFocused,
				setInputFocused,
			}}>
			{children}
		</TestContext.Provider>
	);
}

type TestContextProviderProps = {
	children: React.ReactNode;
};

export default TestContextProvider;
