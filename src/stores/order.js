import { atom } from "nanostores";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { urlString } from "../utils/api";
import { trackConvert } from "./visit";

export const order = atom(
  {
    order: [],
  }
)

export async function getLatestOrder () {
	const fingerprint = await getCurrentBrowserFingerPrint();
	await trackConvert();
	const response = await fetch(`${urlString}/orders/find/order/${fingerprint}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const orderData = await response.json();
	if (await orderData) {
		order.set({
			order: orderData.order
		}); // Corrected this line
	}

	return orderData
}