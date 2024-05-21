import { useEffect, useRef } from 'react';

import Word from './Word';
import useTestContext from '../context/TestContext/useTestContext';
import useOnScreen from '../hooks/useOnScreen';

function WordsContainer() {
	const dummyRef = useRef<HTMLSpanElement>(null);
	const [isIntersecting, setIsIntersecting] = useOnScreen(dummyRef);

	const { focusInput, words, getMoreWords } = useTestContext();

	useEffect(() => {
		if (isIntersecting) {
			setIsIntersecting(false);
			getMoreWords();
		}
	}, [isIntersecting, getMoreWords, setIsIntersecting]);

	return (
		<div className='relative h-24 px-2 overflow-y-hidden'>
			<div
				className='flex gap-x-[1ch] flex-wrap select-none text-xl leading-relaxed tracking-widest text-gray-500 absolute left-0.5'
				onClick={focusInput}>
				{words.map((word, wordIndex) => (
					<Word key={wordIndex} word={word} wordIndex={wordIndex} />
				))}
				<span ref={dummyRef}>{isIntersecting ? '...' : ''}</span>
			</div>
		</div>
	);
}

export default WordsContainer;
