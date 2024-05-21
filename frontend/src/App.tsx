import TextDisplay from './components/TextDisplay';
import TestContextProvider from './context/TestContext/TestContextProvider';

function App() {
	return (
		<main className='flex flex-col min-h-screen bg-slate-800'>
			<section className='container grid items-center flex-grow mx-auto font-mono'>
				<TestContextProvider>
					<TextDisplay />
				</TestContextProvider>
			</section>
		</main>
	);
}

export default App;
