export const fetchDomainsUrls = (urls) => {
	return fetch(urls, {
		method: 'GET'
	})
		.then((response) => response.json())
}
