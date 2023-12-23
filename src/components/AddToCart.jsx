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

	const handleClick = async () => {
		setButtonText("Toevoegen...");
	
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