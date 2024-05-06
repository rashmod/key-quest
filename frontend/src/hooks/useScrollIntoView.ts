import { useEffect, useRef } from 'react';

function useScrollIntoView(currentWordIndex: number) {
	const previousWordRef = useRef<HTMLSpanElement>(null);
	const currentWordRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!currentWordRef.current || !previousWordRef.current) return;

		if (
			currentWordIndex !== 0 &&
			previousWordRef.current.offsetLeft >
				currentWordRef.current.offsetLeft
		) {
			previousWordRef.current.scrollIntoView();
		}
	}, [currentWordIndex]);

	return { currentWordRef, previousWordRef };
}

export default useScrollIntoView;
