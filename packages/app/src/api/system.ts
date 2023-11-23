import apicall from './apicall'

export function getSynthetixStatus() {
	return apicall('GET', 'system/checkSynthetixStatus')
}

export function fetchKwentaStatus() {
	return apicall('GET', 'system/fetchKwentaStatus')
}
