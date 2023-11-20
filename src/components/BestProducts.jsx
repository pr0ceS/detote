import { useEffect, useState } from "react"
import { initProducts, productsLoading, products } from "../stores/products"
import { locale } from "../stores/locale"
import { useStore } from "@nanostores/react"
import GetRandomTheme from "./GetRandomTheme"

const BestProducts = () => {
	const [hoverState, setHoverState] = useState({});
	const $products = useStore(products)
	const $locale = useStore(locale)
	const $productsLoading = useStore(productsLoading)

	const skeletons = [
		1,2,3,4,5,6
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
		<div className="bestsellers-products">
			{!$productsLoading ? $products && 
				$products.products.map((product) => {
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
									<p>
										{$locale.origin === "EU" && `€${product.price.toLocaleString('nl-nl',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
										{$locale.origin === "US" && `$${product.price.toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
										{$locale.origin === "UK" && `£${(product.price * 0.875).toLocaleString('en-GB',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
										{$locale.origin === "CA" && `CA$${(product.price * 1.475).toLocaleString('en-CA',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
										{$locale.origin === "AU" && `AU$${(product.price * 1.68).toLocaleString('en-AU',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
									</p>
								</div>
								<div className="oldprice">
									<p>
										was{' '}
										<b>
											{$locale.origin === "EU" && `€${product.oldPrice.toLocaleString('nl-nl',{minimumFractionDigits:0, maximumFractionDigits:0})}`}
											{$locale.origin === "US" && `$${product.oldPrice.toLocaleString('en-US',{minimumFractionDigits:0, maximumFractionDigits:0})}`}
											{$locale.origin === "UK" && `£${(product.oldPrice * 0.875).toLocaleString('en-GB',{minimumFractionDigits:0, maximumFractionDigits:0})}`}
											{$locale.origin === "CA" && `$${(product.oldPrice * 1.475).toLocaleString('en-CA',{minimumFractionDigits:0, maximumFractionDigits:0})}`}
											{$locale.origin === "AU" && `$${(product.oldPrice * 1.68).toLocaleString('en-AU',{minimumFractionDigits:0, maximumFractionDigits:0})}`}
										</b>
									</p>
								</div>
								<button className="button">Add to cart</button>
							</div>
						</div>
					)
				}) : (
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
	)
}

export default BestProducts