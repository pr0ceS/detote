import { useState, useRef, useEffect } from 'react';
import { useStore } from "@nanostores/react";
import { cart } from "../stores/cart";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import Price from "./Price";
import FadeIn from 'react-fade-in';
import { urlString } from '../utils/api';

const applyDiscount = (price, quantity) => {
  // Apply discount based on quantity
  if (quantity >= 3) {
    return (price * quantity) * 0.85; // 15% discount for quantity 3 or more
  } else {
    return price * quantity; // No discount for other quantities
  }
};

const CartContents = () => {
  const $cart = useStore(cart);
	const [openStates, setOpenStates] = useState([]);
  const contentRefs = useRef([]);

	
	const handleToggle = (index) => {
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
	
	useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref && $cart.products && $cart.products[index]) {
        if (openStates[index]) {
          ref.style.maxHeight = `${ref.scrollHeight}px`;
        } else {
          ref.style.maxHeight = '0';
        }
      }
    });
  }, [openStates, $cart]);

	const handleIncrement = async (productInfo, model) => {
		const updatedCart = $cart.products.map((item) =>
			item.productInfo.name === productInfo.name && (!model || model === item.model)
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	
		const fingerprint = await getCurrentBrowserFingerPrint();
	
		await updateCartOnServer(fingerprint, updatedCart);
	};
	
	const handleDecrement = async (productInfo, model) => {
		const updatedCart = $cart.products.map((item) =>
			item.productInfo.name === productInfo.name && item.quantity > 1 && (!model || model === item.model)
				? { ...item, quantity: item.quantity - 1 }
				: item
		);
	
		const fingerprint = await getCurrentBrowserFingerPrint();
	
		await updateCartOnServer(fingerprint, updatedCart);
	};

	const handleRemove = async (productInfo, model) => {
		if (!productInfo || !productInfo.name) {
			console.error("Invalid productInfo:", productInfo);
			return;
		}
	
		const updatedCart = $cart.products.map((item) =>
			item.productInfo.name === productInfo.name && (!model || model === item.model)
				? { ...item, quantity: item.quantity - 1 }
				: item
		);
	
		const filteredCart = updatedCart.filter(
			(item) => item.productInfo.name !== productInfo.name || (model && model !== item.model)
		);
	
		const fingerprint = await getCurrentBrowserFingerPrint();
	
		await updateCartOnServer(fingerprint, filteredCart);
	};
	
	
	const updateCartOnServer = async (fingerprint, updatedCart) => {
		const response = await fetch(`${urlString}/cart/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fingerprint: fingerprint,
				products: updatedCart.map(({ productId, quantity, model }) => ({
					productId,
					quantity,
					model
				})),
			}),
		});
	
		if (response.ok) {
			const data = await response.json();
			const updatedTotal = data.total;
	
			cart.set({ ...$cart, products: updatedCart, total: updatedTotal });
		}
	};
	

  return $cart && $cart.products.length > 0 ? (
		<FadeIn transitionDuration={200}>
			<div className="cart-contents-container">
				{$cart.products.map(({ productInfo, quantity, model }, index) => (
					<div key={index} className="cart-product">
						<a href={`/products/${productInfo.url}`}>{productInfo.name}</a>
						{model && (
							<p>{model}</p>
						)}
						<div className="cart-product-info">
							<a href={`/products/${productInfo.url}`}>
								<img
									src={productInfo.image[0]}
									width="112"
									height="112"
									decoding="async"
									loading="lazy"
									alt={productInfo.name}
								/>
							</a>
							<div className="cart-product-text">
								{productInfo.price > 0 && quantity === 1 ? (
									<span className="saving">
										You're saving <Price price={productInfo.oldPrice - productInfo.price}/>
									</span>
								) : productInfo.price > 0 && quantity === 2 ? (
									<span className="saving">
										Free Gift (was <Price price={28.95}/>)
									</span>
								) : productInfo.price > 0 &&  (
									<span className="saving">
										15% off + Free Gift
									</span>
								)
								}
								{productInfo.price === 0 && 
									<span className="saving saving-free">Free Gift</span>
								}
								<div className="prices">
									<p>was <b><Price oldPrice={(productInfo.oldPrice * quantity)} /></b></p>
									<p><Price price={applyDiscount(productInfo.price, quantity)} /></p>
								</div>
								{productInfo.price === 0 &&
									<div className="increment-decrement disabled">
										<button>
											-
										</button>
										<p>{quantity}</p>
										<button>
											+
										</button>
									</div>
								}
								{productInfo.price > 0 && 
									<div className="increment-decrement">
										<button onClick={() => handleDecrement(productInfo, model)}>
											-
										</button>
										<p>{quantity}</p>
										<button onClick={() => handleIncrement(productInfo, model)}>
											+
										</button>
									</div>
								}
							</div>
							<button className="remove" onClick={() => handleRemove(productInfo, model)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
							</button>
						</div>
						<div className="small-desc">
							<div className="small-desc-title" onClick={() => handleToggle(index)}>
								<p>See {openStates[index] ? 'less' : 'more'} product info {openStates[index] ? '-' : '+'}</p>
							</div>
							<div
								className={`small-desc-content ${openStates[index] ? 'open' : ''}`}
								ref={(ref) => (contentRefs.current[index] = ref)}
							>
								<ul>
									{productInfo.smallDesc.map((desc, index) => (
										<li key={index}>{desc}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}
			</div>
		</FadeIn>
  ) : (
		<FadeIn transitionDuration={200}>
			<div className="cart-contents-container">
				<div className="cart-product">
					<div className="small-desc">
						<div className="small-desc-title normal">
							<p>Looks like your cart is empty.</p>
						</div>
					</div>
				</div>
			</div>
		</FadeIn>
	)
};

export default CartContents;
