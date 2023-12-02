import { urlString } from "./api";

export const login = async (email, password) => {
	try {
		const res = await fetch(`${urlString}/api/auth/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email, password})
		});

		const data = await res.json();
  	return data;
	} catch (error) {
		console.log(error);
	}
}
