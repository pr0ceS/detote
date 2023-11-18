
export const getLocale = async () => {
	try {
		const res = await fetch('http://ip-api.com/json/?fields=status,continent,continentCode,country,countryCode,region,regionName,timezone,query')

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}