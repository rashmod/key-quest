import TextDisplay from './components/TextDisplay';
import TestContextProvider from './context/TestContext/TestContextProvider';
import useGraph from './hooks/useGraph';

function App() {
	const { generateWord, graphDataIsLoading, graphDataIsError } = useGraph();

	return (
		<main className='flex flex-col min-h-screen bg-slate-800'>
			<section className='container grid items-center flex-grow mx-auto font-mono'>
				{graphDataIsLoading && (
					<p className='text-5xl text-center text-white'>
						Loading...
					</p>
				)}
				{graphDataIsError && (
					<p className='text-5xl text-center text-red-500'>Error</p>
				)}
				{!graphDataIsLoading && !graphDataIsError && (
					<TestContextProvider generateWord={generateWord}>
						<TextDisplay />
					</TestContextProvider>
				)}
			</section>
		</main>
	);
}

export default App;
