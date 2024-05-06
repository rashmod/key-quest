import HiddenInput from './HiddenInput';
import ResetButton from './ResetButton';
import WordsContainer from './WordsContainer';
import Stats from './Stats';

import useTestContext from '../context/TestContext/useTestContext';

function TextDisplay() {
	const { grossWPM, netWPM, accuracy, isTestCompleted } = useTestContext();

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
				<ResetButton label='Start Again' autoFocus />
			</div>
		);
	}

	return (
		<Stats>
			<WordsContainer />
			<HiddenInput />
			{/* <ResetButton label='Reset' /> */}
		</Stats>
	);
}

export default TextDisplay;
