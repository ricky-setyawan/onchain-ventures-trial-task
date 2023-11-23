import apicall from './apicall'

export function getFuturesStats() {
	return apicall('GET', 'stats/getFuturesStats')
}
