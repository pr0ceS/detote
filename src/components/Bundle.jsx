import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { locale } from "../stores/locale";
import { selectedOption } from "../stores/selectedOption";
import { model } from "../stores/models";


const Bundle = ({ price, oldPrice, models }) => {
	const $selectedOption = useStore(selectedOption)
	const $model = useStore(model);
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

	useEffect(() => {
		if(models.length === 0) {
			selectedOption.set({
				option: 2
			})
		} else {
			selectedOption.set({
				option: 1
			})
		}
	}, [])

	useEffect(() => {
		if(models.length > 0) {
			model.set({
				option: 0,
				name: models[0]
			})
		}
	}, [])

	const handleModelChange = (optionIndex, modelName) => {
		model.set({
			option: optionIndex,
			model: modelName,
		})
	}

	const handleBundleChange = (option) => {
		if(option === "option1") {
			setSelectedBundle(option)
			selectedOption.set({
				option: 1
			})
		} else if(option === "option2") {
			setSelectedBundle(option)
			selectedOption.set({
				option: 2
			})
		} else if(option === "option3") {
			setSelectedBundle(option)
			selectedOption.set({
				option: 3
			})
		}
	}

	return models.length === 0 && newOldPrice && newPrice ? (
		<div className="bundles">
			<div onClick={() => handleBundleChange('option1')} className={`bundle ${selectedBundle === "option1" && "option-selected"}`}>
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
			<div onClick={() => handleBundleChange('option2')} className={`bundle ${selectedBundle === "option2" && "option-selected"}`}>
				<div className="circle">
					<div className="centercircle">
						<span className="innercircle"></span>
					</div>
				</div>
				<div className="bundle-text">
					<div>
						<p className="pack">2 Pack</p>
						<span className="percentageoff">Free Gift</span>
						<h1>{currency}{(newPrice * 2).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</h1>
					</div>
					<div className="savings">
						<p className="save">You save {currency}{(newOldPrice * 2 - newPrice * 2).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</p>
						<p className="was">was <b>{currency}{(newOldPrice * 2).toFixed(0)}</b></p>
					</div>
				</div>
			</div>
			<div onClick={() => handleBundleChange('option3')} className={`bundle ${selectedBundle === "option3" && "option-selected"}`}>
				<div className="circle">
					<div className="centercircle">
						<span className="innercircle"></span>
					</div>
				</div>
				<div className="bundle-text">
					<div>
						<p className="pack">3 Pack</p>
						<span className="percentageoff">Free Gift + 15% off</span>
						<h1>{currency}{(newPrice * 3 * 0.85).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</h1>
					</div>
					<div className="savings">
						<p className="save">You save {currency}{(newOldPrice * 3 - newPrice * 3 * 0.85).toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</p>
						<p className="was">was <b>{currency}{(newOldPrice * 3).toFixed(0)}</b></p>
					</div>
				</div>
			</div>
		</div>
	) : models.length > 0 ? (
		<div className="models">
			<h1>{currency}{price.toLocaleString(localeData,{minimumFractionDigits:2, maximumFractionDigits:2})}</h1>
			<div className="savings">
				<p className="was">was <b>{currency}{oldPrice.toFixed(0)}</b></p>
			</div>
			<div className="models-container">
				{models.map((model, index) => (
					<p onClick={() => handleModelChange(index, model)} className={`model ${index === $model.option && "model-selected"}`} key={index}>{model}</p>
				))}
			</div>
		</div>
	) : (
		<div className="bundles">
			<div className="bundle placeholder-bundle skeleton">
			</div>
			<div className="bundle placeholder-bundle skeleton">
			</div>
			<div className="bundle placeholder-bundle skeleton">
			</div>
		</div>
	)
}

export default Bundle