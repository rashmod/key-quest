import { useEffect, useMemo, useState } from 'react';

function useOnScreen(ref: React.RefObject<HTMLElement>) {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) =>
				setIntersecting(entry.isIntersecting)
			),
		[]
	);

	useEffect(() => {
		if (!ref.current) return;
		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [ref, observer]);

	return isIntersecting;
}

export default useOnScreen;