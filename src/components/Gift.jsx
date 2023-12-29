import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { cart } from "../stores/cart";
import FadeIn from "react-fade-in";
import { initProducts, products } from "../stores/products";
import Price from "./Price";

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
		const isGiftClaimed = $cart.some(
			(product) => product.product && product.product.free === true
		);
	
		// Update state based on whether a gift is claimed
		setCheckIfGiftIsClaimed(isGiftClaimed);
	}, [$products.products, $cart]);

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

	const handleGiftClick = (gift) => {
		const newSelectedGift = { ...selectedGift, ["product"]: gift};
		setOpenModal(false)

		const newCart = {
			product: newSelectedGift.product,
			quantity: 1,
		}

		if(newCart) {
			try {
				cart.set([...$cart, newCart])
				document.body.style.overflow = 'auto';
			} catch (error) {
				console.log(error);
			}
		}
		
		// Close the modal
		setOpenModal(false);
  };

	const handleModelSelection = async (model) => {
		const newCart = {
			product: selectedGift.product,
			quantity: 1,
			model: model,
		}
		if(newCart) {
			try {
				cart.set([...$cart, newCart])
				document.body.style.overflow = 'auto';
			} catch (error) {
				console.log(error);
			}
		}
		
    // Close the modal
    setOpenModal(false);
    setOpenModelModal(false);
  };

	useEffect(() => {
		if(totalQuantityNoGift === 1) {
			const filteredCart = $cart.filter(
				(product) => product.product.free === false
			);
	
			cart.set(filteredCart);
		}
	}, [totalQuantity])

  return !checkIfGiftIsClaimed && totalQuantity >= 2 ? (
		<>
 			<FadeIn className="gift" >
				<div className="gift-container" onClick={() => setOpenModal(true)}>
					<span>Waarde van <Price price={giftProducts.length > 0 ? giftProducts[0].oldPrice : 0} /></span>
					<div className="gift-text">
						<p>Klik om je Gratis<br/>Cadeau te claimen!</p>
					</div>
					{giftProducts.length > 0 && 
						<img src={giftProducts.length > 0 ? giftProducts[0].image[0] : ""} width="150" decoding="async" loading="lazy" alt={giftProducts.length > 0 ? giftProducts[0].name : "Cadeau Foto"}/>
					}
				</div>
			</FadeIn>
			{openModal && (
				<>
					<div className="gift-background" onClick={() => setOpenModal(false)}></div>
					<FadeIn className="gift-modal">
						<div className="gift-modal-container">
							<h1>Selecteer een product: <b>({giftProducts.length})</b></h1>
							<div className="gift-modal-content">
								{giftProducts.map((gift) => (
									<div key={gift._id} className="gift-card" onClick={() => handleGiftClick(gift)}>
										<img src={gift.image[0]} width="200" decoding="async" loading="lazy" alt={gift.name} />
									</div>
								))}
							</div>
							<button onClick={() => setOpenModal(false)} className="gift-button button">Sluiten</button>
						</div>
					</FadeIn>
				</>
      )}
			{openModelModal && (
				<>
					<div className="gift-background" onClick={() => setOpenModelModal(false)}></div>
					<FadeIn className="gift-modal">
						<div className="gift-modal-container">
							<h1>Selecteer een model: <b>({giftProducts[0].models.length})</b></h1>
							<p>Let op: Je cadeau wordt apart bezorgd in een ander pakket en arriveert een paar dagen na je oorspronkelijke bestelling.</p>
							<div className="gift-modal-content">
								{giftProducts[0].models.map((model, index) => (
									<button key={index} className="model-button" onClick={() => handleModelSelection(model)}>{model}</button>
								))}
							</div>
							<button onClick={() => setOpenModelModal(false)} className="gift-button button">Sluiten</button>
						</div>
					</FadeIn>
				</>
			)}
		</>
  ) : totalQuantity === 1 && (
		<FadeIn>
			<p className="gift-p">Voeg nog 1 item toe aan je winkelmandje om je gratis cadeau te claimen! 🎁 (Waarde van: <Price price={giftProducts.length > 0 ? giftProducts[0].oldPrice : 0} />)</p>
		</FadeIn>
	);
};

export default Gift;
