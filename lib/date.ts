import {DateTime} from 'luxon'
import util from 'util'
import {
  processStdoutClearLine,
  processStdoutCursorTo,
  processStdoutWrite,
} from './console-log-colors.mjs'

export function isoDateInNY(iso) {
	const date = typeof iso === 'string' ? DateTime.fromISO(iso) : DateTime.fromJSDate(iso)
	return date.setZone('America/New_York').toISODate()
}

export function getDateTime(iso) {
	const date = typeof iso === 'string' ? DateTime.fromISO(iso) : DateTime.fromJSDate(iso)
	return date
}

export function usDate(iso) {
	const date = new Date(iso)
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		timeZone: 'America/New_York',
	}
	return date.toLocaleDateString('en-US', options)
}

// June 06, 2022
export function longDate(iso) {
	const date = new Date(iso)
	const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' }
	return date.toLocaleDateString('en-US', options)
}

// June 06
export function shortDate(iso) {
	const date = new Date(iso)
	const options = { month: 'long', day: 'numeric', timeZone: 'America/New_York' }
	return date.toLocaleDateString('en-US', options)
}

export function isValidDate(d) {
	return d instanceof Date && !isNaN(d)
}

export function sleepMs(waitTime = 1000) {
	return new Promise((res) => setTimeout(res, waitTime))
}

export async function sleepCounter(seconds) {
	return new Promise(async (resolve) => {
		while (seconds > 0) {
			processStdoutClearLine()
			processStdoutCursorTo(0)
			let message = util.inspect(['⌛ Waiting', seconds, 'seconds'].join(' '))
			processStdoutWrite(message)
			await sleep(1)
			seconds--
		}
		processStdoutClearLine()
		processStdoutWrite('\n') // end the line
		resolve()
	})
}

export function sleep(seconds) {
	if (isNaN(seconds)) {
		console.log('Provided value for seconds to sleep, should be a valid number.')
		return
	}
	return new Promise((r) => setTimeout(() => r(), (Number(seconds) * 1000) | 0))
}

export function getNowForSQL() {
	return DateTime.now()
		.setZone('America/New_York')
		.toSQL({ includeOffset: false, includeZone: false })
}

export function convertEpochTimeToNormalTime(epochTimeStamp) {
  const reformattedTimeStamp = new Date(epochTimeStamp * 1000);
  return new Date(reformattedTimeStamp).toISOString().substring(0, 19);
}
