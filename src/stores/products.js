import { atom } from "nanostores";
import {
	getProducts
} from "../utils/productsApi"

export const productsLoading = atom(true);
export const secondHoverImage = atom(false);

export const products = atom(
  {
    products: [],
  }
)

export async function initProducts() {
	const data = await getProducts();

	if (data) {
		products.set({
			products: data,
		});
	}

	return data;
}