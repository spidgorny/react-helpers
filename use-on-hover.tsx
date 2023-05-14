import { useState } from "react";

export function useOnHover() {
	const [isHover, setHover] = useState(false);

	const onMouseEnter = (e) => {
		setHover(true);
	};

	const onMouseLeave = (e) => {
		setHover(false);
	};

	return {
		isHover,
		setHover,
		hoverEvents: {
			onMouseEnter,
			onMouseLeave,
		},
	};
}
