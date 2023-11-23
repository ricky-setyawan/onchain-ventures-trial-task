import apicall from './apicall'

export function getMarkets() {
	return apicall('GET', 'futures/getMarkets')
}
