import TextDisplay from './components/TextDisplay';

function App() {
	return (
		<main className='flex flex-col min-h-screen bg-slate-800'>
			<section className='container grid items-center flex-grow mx-auto font-mono'>
				<TextDisplay />
			</section>
		</main>
	);
}

export default App;
