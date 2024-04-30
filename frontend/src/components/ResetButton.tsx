function ResetButton({
	reset,
	label,
	autoFocus = false,
}: {
	reset: () => void;
	label: string;
	autoFocus?: boolean;
}) {
	return (
		<button
			autoFocus={autoFocus}
			onClick={reset}
			className='w-1/2 py-2 mx-auto text-white transition rounded-md focus:outline-none focus:bg-slate-700 hover:bg-slate-700'>
			{label}
		</button>
	);
}

export default ResetButton;
