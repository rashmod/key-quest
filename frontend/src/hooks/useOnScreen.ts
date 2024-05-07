import { useEffect, useMemo, useState } from 'react';

function useOnScreen(ref: React.RefObject<HTMLElement>) {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) =>
				setIsIntersecting(entry.isIntersecting)
			),
		[]
	);

	useEffect(() => {
		if (!ref.current) return;
		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [ref, observer]);

	return [isIntersecting, setIsIntersecting] as const;
}

export default useOnScreen;
