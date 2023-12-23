import { atom } from "nanostores";
import {
	getLocale
} from "../utils/localeApi"

export const locale = atom(
  {
    origin: "EU",
		country: "No country"
  }
)

export async function initLocale() {
	const session = sessionStorage.getItem('locale')
	const data = await getLocale();

	if(session) {
		locale.set({
			origin: JSON.parse(session).origin,				
			country: JSON.parse(session).country,				
		})
	}

	if(!session) {
		if (data) {
			if (data.continentCode === "EU") {
				// Either EU OR UK
				if (data.countryCode === "GB") {
					await sessionStorage.setItem('locale', JSON.stringify({ origin: "UK", country: data.country , width: 115}));
					locale.set({
						origin: "UK",
						country: data.country
					})
				} else {
					await sessionStorage.setItem('locale', JSON.stringify({ origin: "EU", country: data.country, width: 68}));
					locale.set({
						origin: "EU",
						country: data.country
					})
				}
			} else if (data.continentCode === "NA") {
				// Either CA OR US
				if (data.countryCode === "CA") {
					await sessionStorage.setItem('locale', JSON.stringify({ origin: "CA", country: data.country, width: 70 }));
					locale.set({
						origin: "CA",
						country: data.country
					})
				} else if (data.countryCode === "US") {
					await sessionStorage.setItem('locale', JSON.stringify({ origin: "US", country: data.country, width: 100 }));
					locale.set({
						origin: "US",
						country: data.country
					})
				}
			} else if (data.continentCode === "OC") {
				// Either AU or Zealand
				if (data.countryCode === "AU") {
					await sessionStorage.setItem('locale', JSON.stringify({ origin: "AU", country: data.country, width: 160 }));
					locale.set({
						origin: "AU",
						country: data.country
					})
				} else if (data.countryCode === "NZ") {
					await sessionStorage.setItem('locale', JSON.stringify({ origin: "AU", country: data.country, width: 160 }));
					locale.set({
						origin: "AU",
						country: data.country
					})
				}
			} else {
				await sessionStorage.setItem('locale', JSON.stringify({ origin: "US", country: data.country, width: 100 }));
				locale.set({
					origin: "US",
					country: data.country
				})
			}
		}
	}

	return data;
}