import { urlString } from "./api";


export const newVisit = async (fingerprint, ip, visitRef, origin, country, utm_source, utm_medium, referrer, device) => {
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
			device: await device,
		};

		const res = await fetch(`${urlString}/guest`, {
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

export const newAddToCart = async (fingerprint, visitRef, origin, country, utm_source, utm_medium, referrer, device) => {
	try {

		const bodyData = {
			fingerprint: await fingerprint,
			visitRef: await visitRef,
			origin: await origin,
			country: await country,
			utm_source: await utm_source,
			utm_medium: await utm_medium,
			referrer: await referrer,
			device: await device,
		};

		const res = await fetch(`${urlString}/guest/cart`, {
			method: "PUT",
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

export const newCheckout = async (fingerprint, visitRef, origin, country, utm_source, utm_medium, referrer, device) => {
	try {
		const bodyData = {
			fingerprint: await fingerprint,
			visitRef: await visitRef,
			origin: await origin,
			country: await country,
			utm_source: await utm_source,
			utm_medium: await utm_medium,
			referrer: await referrer,
			device: await device,
		};

		const res = await fetch(`${urlString}/guest/checkout`, {
			method: "PUT",
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

export const newConvert = async (fingerprint, visitRef, origin, country, utm_source, utm_medium, referrer, device) => {
	try {
		const bodyData = {
			fingerprint: await fingerprint,
			visitRef: await visitRef,
			origin: await origin,
			country: await country,
			utm_source: await utm_source,
			utm_medium: await utm_medium,
			referrer: await referrer,
			device: await device,
		};

		const res = await fetch(`${urlString}/guest/converted`, {
			method: "PUT",
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