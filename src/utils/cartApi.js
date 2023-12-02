import { urlString } from "./api";

export const getCart = async (fingerprint) => {
	try {
		const res = await fetch(`${urlString}/cart/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({fingerprint: fingerprint.toString()})
		});

		const data = await res.json();
  	return data;
	} catch (error) {
		console.log(error);
	}
}

export const addToCart = async (newCart) => {
	try {
		const res = await fetch(`${urlString}/cart/add`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCart)
		});
		
		const data = await res.json();
  	return data;
	} catch (error) {
		console.log(error);
	}
}

// export const addCart = async (values) => {
// 	try {
// 		const res = await axios.put(
// 			`${url}/products/${values.productId}`,
// 			values,
// 			setHeaders()
// 		);

// 		return res.data
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// export const editCart = async (id) => {
// 	try {
// 		const res = await axios.delete(
// 			`${url}/products/${id}`,
// 			setHeaders()
// 		);

// 		return res.data
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
