import HiddenInput from './HiddenInput';
import WordsContainer from './WordsContainer';
import Stats from './Stats';

import useTestContext from '../context/TestContext/useTestContext';
import ResultPage from '../pages/ResultPage';

function TextDisplay() {
	const { isTestCompleted } = useTestContext();

	if (isTestCompleted) {
		return <ResultPage />;
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
