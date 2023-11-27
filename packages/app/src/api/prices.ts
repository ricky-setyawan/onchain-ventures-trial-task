import apicall from './apicall'

export function getPreviousDayPrices() {
	return apicall('GET', 'prices/getPreviousDayPrices')
}

export function getUpdatedPrices() {
	return apicall('GET', 'prices/getUpdatedPrices')
}

export function getPortfolioPrices() {
	return apicall('GET', 'prices/getPortfolioPrices')
}
