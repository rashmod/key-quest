import { useContext } from 'react';
import TestContext from './TestContext';

function useTestContext() {
	const context = useContext(TestContext);

	if (!context) {
		throw new Error(
			'useTestContext must be used within a TestContextProvider'
		);
	}
	return context;
}

export default useTestContext;
