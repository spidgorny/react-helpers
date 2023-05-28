import os from "os";
import {ReactElement, ReactNode} from "react";

export function Debug({children, show, hide, className}: { children: ReactNode, show?: boolean; hide?: boolean; className?: string}) {
	if (hide) {
		return null;
	}

	if (show) {
		return <span>{children}</span>;
	}

	if (typeof document !== 'object') {
		return null;
	}

	const hostname = os?.hostname();
	const isDev = hostname?.includes('ngrok');
	// console.log({ isDev })
	if (isDev) {
		return <div className={className}>{children}</div>
	}

	if (!document?.cookie?.includes("depidsvy")) {
		return null;
	}

	return <div className={className}>{children}</div>
}

export function WithDebug(props) {
	if (props.show === false) {
		return null;
	}
	if (typeof document === "object" && document.cookie?.includes("sa.aabe45f3d4")) {
		// console.log("cookies", document.cookie);
		return props.children;
	}
	return null;
}


export function Json({data}) {
	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}


export function JsonDetails({name, data}) {
	return (
		<div>
			<legend className="fs-6">{name ?? "JSON"}</legend>
			<details>
				<Json data={data}/>
			</details>
		</div>
	);
}
