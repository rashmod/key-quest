import { useEffect, useState } from 'react';

function useTimer({ currentWordIndex, currentLetterIndex }: useTimerInput) {
	const MAX_TIME = 5;
	const INTERVAL_MS = 1000;

	const [timeLeft, setTimeLeft] = useState(MAX_TIME);
	const [isTestRunning, setIsTestRunning] = useState(false);

	useEffect(() => {
		if (!isTestRunning) return;
		const timer = setTimeout(() => {
			if (timeLeft > 0) setTimeLeft((time) => time - INTERVAL_MS / 1000);
			else setIsTestRunning(false);
		}, INTERVAL_MS);

		return () => clearTimeout(timer);
	}, [timeLeft, isTestRunning]);

	function resetTimer() {
		setTimeLeft(MAX_TIME);
		setIsTestRunning(false);
	}

	function startTestIfNeeded() {
		if (isTestRunning) return;
		if (currentWordIndex === 0 && currentLetterIndex === 0)
			setIsTestRunning(true);
	}

	return { timeLeft, isTestRunning, resetTimer, startTestIfNeeded };
}

type useTimerInput = {
	currentWordIndex: number;
	currentLetterIndex: number;
};

export default useTimer;
