
export const getLocale = async () => {
	try {
		const res = await fetch('https://freeipapi.com/api/json')

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}