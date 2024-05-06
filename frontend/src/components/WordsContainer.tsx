import { useEffect, useRef } from 'react';

import Word from './Word';
import useTestContext from '../context/TestContext/useTestContext';

function WordsContainer() {
	const { currentWordIndex, focusInput, words } = useTestContext();

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
						word={word}
						wordIndex={wordIndex}
						currentWordRef={currentWordRef}
						previousWordRef={previousWordRef}
					/>
				))}
			</div>
		</div>
	);
}

export default WordsContainer;
