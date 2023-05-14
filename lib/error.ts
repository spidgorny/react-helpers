export class ErrorWithDetails extends Error {
	details: any;
	constructor(msg, details) {
		console.log('Details in ErrorWithDetails => ', details)
		super(msg)
		console.warn('ERROR MSG => ', msg)
		this.details = details
	}
}

export class ErrorWithCode extends Error {
	code: any;
	constructor(msg, code) {
		console.warn('new ERROR MSG => ', msg)
		console.log('ErrorWithCode => ', code)
		super(msg)
		this.code = code
	}
}

export class NotFoundError extends Error {}
