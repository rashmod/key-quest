import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateStatsInput } from './useTest';

function useTimer({
	currentWordIndex,
	currentLetterIndex,
	startTime,
	calculateStats,
	countOfTypedWords,
	totalWords,
}: useTimerInput) {
	const MAX_TIME = 5;
	const INTERVAL_MS = 500;

	const [timeLeft, setTimeLeft] = useState(MAX_TIME);
	const [isTestRunning, setIsTestRunning] = useState(false);

	const animationFrameId = useRef<number>(0);
	const lastUpdatedTime = useRef<number>(0);

	const updateTimeLeft = useCallback(() => {
		animationFrameId.current = requestAnimationFrame(updateTimeLeft);

		const currentTime = Date.now();
		const elapsedTime = (currentTime - (startTime.current ?? 0)) / 1000;
		const remainingTime = MAX_TIME - elapsedTime;

		if (
			currentTime - lastUpdatedTime.current >= INTERVAL_MS ||
			Math.round(remainingTime * 10) === 0
		) {
			if (elapsedTime > INTERVAL_MS / 1000) {
				calculateStats({ statType: 'accuracy' });
				calculateStats({ statType: 'wpm', wpmType: 'gross' });
				calculateStats({ statType: 'wpm', wpmType: 'net' });
			}
			setTimeLeft(remainingTime);
			lastUpdatedTime.current = currentTime;
		}

		if (remainingTime <= 0 || countOfTypedWords === totalWords)
			setIsTestRunning(false);
	}, [startTime, calculateStats, countOfTypedWords, totalWords]);

	useEffect(() => {
		if (isTestRunning) {
			updateTimeLeft();
		} else {
			cancelAnimationFrame(animationFrameId.current);
		}

		return () => cancelAnimationFrame(animationFrameId.current);
	}, [isTestRunning, updateTimeLeft]);

	function resetTimer() {
		setTimeLeft(MAX_TIME);
		setIsTestRunning(false);
	}

	function startTestIfNeeded() {
		if (isTestRunning) return;
		if (currentWordIndex === 0 && currentLetterIndex === 0) {
			setIsTestRunning(true);
			startTime.current = Date.now();
		}
	}

	return {
		timeLeft,
		isTestRunning,
		resetTimer,
		startTestIfNeeded,
	};
}

type useTimerInput = {
	currentWordIndex: number;
	currentLetterIndex: number;
	startTime: React.MutableRefObject<number | undefined>;
	calculateStats: (input: calculateStatsInput) => void;
	countOfTypedWords: number;
	totalWords: number;
};

export default useTimer;
