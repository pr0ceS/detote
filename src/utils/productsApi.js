import { setHeaders } from "./headers";
import { navigate } from "astro/transitions/router";

export const getProducts = async () => {
	try {
		const res = await fetch("http://192.168.2.2:5000/api/products/");
		
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const getSingleProduct = async (id) => {
	try {
		const res = await fetch(`${apiUrl}/products/find/${id}`);

		return res.data;
	} catch (error) {
		navigate('/')
		console.log(error);
	}
}

export const createProduct = async (values) => {
	try {
		const res = await fetch(`${url}/products`, {
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
