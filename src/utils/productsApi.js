import { urlString } from "./api";
import { setHeaders } from "./headers";
import { navigate } from "astro/transitions/router";

export const getProducts = async () => {
	try {
		const res = await fetch(`${urlString}/products/withoutreviews`);
		
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const getSingleProduct = async (id) => {
	try {
		const res = await fetch(`${urlString}/products/find/${id}`);

		return res.data;
	} catch (error) {
		navigate('/')
		console.log(error);
	}
}

export const createReview = async (reviewData) => {
	try {
		const res = await fetch(`${urlString}/products/review`, {
			method: "POST",
			body: reviewData
		});
		
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const createProduct = async (values) => {
	try {
		const res = await fetch(`${urlString}/products`, {
			method: "POST",
			credentials: "include",
			body: values
		}
		);

		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const editProduct = async (values) => {
	try {
		const res = await axios.put(
			`${url}/products/${values.productId}`,
			values,
			setHeaders()
		);

		return res.data
	} catch (error) {
		console.log(error);
	}
}

export const deleteProduct = async (id) => {
	try {
		const res = await axios.delete(
			`${url}/products/${id}`,
			setHeaders()
		);

		return res.data
	} catch (error) {
		console.log(error);
	}
}
