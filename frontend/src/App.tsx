import words from './data/words';

function App() {
	return (
		<main className='flex flex-col min-h-screen bg-slate-800'>
			<section className='container grid items-center flex-grow mx-auto'>
				<div className='w-1/2 mx-auto font-mono text-xl leading-relaxed tracking-wider text-gray-400'>
					{words.map((word) => (
						<span>
							{word.split('').map((letter) => (
								<span>{letter}</span>
							))}
						</span>
					))}
				</div>
			</section>
		</main>
	);
}

export default App;
