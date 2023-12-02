import { useState } from "react";
import { useStore } from "@nanostores/react";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { selectedOption } from "../stores/selectedOption";
import { addToCart } from "../utils/cartApi";
import { trackAddToCart } from "../stores/visit";


const AddToCart = ({ productId, small }) => {
	const $selectedOption = useStore(selectedOption)
	const [added, setAdded] = useState(false);
	const [buttonText, setButtonText] = useState("Add to cart");

	const handleClick = async () => {
		setButtonText("Adding...")
		const fingerprintID = await getCurrentBrowserFingerPrint();
		const newCart = {
			fingerprint: fingerprintID,
			products: [
				{
					productId: productId,
					quantity: $selectedOption.option
				},
			]
		}
		if(newCart) {
			try {
				await addToCart(newCart)
				await trackAddToCart()
				setAdded(true)
				setButtonText("Added")
				setTimeout(() => {
					window.location.href = '/cart'
				}, 500);
			} catch (error) {
				console.log(error);
			}
			
		}
		const timer2 = setTimeout(() => {
			setAdded(false);
			setButtonText("Add to cart")	
		}, 3000);

    return () => clearTimeout(timer, timer2);
	}

	return (
		<button onClick={() => handleClick()} className={`button addtocart ${added && "added"} ${small && "smalladdtocart"}`}>{buttonText}</button>
	)
}

export default AddToCart