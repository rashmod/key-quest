import { createContext } from 'react';
import useTest from '../../hooks/useTest';
import useTimer from '../../hooks/useTimer';

type TestContextType = {
	currentInput: string;
	setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
	currentWordIndex: number;
	setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
	currentLetterIndex: number;
	setCurrentLetterIndex: React.Dispatch<React.SetStateAction<number>>;
	typedWords: React.MutableRefObject<{
		incorrect: Set<number>;
	}>;
	typedHistory: React.MutableRefObject<Record<string, string>>;
	inputRef: React.RefObject<HTMLInputElement>;
	startTime: React.MutableRefObject<number | undefined>;
	inputFocused: boolean;
	setInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
	isTestCompleted: boolean;
	focusInput: () => void;
	reset: () => void;
	words: readonly string[];
} & ReturnType<typeof useTest> &
	ReturnType<typeof useTimer>;

const TestContext = createContext<TestContextType | null>(null);

export default TestContext;