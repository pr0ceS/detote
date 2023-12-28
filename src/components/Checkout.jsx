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
	const discountedTotalPrice = totalQuantityNoGift >= 3 ? totalPrice * discountRate : totalPrice;
		
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

	const generateUUID = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	};

	const handleCheckout = async () => {
		setIsLoading(true);
		pintrk('track', 'custom', {
			event_id: generateUUID(),
			value: (discountedTotalPrice + (isChecked ? 2.99 : 0)),
			order_quantity: 1,
			currency: 'EUR',
			line_items: $cart.map(cartItem => ({
				product_category: "Beauty",
				product_name: cartItem.product.name,
				product_id: cartItem.product._id,
				product_quantity: cartItem.quantity,
				product_price: cartItem.product.price
			}))
		});

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
					<div>
						<h1>Uw Winkelwagen <b>({totalQuantity})</b></h1>
						<p><Price price={(discountedTotalPrice + (isChecked ? 2.99 : 0))} /></p>
					</div>
					<span>U bespaart <Price price={totalSavings + 5.95} />{totalQuantityNoGift >= 3 && " + 15% korting"}</span>
				</div>
				<div className="save-shipping">
					<p><b>Bespaar <Price price={5.95} /> op verzendkosten</b> als u een bestelling plaatst binnen <b><CountdownTimer /></b></p>
				</div>
				<div onClick={() => handleCheckout()} className="checkout">
					<button className="button addtocart">{isLoading ? <FadeIn transitionDuration={200} className={`loadingio-spinner-rolling-2u7ujo2cx9d show-loading`}><div className="ldio-tjldnv9majp"><div></div></div></FadeIn> : "Afrekenen"}</button>
					<div className="payments">
						<img
							src={"/svg/iDeal.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="iDeal"
						/>
						<img
							src={"/svg/Klarna.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="Klarna"
						/>
						<img
							src={"/svg/ApplePay.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="ApplePay"
						/>
						<img
							src={"/svg/GooglePay.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="GooglePay"
						/>
						<img
							src={"/svg/Visa.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="Visa"
						/>
						<img
							src={"/svg/mastercard.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="mastercard"
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
							<h2>Bestelling verzekeren</h2>
							<p><Price price={2.99} /></p>
						</div>
						<p>Bescherm je bestelling tegen beschadiging, verlies of diefstal tijdens verzending</p>
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
					<div>
						<h1>Uw Winkelwagen <b>(0)</b></h1>
						<p><Price price={0} /></p>
					</div>
				</div>
				<div className="checkout">
					<a href="/producten" className="a-button">Alle producten bekijken</a>
					<div className="payments">
					<img
							src={"/svg/iDeal.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="iDeal"
						/>
						<img
							src={"/svg/Klarna.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="Klarna"
						/>
						<img
							src={"/svg/ApplePay.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="ApplePay"
						/>
						<img
							src={"/svg/GooglePay.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="GooglePay"
						/>
						<img
							src={"/svg/Visa.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="Visa"
						/>
						<img
							src={"/svg/mastercard.svg"}
							width="45"
							decoding="async"
							loading="lazy"
							alt="mastercard"
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