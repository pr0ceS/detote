import { useState } from "react";
import { useStore } from "@nanostores/react"
import { cart } from "../stores/cart"
import { locale } from "../stores/locale";
import Price from "./Price";
import CountdownTimer from "./CountdownTimer";
import { DecodeCookie } from "./DecodeCookie";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import FadeIn from 'react-fade-in';
import { urlString } from "../utils/api";
import { trackCheckout } from "../stores/visit";


const Checkout = () => {
	const $cart = useStore(cart);
	const $locale = useStore(locale);
	const user = DecodeCookie();

	const [isLoading, setIsLoading] = useState(false);
	const [isChecked, setIsChecked] = useState(true);

	const totalPrice = $cart.reduce((accumulator, { product, quantity }) => {
		const productTotal = product.price * quantity;
		return accumulator + productTotal;
	}, 0);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

	const totalQuantity = $cart.reduce(
		(accumulator, product) => accumulator + product.quantity,
		0
	); 

	const totalQuantityNoGift = $cart.reduce(
		(accumulator, product) => {
			if (!product.product || !product.product.free) {
				return accumulator + product.quantity;
			}
			return accumulator;
		},
		0
	);

	const totalSavings = $cart.reduce(
		(accumulator, { product, quantity }) => {
			const discountedPrice = applyDiscount(product.price, totalQuantityNoGift);
			const savingsPerProduct = (product.oldPrice - discountedPrice) * quantity;
			return accumulator + savingsPerProduct;
		},
		0
	);

	const discountRate = 0.85; // 15% discount
	const discountedTotalPrice = isChecked && totalQuantityNoGift >= 3 ? totalPrice * discountRate : totalPrice;
		
	function updateCurrency() {
    switch ($locale.origin) {
      case "EU":
				return "eur"
      case "US":
				return "usd"
      case "UK":
				return "gbp"
      case "CA":
				return "cad"
      case "AU":
				return "aud"
      default:
        break;
    }
  }

	const handleCheckout = async () => {
		setIsLoading(true);
		const fingerprint = await getCurrentBrowserFingerPrint();
		const currency = await updateCurrency();
		const visitRef = await sessionStorage.getItem('visitRef')
		await trackCheckout();
		await fetch(`${urlString}/stripe/create-checkout-session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				fingerprint: fingerprint,
				cartItems: $cart,
				userId: user?._id ? user._id : undefined,
				currency: currency,
				insurance: isChecked,
				visitRef: visitRef
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.url) {
					window.location.href = data.url;
				}
			})
			.catch((err) => console.log(err.message));
	};

	return $cart.length > 0 ? (
		<FadeIn transitionDuration={200}>
			<div className="cart-checkout-container">
				<div className="checkout-top">
					<h1>Your Cart <b>({totalQuantity})</b></h1>
					<div>
						<p><Price price={discountedTotalPrice + (isChecked ? 2.99 : 0)} /></p>
						<span>You're saving <Price price={totalSavings + 10.45} /></span>
					</div>
				</div>
				<div className="save-shipping">
					<p><b>Save <Price price={10.45} /> on shipping</b> if you place an order within <b><CountdownTimer /></b></p>
				</div>
				<div onClick={() => handleCheckout()} className="checkout">
					<button className="button addtocart">{isLoading ? <FadeIn transitionDuration={200} className={`loadingio-spinner-rolling-2u7ujo2cx9d show-loading`}><div className="ldio-tjldnv9majp"><div></div></div></FadeIn> : "Checkout"}</button>
					<div className="payments">
						<img
							src={"/svg/Visa.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Visa"
						/>
						<img
							src={"/svg/mastercard.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Visa"
						/>
						<img
							src={"/svg/ApplePay.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="ApplePay"
						/>
						<img
							src={"/svg/GooglePay.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="GooglePay"
						/>
						<img
							src={"/svg/Paypal.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Paypal"
						/>
						<img
							src={"/svg/Klarna.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Klarna"
						/>
						<img
							src={"/svg/iDeal.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="iDeal"
						/>
						<img
							src={"/svg/GiroPay.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="GiroPay"
						/>
					</div>
				</div>
				<div className="protection">
					<img
						src={"/encrypted.webp"}
						width="50"
						decoding="async"
						loading="lazy"
						alt="Encrypted Icon"
					/>
					<div className="protection-text">
						<div>
							<h2>Shipping Protection</h2>
							<p><Price price={2.99} /></p>
						</div>
						<p>Protect your order from damage, loss, or theft during shipping</p>
					</div>
					<div className={`switch ${isChecked ? 'on' : 'off'}`} onClick={handleToggle}>
						<div className={`slider ${isChecked ? 'on' : 'off'}`}></div>
					</div>
				</div>
			</div>
		</FadeIn>
	) : (
		<FadeIn transitionDuration={200}>
			<div className="cart-checkout-container">
				<div className="checkout-top">
					<h1>Your Cart <b>(0)</b></h1>
					<div>
						<p><Price price={0} /></p>
					</div>
				</div>
				<div className="checkout">
					<a href="/products" className="a-button">Shop all products</a>
					<div className="payments">
						<img
							src={"/svg/Visa.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Visa"
						/>
						<img
							src={"/svg/mastercard.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Visa"
						/>
						<img
							src={"/svg/ApplePay.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="ApplePay"
						/>
						<img
							src={"/svg/GooglePay.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="GooglePay"
						/>
						<img
							src={"/svg/Paypal.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Paypal"
						/>
						<img
							src={"/svg/Klarna.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="Klarna"
						/>
						<img
							src={"/svg/iDeal.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="iDeal"
						/>
						<img
							src={"/svg/GiroPay.svg"}
							width="35"
							decoding="async"
							loading="lazy"
							alt="GiroPay"
						/>
					</div>
				</div>
			</div>
		</FadeIn>
	)
}

const applyDiscount = (price, quantity) => {
  return quantity >= 3 ? price * 0.85 : price;
};

export default Checkout