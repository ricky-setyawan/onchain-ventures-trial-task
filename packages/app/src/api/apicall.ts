/* eslint-disable no-console */
import axios from 'axios'

export default async function apicall(
	type: 'POST' | 'GET',
	url: string,
	data: any = undefined,
	headers: any = undefined
) {
	return new Promise((resolve, reject) => {
		const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL
		if (!baseurl) reject('[APICALL] Invalid API_BASE_URL')
		axios({
			method: type,
			url: `${baseurl}/${url}`,
			data: data,
			headers: headers,
		})
			.then((res) => {
				resolve(res.data.data)
			})
			.catch((err) => {
				console.log(`[APICALL - Method:${type}, Url: ${url}, Body: ${data}`, err)
				reject(err)
			})
	})
}
