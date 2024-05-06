import Word from './Word';
import useTestContext from '../context/TestContext/useTestContext';

function WordsContainer() {
	const { focusInput, words } = useTestContext();

	return (
		<div className='relative h-24 px-2 overflow-y-hidden'>
			<div
				className='flex gap-x-[1ch] flex-wrap select-none text-xl leading-relaxed tracking-widest text-gray-500 absolute left-0.5'
				onClick={focusInput}>
				{words.map((word, wordIndex) => (
					<Word key={wordIndex} word={word} wordIndex={wordIndex} />
				))}
			</div>
		</div>
	);
}

export default WordsContainer;
