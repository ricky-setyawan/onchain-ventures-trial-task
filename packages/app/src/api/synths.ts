import apicall from './apicall'

export function getSynthBalances() {
	return apicall('GET', 'synths/getSynthBalances')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getSynthV3BalancesAndAllowances(walletAddress: string, spenders: string[]) {
	return apicall('GET', 'synths/getSynthV3BalancesAndAllowances')
}
