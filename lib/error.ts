export class ErrorWithDetails extends Error {
	details: any;
	constructor(msg: string, details: any) {
		console.log('Details in ErrorWithDetails => ', details)
		super(msg)
		console.warn('ERROR MSG => ', msg)
		this.details = details
	}
}

export class ErrorWithCode extends Error {
	code: number|string;
	constructor(msg: string, code: number|string) {
		console.warn('new ERROR MSG => ', msg)
		console.log('ErrorWithCode => ', code)
		super(msg)
		this.code = code
	}
}

export class NotFoundError extends Error {}
