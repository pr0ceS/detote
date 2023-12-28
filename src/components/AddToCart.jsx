import { useState } from "react";
import { useStore } from "@nanostores/react";
import { selectedOption } from "../stores/selectedOption";
import { trackAddToCart } from "../stores/visit";
import { model } from "../stores/models";
import { cart } from "../stores/cart";


const AddToCart = (product) => {
	const $selectedOption = useStore(selectedOption);
	const $cart = useStore(cart)
	const $model = useStore(model);
	const [added, setAdded] = useState(false);
	const [buttonText, setButtonText] = useState("In winkelwagen");

	const generateUUID = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	};

	const handleClick = async () => {
		setButtonText("Toevoegen...");

		pintrk('track', 'addtocart', {
			event_id: generateUUID(),
			value: product.product.price * $selectedOption.option * ($selectedOption.option >= 3 ? 0.85 : 1),
			order_quantity: 1,
			currency: 'EUR',
			line_items: [
				{
					product_name: product.product.name,
					product_id: product.product._id,
					product_quantity: $selectedOption.option,
				}
			]
		});

		const selectedModel = $model.model ? $model.model : (product.product.models && product.product.models[0]) || "";
	
		const existingProduct = $cart.find(
			(cartProduct) =>
				cartProduct.product.name === product.product.name && cartProduct.model === selectedModel
		);
	
		if (existingProduct) {
			// Product with the same name and model already exists, update quantity
			const updatedCart = $cart.map((cartProduct) =>
				cartProduct.product.name === product.product.name && cartProduct.model === selectedModel
					? { ...cartProduct, quantity: cartProduct.quantity + $selectedOption.option }
					: cartProduct
			);
	
			cart.set(updatedCart);
		} else {
			// Product doesn't exist, add it to the cart
			const newCart = {
				product: product.product,
				quantity: $selectedOption.option,
				model: selectedModel,
			};
	
			cart.set([...$cart, newCart]);
		}
	
		try {
			await trackAddToCart();
			setAdded(true);
			setButtonText("Toegevoegd");
			setTimeout(() => {
				window.location.href = "/winkelwagen";
			}, 250);
		} catch (error) {
			console.log(error);
		}
	
		const timer2 = setTimeout(() => {
			setAdded(false);
			setButtonText("In winkelwagen");
		}, 3000);
	
		return () => clearTimeout(timer2);
	};
	

	return (
		<button onClick={() => handleClick()} className={`button addtocart ${added && "added"} ${product.small && "smalladdtocart"}`}>{buttonText}</button>
	)
}

export default AddToCart