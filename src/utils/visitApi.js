

export const newVisit = async (fingerprint, ip, visitRef, origin, country, utm_source, utm_medium, referrer ) => {
	try {

		const bodyData = {
			fingerprint: await fingerprint,
			ip: await ip,
			visitRef: await visitRef,
			origin: await origin,
			country: await country,
			utm_source: await utm_source,
			utm_medium: await utm_medium,
			referrer: await referrer,
		};

		const res = await fetch('http://localhost:5000/api/guest', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData)
		});

		const data = await res.json();
  	return data;
	} catch (error) {
		console.log(error);
	}
}