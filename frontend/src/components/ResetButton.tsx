function ResetButton({ reset, label, autoFocus = false }: ResetButtonProps) {
	return (
		<button
			autoFocus={autoFocus}
			onClick={reset}
			className='w-1/2 py-2 mx-auto text-white transition rounded-md focus:outline-none focus:bg-slate-700 hover:bg-slate-700'>
			{label}
		</button>
	);
}

type ResetButtonProps = {
	reset: () => void;
	label: string;
	autoFocus?: boolean;
};

export default ResetButton;
