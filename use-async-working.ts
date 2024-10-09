import { useWorking } from "spidgorny-react-helpers/use-working.tsx";
import { useCallback, useState } from "react";

export function useAsyncWorking(code: (e: any) => Promise<any>) {
	const { isWorking, setWorking, wrapWorking } = useWorking();
	const [error, setError] = useState();
	const workingCode = wrapWorking(code);

	let run = useCallback(async (e: any) => {
		try {
			setError(null);
			return await workingCode(e);
		} catch (e) {
			setError(e);
			setWorking(false);
		}
	}, []);

	return {
		isWorking,
		error,
		run,
	};
}
