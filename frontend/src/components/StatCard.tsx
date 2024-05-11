import useTestContext from '../context/TestContext/useTestContext';

function StatCard() {
	const { grossWPM, netWPM, accuracy } = useTestContext();

	return (
		<div className='grid items-center grid-cols-3 text-center gap-y-4 gap-x-8'>
			{/* <div className='col-span-3'>Your stats</div> */}
			<div className='row-span-2'>
				<div className='text-2xl font-bold'>Gross WPM</div>
				<div className='text-7xl'>{grossWPM.toFixed(0)}</div>
			</div>
			<div className='row-span-2'>
				<div className='text-2xl font-bold'>Net WPM</div>
				<div className='text-7xl'>{netWPM.toFixed(0)}</div>
			</div>
			<div className='row-span-2'>
				<div className='text-2xl font-bold'>Accuracy</div>
				<div className='text-7xl'>{accuracy.toFixed(0)}%</div>
			</div>
		</div>
	);
}

export default StatCard;
