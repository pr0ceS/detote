import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import {
	getProducts
} from "../utils/productsApi"

export const userLoading = atom(true);

export const user = persistentAtom("user", 
  {
		isLoggedIn: false,
		isAdmin: false,
    userId: "",
		name: "",
		email: ""
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