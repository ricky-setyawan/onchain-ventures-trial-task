import apicall from './apicall'

export function getTokenBalances() {
	return apicall('GET', 'exchange/getTokenBalances')
}
