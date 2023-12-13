import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { cart } from "../stores/cart";
import FadeIn from "react-fade-in";
import { initProducts, products } from "../stores/products";
import Price from "./Price";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { addToCart } from "../utils/cartApi";
import { urlString } from "../utils/api";

const Gift = () => {
  const $cart = useStore(cart);
  const $products = useStore(products);
  const [giftProducts, setGiftProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModelModal, setOpenModelModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState({});
	const [checkIfGiftIsClaimed, setCheckIfGiftIsClaimed] = useState(true);

	useEffect(() => {
		if (openModal || openModelModal) {
			// Scroll to the top first
			window.scrollTo(0, 0);

			var mainHeader = document.getElementById('mainHeader');
			mainHeader.classList.add('main-header-active');
			
			// Set overflow to hidden
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [openModal, openModelModal]);
	
  useEffect(() => {
    initProducts();
  }, [products]);

  useEffect(() => {
		const filteredGiftProducts = $products.products.filter(
			(product) => product.free === true
		);
		setGiftProducts(filteredGiftProducts);
	
		// Check if any product in $cart.products.productInfo has free: true
		const isGiftClaimed = $cart.products.some(
			(product) => product.productInfo && product.productInfo.free === true
		);
	
		// Update state based on whether a gift is claimed
		setCheckIfGiftIsClaimed(isGiftClaimed);
	}, [$products.products, $cart.products]);

  const totalQuantity = $cart.products.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0
  );

	const totalQuantityNoGift = $cart.products.reduce(
		(accumulator, product) => {
			if (!product.productInfo || !product.productInfo.free) {
				return accumulator + product.quantity;
			}
			return accumulator;
		},
		0
	);

	const handleGiftClick = (gift) => {
		const newSelectedGift = { ...selectedGift, ["productId"]: gift._id, ["productInfo"]: gift};
		setSelectedGift(newSelectedGift);
		setOpenModal(false)
		setOpenModelModal(true)
    // setSelectedGift({ productId: gift._id, productInfo: gift, quantity: 1 });
  };

	const handleModelSelection = async (model) => {
		const fingerprintID = await getCurrentBrowserFingerPrint();
    // Assuming the gift object structure has a 'models' array

		const newCart = {
			fingerprint: fingerprintID,
			products: [
				{
					productId: selectedGift.productId,
					quantity: 1,
				},
			],
			modelName: model,
		}
		if(newCart) {
			try {
				await addToCart(newCart)
				setTimeout(() => {
					window.location.reload()
				}, 500);
			} catch (error) {
				console.log(error);
			}
		}
		
    // Close the modal
    // setOpenModal(false);.
  };

	useEffect(() => {
		const handlePut = async (newCart) => {

			const fingerprint = await getCurrentBrowserFingerPrint();

			const response = await fetch(`${urlString}/cart/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fingerprint: fingerprint,
					products: newCart.products.map(({ productId, quantity, model }) => ({
						productId,
						quantity,
						model
					})),
				}),
			});
		
			if (response.ok) {
				const data = await response.json();
				const updatedTotal = data.total;
		
				cart.set({ ...$cart, products: newCart.products, total: updatedTotal });
			}
		} 
	
		if (checkIfGiftIsClaimed && totalQuantityNoGift === 1 || checkIfGiftIsClaimed && totalQuantity === 1) {
			const newCart = {
				...$cart,
				products: $cart.products.filter(product => !product.productInfo || !product.productInfo.free)
			};
	
			// Now, newCart contains only products that do not have productInfo.free
			handlePut(newCart);
		}

	}, [$cart.products]);

  return !checkIfGiftIsClaimed && totalQuantity >= 2 && (
		<>
 			<FadeIn className="gift" >
				<div className="gift-container" onClick={() => setOpenModal(true)}>
					<span>Worth <Price price={giftProducts.length > 0 ? giftProducts[0].oldPrice : 0} /></span>
					<div className="gift-text">
						<p>Click to claim your<br/>free gift!</p>
					</div>
					<img src={giftProducts.length > 0 ? giftProducts[0].image[0] : ""} width="150" decoding="async" loading="lazy" alt={giftProducts.length > 0 ? giftProducts[0].name : "Gift Image"}/>
				</div>
			</FadeIn>
			{openModal && (
				<>
					<div className="gift-background" onClick={() => setOpenModal(false)}></div>
					<FadeIn className="gift-modal">
						<div className="gift-modal-container">
							<h1>Select a color: <b>({giftProducts.length})</b></h1>
							<p>Note: Your gift will arrive separately in a different package, a few days later than the order itself.</p>
							<div className="gift-modal-content">
								{giftProducts.map((gift) => (
									<div key={gift._id} className="gift-card" onClick={() => handleGiftClick(gift)}>
										<img src={gift.image[0]} width="200" decoding="async" loading="lazy" alt={gift.name} />
									</div>
								))}
							</div>
							<button onClick={() => setOpenModal(false)} className="gift-button button">Close</button>
						</div>
					</FadeIn>
				</>
      )}
			{openModelModal && (
				<>
					<div className="gift-background" onClick={() => setOpenModelModal(false)}></div>
					<FadeIn className="gift-modal">
						<div className="gift-modal-container">
							<h1>Select a model: <b>({giftProducts[0].models.length})</b></h1>
							<p>Note: Your gift will arrive separately in a different package, a few days later than the order itself.</p>
							<div className="gift-modal-content">
								{giftProducts[0].models.map((model, index) => (
									<button key={index} className="model-button" onClick={() => handleModelSelection(model)}>{model}</button>
								))}
							</div>
							<button onClick={() => setOpenModelModal(false)} className="gift-button button">Close</button>
						</div>
					</FadeIn>
				</>
			)}
		</>
  );
};

export default Gift;
