import { useEffect, useRef } from 'react';

function useScrollIntoView(currentWordIndex: number) {
	const previousWordRef = useRef<HTMLSpanElement>(null);
	const currentWordRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!currentWordRef.current) return;

		if (currentWordIndex === 0) {
			currentWordRef.current.scrollIntoView();
		}

		if (!previousWordRef.current) return;

		if (
			previousWordRef.current.offsetLeft >
			currentWordRef.current.offsetLeft
		) {
			previousWordRef.current.scrollIntoView();
		}
	}, [currentWordIndex]);

	return { currentWordRef, previousWordRef };
}

export default useScrollIntoView;
