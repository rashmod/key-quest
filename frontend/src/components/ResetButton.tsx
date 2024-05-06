import useTestContext from '../context/TestContext/useTestContext';

function ResetButton({ label, autoFocus = false }: ResetButtonProps) {
	const { reset } = useTestContext();

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
	label: string;
	autoFocus?: boolean;
};

export default ResetButton;
