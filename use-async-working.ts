import { useWorking } from "./use-working.tsx";
import { useCallback, useState } from "react";

export function useAsyncWorking(code: (e: any) => Promise<any>, deps: any[] = []) {
	const { isWorking, setWorking, wrapWorking } = useWorking();
	const [error, setError] = useState<Error|null>(null);
	const workingCode = wrapWorking(code);

	let run = useCallback(async (e: any) => {
		try {
			setError(null);
			return await workingCode(e);
		} catch (e) {
			setError(e as Error);
			setWorking(false);
		}
	}, deps);

	return {
		isWorking,
		error,
		run,
	};
}
