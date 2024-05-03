import { useCallback, useEffect, useRef, useState } from 'react';

function useTimer({
	currentWordIndex,
	currentLetterIndex,
	startTime,
	calculateWPM,
}: useTimerInput) {
	const MAX_TIME = 15;
	const INTERVAL_MS = 500;

	const [timeLeft, setTimeLeft] = useState(MAX_TIME);
	const [isTestRunning, setIsTestRunning] = useState(false);

	const animationFrameId = useRef<number>(0);
	const lastUpdatedTime = useRef<number>(0);

	const updateTimeLeft = useCallback(() => {
		animationFrameId.current = requestAnimationFrame(updateTimeLeft);

		const currentTime = Date.now();
		const elapsedTime = (currentTime - (startTime.current ?? 0)) / 1000;
		const remainingTime =
			MAX_TIME - elapsedTime ? MAX_TIME - elapsedTime : 0;

		if (currentTime - lastUpdatedTime.current >= INTERVAL_MS) {
			if (lastUpdatedTime.current === 0) {
				calculateWPM('gross');
				calculateWPM('net');
			}
			setTimeLeft(remainingTime);
			lastUpdatedTime.current = currentTime;
		}
		if (remainingTime <= 0) setIsTestRunning(false);
	}, [startTime, calculateWPM]);

	useEffect(() => {
		if (isTestRunning) {
			updateTimeLeft();
		} else {
			cancelAnimationFrame(animationFrameId.current);
		}
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
	calculateWPM: (wpmType: 'gross' | 'net') => void;
};

export default useTimer;
