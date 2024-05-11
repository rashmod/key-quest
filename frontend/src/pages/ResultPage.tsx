import ResetButton from '../components/ResetButton';
import StatCard from '../components/StatCard';

function ResultPage() {
	return (
		<div className='flex flex-col items-center w-full gap-4 text-gray-300'>
			<h1 className='text-3xl text-gray-500'>Test Completed</h1>
			<StatCard />
			<ResetButton label='Start Again' autoFocus />
		</div>
	);
}

export default ResultPage;
