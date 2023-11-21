import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { locale } from "../stores/locale";


const Bundle = ({ price, oldPrice }) => {
	const $locale = useStore(locale)
	const [currency, setCurrency] = useState()
	const [localeData, setLocaleData] = useState()
	const [newPrice, setNewPrice] = useState()
	const [newOldPrice, setNewOldPrice] = useState()
	const [selectedBundle, setSelectedBundle] = useState('option2')
	
	useEffect(() => {
		if($locale.origin === "EU") {
			setCurrency("€")
			setLocaleData("nl-nl")
			setNewPrice(price)
			setNewOldPrice(oldPrice)
		} else if($locale.origin === "US") {
			setCurrency("$")
			setLocaleData("en-US")
			setNewPrice(price)
			setNewOldPrice(oldPrice)
		} else if($locale.origin === "UK") {
			setCurrency("£")
			setLocaleData("en-GB")
			setNewPrice(price * 0.875)
			setNewOldPrice(oldPrice * 0.875)
		} else if ($locale.origin === "CA") {
			setCurrency("CA$")
			setLocaleData("en-CA")
			setNewPrice(price * 1.475)
			setNewOldPrice(oldPrice * 1.475)
		} else if ($locale.origin === "AU") {
			setCurrency("AU$")
			setLocaleData("en-AU")
			setNewPrice(price * 1.68)
			setNewOldPrice(oldPrice * 1.68)
		}
	}, [$locale])

	return newOldPrice && newPrice ? (
		<div className="bundles">
			<div onClick={() => setSelectedBundle('option1')} className={`bundle ${selectedBundle === "option1" && "option-selected"}`}>
				<div className="circle">
					<div className="centercircle">
						<span className="innercircle"></span>
					</div>
				</div>
				<div className="bundle-text">
					<div>
						<p className="pack">1 Pack</p>
						<h1>{currency}{newPrice.toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</h1>
					</div>
					<div className="savings">
						<p className="save">You save {currency}{(newOldPrice - newPrice).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</p>
						<p className="was">was <b>{currency}{newOldPrice.toFixed(0)}</b></p>
					</div>
				</div>
			</div>
			<div onClick={() => setSelectedBundle('option2')} className={`bundle ${selectedBundle === "option2" && "option-selected"}`}>
				<div className="circle">
					<div className="centercircle">
						<span className="innercircle"></span>
					</div>
				</div>
				<div className="bundle-text">
					<div>
						<p className="pack">2 Pack</p>
						<span className="percentageoff">{((newOldPrice * 2 - newPrice * 2 * 0.94) / (newOldPrice * 2) * 100).toFixed(0)}% off</span>
						<h1>{currency}{(newPrice * 2 * 0.94 ).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</h1>
					</div>
					<div className="savings">
						<p className="save">You save {currency}{(newOldPrice * 2 - newPrice * 2 * 0.94).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</p>
						<p className="was">was <b>{currency}{(newOldPrice * 2).toFixed(0)}</b></p>
					</div>
				</div>
			</div>
			<div onClick={() => setSelectedBundle('option3')} className={`bundle ${selectedBundle === "option3" && "option-selected"}`}>
				<div className="circle">
					<div className="centercircle">
						<span className="innercircle"></span>
					</div>
				</div>
				<div className="bundle-text">
					<div>
						<p className="pack">3 Pack</p>
						<span className="percentageoff">{((newOldPrice * 3 - newPrice * 3 * 0.8) / (newOldPrice * 3) * 100).toFixed(0)}% off</span>
						<h1>{currency}{(newPrice * 3 * 0.8).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</h1>
					</div>
					<div className="savings">
						<p className="save">You save {currency}{(newOldPrice * 3 - newPrice * 3 * 0.8).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</p>
						<p className="was">was <b>{currency}{(newOldPrice * 3).toFixed(0)}</b></p>
					</div>
				</div>
			</div>
		</div>
	) : (
		<p>Loading...</p>
	)
}

export default Bundle