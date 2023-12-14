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
	const [buttonText, setButtonText] = useState("Add to cart");

	const handleClick = async () => {
		setButtonText("Adding...")

		if(product.product.models.length > 0) {
			const newCart = {
				product: product.product,
				quantity: $selectedOption.option,
				model: $model.model ? $model.model : product.product.models[0] ? product.product.models[0] : ""
			}
			if(newCart) {
				try {
					cart.set([...$cart, newCart])
					await trackAddToCart()
					setAdded(true)
					setButtonText("Added")
					setTimeout(() => {
						window.location.href = '/cart'
					}, 250);
				} catch (error) {
					console.log(error);
				}
			}
		} else {
			const newCart = {
				product: product.product,
				quantity: $selectedOption.option,
			}
			if(newCart) {
				try {
					cart.set([...$cart, newCart])
					await trackAddToCart()
					setAdded(true)
					setButtonText("Added")
					setTimeout(() => {
						window.location.href = '/cart'
					}, 250);
				} catch (error) {
					console.log(error);
				}
			}
		}
		const timer2 = setTimeout(() => {
			setAdded(false);
			setButtonText("Add to cart")	
		}, 3000);

    return () => clearTimeout(timer, timer2);
	}

	return (
		<button onClick={() => handleClick()} className={`button addtocart ${added && "added"} ${product.small && "smalladdtocart"}`}>{buttonText}</button>
	)
}

export default AddToCart