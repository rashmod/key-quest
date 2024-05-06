function Stats({ children, timeLeft, grossWPM, netWPM, accuracy }: StatsProps) {
	return (
		<div className='relative grid items-center gap-8'>
			<h2 className='text-center text-gray-900 text-9xl'>
				{timeLeft.toFixed(0)}
			</h2>
			<div className='w-1/2 mx-auto'>{children}</div>
			<h2 className='text-center text-gray-900 text-7xl'>
				{grossWPM.toFixed(0)} WPM -- {netWPM.toFixed(0)} Net WPM --{' '}
				{accuracy.toFixed(0)}%
			</h2>
		</div>
	);
}

type StatsProps = {
	children: React.ReactNode;
	timeLeft: number;
	grossWPM: number;
	netWPM: number;
	accuracy: number;
};

export default Stats;
