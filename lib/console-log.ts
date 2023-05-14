export function processStdoutWrite(...vars: any[]) {
	if (typeof process.stdout.write === 'function') {
		// @ts-ignore
		process.stdout.write(...vars)
	}
}

export function processStdoutClearLine(...vars: any[]) {
	if (typeof process.stdout.clearLine === 'function') {
		// @ts-ignore
		process.stdout.clearLine(...vars)
	}
}

export function processStdoutCursorTo(...vars: any[]) {
	if (typeof process.stdout.cursorTo === 'function') {
		// @ts-ignore
		process.stdout.cursorTo(...vars)
	}
}

