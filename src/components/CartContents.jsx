import { useState, useRef, useEffect } from 'react';
import { useStore } from "@nanostores/react";
import { cart } from "../stores/cart";
import Price from "./Price";
import FadeIn from 'react-fade-in';

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
      if (ref && $cart && $cart[index]) {
        if (openStates[index]) {
          ref.style.maxHeight = `${ref.scrollHeight}px`;
        } else {
          ref.style.maxHeight = '0';
        }
      }
    });
  }, [openStates, $cart]);

	const handleIncrement = async (productInfo, model) => {
		const updatedCart = $cart.map((item) =>
			item.product.name === productInfo.name && (!model || model === item.model)
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
		
		cart.set(updatedCart)
	};
	
	const handleDecrement = async (productInfo, model) => {
		const updatedCart = $cart.map((item) =>
			item.product.name === productInfo.name && item.quantity > 1 && (!model || model === item.model)
				? { ...item, quantity: item.quantity - 1 }
				: item
		);
	
		cart.set(updatedCart)
	};

	const handleRemove = async (productInfo, model) => {
		if (!productInfo || !productInfo.name) {
			console.error("Invalid productInfo:", productInfo);
			return;
		}
	
		const updatedCart = $cart.map((item) =>
			item.product.name === productInfo.name && (!model || model === item.model)
				? { ...item, quantity: item.quantity - 1 }
				: item
		);
	
		const filteredCart = updatedCart.filter(
			(item) => item.product.name !== productInfo.name || (model && model !== item.model)
		);

		cart.set(filteredCart)
	};

  return $cart.length > 0 ? (
		<FadeIn transitionDuration={200}>
			<div className="cart-contents-container">
				{$cart.map(({ product, quantity, model }, index) => (
					<div key={index} className="cart-product">
						<a href={`/products/${product.url}`}>{product.name}</a>
						{model && (
							<p>{model}</p>
						)}
						<div className="cart-product-info">
							<a href={`/products/${product.url}`}>
								<img
									src={product.image[0]}
									width="112"
									height="112"
									decoding="async"
									loading="lazy"
									alt={product.name}
								/>
							</a>
							<div className="cart-product-text">
								{product.price > 0 && quantity === 1 ? (
									<span className="saving">
										You're saving <Price price={product.oldPrice - product.price}/>
									</span>
								) : product.price > 0 && quantity === 2 ? (
									<span className="saving">
										Free Gift (was <Price price={28.95}/>)
									</span>
								) : product.price > 0 &&  (
									<span className="saving">
										15% off + Free Gift
									</span>
								)
								}
								{product.price === 0 && 
									<span className="saving saving-free">Free Gift</span>
								}
								<div className="prices">
									<p>was <b><Price oldPrice={(product.oldPrice * quantity)} /></b></p>
									<p><Price price={applyDiscount(product.price, quantity)} /></p>
								</div>
								{product.price === 0 &&
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
								{product.price > 0 && 
									<div className="increment-decrement">
										<button onClick={() => handleDecrement(product, model)}>
											-
										</button>
										<p>{quantity}</p>
										<button onClick={() => handleIncrement(product, model)}>
											+
										</button>
									</div>
								}
							</div>
							<button className="remove" onClick={() => handleRemove(product, model)}>
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
									{product.smallDesc.map((desc, index) => (
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
