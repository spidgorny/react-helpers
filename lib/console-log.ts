export function processStdoutWrite(...vars) {
	if (typeof process.stdout.write === 'function') {
		process.stdout.write(...vars)
	}
}

export function processStdoutClearLine(...vars) {
	if (typeof process.stdout.clearLine === 'function') {
		process.stdout.clearLine(...vars)
	}
}

export function processStdoutCursorTo(...vars) {
	if (typeof process.stdout.cursorTo === 'function') {
		process.stdout.cursorTo(...vars)
	}
}

