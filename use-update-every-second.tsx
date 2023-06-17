"use-client";
import { useEffect, useState } from "react";

export function UpdateEverySecond({ children, refreshInterval = 1000 }) {
	const [_, setForceRefresh] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setForceRefresh((_) => _ + 1);
		}, refreshInterval);
		return () => clearInterval(timer);
	}, [refreshInterval]);

	return children;
}
