import { atom } from "nanostores";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import {
	getCart
} from "../utils/cartApi"
import { persistentAtom } from "@nanostores/persistent";

export const isCartDrawerOpen = atom(false);

export const cart = persistentAtom('cart', [], {
    encode: JSON.stringify,
    decode: JSON.parse
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