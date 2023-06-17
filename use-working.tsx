"use-client";
import { useState } from "react";

export function useWorking(defaultValue = false) {
	const [isWorking, setWorking] = useState(defaultValue);

	const wrapWorking = (code: (e: any) => Promise<any>) => {
		return async (e: any) => {
			setWorking(true);
			const result = await code(e);
			setWorking(false);
			return result;
		};
	};

	return { isWorking, setWorking, wrapWorking };
}
