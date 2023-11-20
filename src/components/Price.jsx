import { useStore } from "@nanostores/react";
import { locale } from "../stores/locale";

const Price = ({ oldPrice, price }) => {
	const $locale = useStore(locale)

	return oldPrice ? (
		<h1>
			{$locale.origin === "EU" && `€${oldPrice.toLocaleString('nl-nl',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "US" && `$${oldPrice.toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "UK" && `£${(oldPrice * 0.875).toLocaleString('en-GB',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "CA" && `CA$${(oldPrice * 1.475).toLocaleString('en-CA',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "AU" && `AU$${(oldPrice * 1.68).toLocaleString('en-AU',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
		</h1>
	) : (
		<h1>
			{$locale.origin === "EU" && `€${price.toLocaleString('nl-nl',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "US" && `$${price.toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "UK" && `£${(price * 0.875).toLocaleString('en-GB',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "CA" && `CA$${(price * 1.475).toLocaleString('en-CA',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
			{$locale.origin === "AU" && `AU$${(price * 1.68).toLocaleString('en-AU',{minimumFractionDigits:2, maximumFractionDigits:2})}`}
		</h1>
	)
}

export default Price