import words from '../data/words';

import HiddenInput from './HiddenInput';
import ResetButton from './ResetButton';
import WordsContainer from './WordsContainer';
import Stats from './Stats';

import useTimer from '../hooks/useTimer';
import useTest from '../hooks/useTest';
import useTestContext from '../context/TestContext/useTestContext';

function TextDisplay() {
	const {
		setCurrentInput,
		currentWordIndex,
		setCurrentWordIndex,
		currentLetterIndex,
		setCurrentLetterIndex,
		typedWords,
		typedHistory,
		inputRef,
		startTime,
		setInputFocused,
	} = useTestContext();

	const { grossWPM, netWPM, accuracy, calculateStats, resetTest } = useTest({
		startTime: startTime.current,
		typedWords,
		typedHistory,
	});

	const { resetTimer, timeLeft, startTestIfNeeded } = useTimer({
		currentWordIndex,
		currentLetterIndex,
		startTime,
		calculateStats,
	});

	const isTestCompleted = currentWordIndex === words.length || timeLeft <= 0;

	function focusInput() {
		inputRef.current?.focus();
		setInputFocused(true);
	}

	function reset() {
		setCurrentInput('');
		setCurrentWordIndex(0);
		setCurrentLetterIndex(0);
		typedWords.current = {
			// correct: new Set<number>(),
			incorrect: new Set<number>(),
		};
		typedHistory.current = {};
		focusInput();
		resetTimer();
		resetTest();
	}

	if (isTestCompleted) {
		return (
			<div className='flex flex-col items-center w-full gap-4 text-white'>
				<h1 className='text-3xl text-gray-500'>Test Completed</h1>
				<div className='grid items-center grid-cols-3 text-center gap-y-4 gap-x-8'>
					<div className='col-span-3'>Your stats</div>
					<div className='row-span-2'>
						<div>Gross WPM</div>
						<div className='text-7xl'>{grossWPM.toFixed(0)}</div>
					</div>
					<div className='row-span-2'>
						<div>Net WPM</div>
						<div className='text-7xl'>{netWPM.toFixed(0)}</div>
					</div>
					<div className='row-span-2'>
						<div>Accuracy</div>
						<div className='text-7xl'>{accuracy.toFixed(0)}%</div>
					</div>
				</div>
				<ResetButton reset={reset} label='Start Again' autoFocus />
			</div>
		);
	}

	return (
		<Stats
			timeLeft={timeLeft}
			grossWPM={grossWPM}
			netWPM={netWPM}
			accuracy={accuracy}>
			<WordsContainer words={words} focusInput={focusInput} />
			<HiddenInput
				words={words}
				reset={reset}
				startTestIfNeeded={startTestIfNeeded}
			/>
			{/* <ResetButton reset={reset} label='Reset' /> */}
		</Stats>
	);
}

export default TextDisplay;
