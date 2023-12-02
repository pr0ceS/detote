import { useEffect, useState } from "react"
import { useStore } from "@nanostores/react"
import { initProducts, products, productsLoading } from "../stores/products"
import GetRandomTheme from "./GetRandomTheme";
import Price from "./Price";
import { locale } from "../stores/locale";
import AddToCart from "./AddToCart";

const ProductList = ({ salepage }) => {
	const [hoverState, setHoverState] = useState({});
	const $products = useStore(products);
	const $locale = useStore(locale)
	const $productsLoading = useStore(productsLoading)

	const skeletons = [
		1,2,3,4,5,6,7,8,9,10,11,12
	]

	useEffect(() => {
		initProducts().then((data) => {
			productsLoading.set(false);
		})
	}, [])

	const handleMouseEnter = (productId) => {
    setHoverState((prev) => ({ ...prev, [productId]: true }));
  };

  const handleMouseLeave = (productId) => {
    setHoverState((prev) => ({ ...prev, [productId]: false }));
  };

	return (
		<>
			{salepage && (
				<div className="banner productlist-banner">
					<img src="/svg/BF50.svg" alt="BF50" />
				</div>
			)}
			{!salepage && (
				<div className="productlist-title">
				<div className="productlist-title-container">
					<h1>All Products</h1>
				</div>
			</div>
			)}
			<div className="productlist">
				<div className="productlist-container">
					{!$productsLoading ? (
						$products &&
						$products.products
							.slice(0, 6) // Limit to the first 6 products
							.map((product) => {
								return (
								<div key={product._id} className="product-card" >
									<div className="product-image">
										{/* Don't forget to update currency before sending product.price and product.oldPrice */}
										<GetRandomTheme price={product.price} locale={$locale.origin} oldPrice={product.oldPrice} />

										<a href={`/products/${product.url}`}>
											<img
												onMouseEnter={() => handleMouseEnter(product._id)}
												onMouseLeave={() => handleMouseLeave(product._id)}
												src={hoverState[product._id] ? product.image[1] : product.image[0]}
												width="300"
												height="300"
												decoding="async"
												loading="lazy"
												alt={product.name}
											/>
										</a>
									</div>
									<div className="product-text">
										<a href="/">{product.name}</a>
										<div className="price">
											<Price price={product.price} />
										</div>
										<div className="oldprice">
											was{' '}
											<Price price={product.oldPrice} />
										</div>
										<AddToCart small={true} productId={product._id} />
									</div>
								</div>
								)
						})) : (
							skeletons.map((skeleton, index) => (
								<div key={index} className="product-card skeleton">
									<div className="product-image skeleton-image">
											<div className="placeholder skeleton"></div>
									</div>
									<div className="product-text">
											<div className="placeholder-text skeleton"></div>
										<div className="price">
											<div className="placeholder-price skeleton"></div>
										</div>
										<div className="oldprice">
											<div className="placeholder-oldprice skeleton"></div>
										</div>
										<button className="button skeleton"></button>
									</div>
								</div>
							))
					)}
				</div>
			</div>
		</>
	)
}

export default ProductList