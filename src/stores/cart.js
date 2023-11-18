import { atom } from "nanostores";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import {
	getCart
} from "../utils/cartApi"

export const isCartDrawerOpen = atom(false);
export const isCartUpdating = atom(false);

export const cart = atom(
  {
    products: [],
    total: 0,
  }
)

export async function initCart() {
  const fingerprintId = await getCurrentBrowserFingerPrint();
  if (fingerprintId) {
    const data = await getCart(fingerprintId);

    if (data) {
      cart.set({
        products: data.products,
        total: data.total,
      });
    }
  }
}