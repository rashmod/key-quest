import useTestContext from '../context/TestContext/useTestContext';
import StatCard from './StatCard';

function Stats({ children }: StatsProps) {
	const { timeLeft } = useTestContext();

	return (
		<div className='relative grid items-center w-1/2 gap-8 mx-auto text-gray-900'>
			<h2 className='text-center text-9xl'>{timeLeft.toFixed(0)}</h2>
			<div>{children}</div>
			<StatCard />
		</div>
	);
}

type StatsProps = {
	children: React.ReactNode;
};

export default Stats;
