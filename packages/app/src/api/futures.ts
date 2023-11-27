import apicall from './apicall'

export function getMarkets() {
	return apicall('GET', 'futures/getMarkets')
}

export function getFuturesTrades() {
	return apicall('GET', 'futures/getFuturesTrades')
}

export function getPythCandles() {
	return apicall('GET', 'futures/getPythCandles')
}

export function getFuturesMarkets() {
	return apicall('GET', 'futures/getFuturesMarkets')
}
