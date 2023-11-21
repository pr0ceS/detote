import { useState } from "react"

const AddToCart = () => {
	const [adding, setAdding] = useState(false)
	const [added, setAdded] = useState(false);
	const [buttonText, setButtonText] = useState("Add to cart");

	const handleClick = () => {
		setAdding(true);
		setButtonText("Adding...")
		const timer = setTimeout(() => {
      setAdded(true);
			setButtonText("Added")	
    }, 1000);
		const timer2 = setTimeout(() => {
			setAdded(false);
			setButtonText("Add to cart")	
		}, 3000);

    return () => clearTimeout(timer, timer2);
	}

	return (
		<button onClick={() => handleClick()} className={`button addtocart ${added && "added"}`}>{buttonText}</button>
	)
}

export default AddToCart