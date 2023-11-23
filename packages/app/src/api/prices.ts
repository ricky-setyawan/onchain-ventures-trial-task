import apicall from './apicall'

export function getPreviousDayPrices() {
	return apicall('GET', 'prices/getPreviousDayPrices')
}
