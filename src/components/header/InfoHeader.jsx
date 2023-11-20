import { useEffect, useState } from "react";
import { initLocale, locale } from "../../stores/locale";

const InfoHeader = () => {
	// I have no actual clue how the fuck this code works.
	// The usestates are not in use but if I remove them the sessionstorage
	// Does not work what the fuck

	const [localeSession, setLocaleSession] = useState(null)
	const [width, setWidth] = useState(100);
	const session = sessionStorage.getItem('locale');
	const sessionObject = session && JSON.parse(session);

	const calcWidth = async () => {
		const widthMap = {
			"AU": 165,
			"US": 100,
			"UK": 115,
			"EU": 68,
			"CA": 70,
		};
	
		return await sessionObject && await widthMap[sessionObject.origin];
	};

	useEffect(() => {
		initLocale()
			.then((data) => setLocaleSession(data))

		calcWidth()
			.then((data) => setWidth(data))
	}, [])

	const changeSelectWidth = (value) => {
		if ( value === "au" ) {
			setWidth(165);
			sessionObject.width = 165;
			sessionObject.origin = "AU";
			locale.set({
				origin: "AU",				
			})
			const updatedSessionObject = JSON.stringify(sessionObject);
			sessionStorage.setItem('locale', updatedSessionObject);
		} else if ( value === "us" ) {
			setWidth(100);
			sessionObject.width = 100;
			sessionObject.origin = "US";
			locale.set({
				origin: "US",				
			})
			const updatedSessionObject = JSON.stringify(sessionObject);
			sessionStorage.setItem('locale', updatedSessionObject);
		} else if ( value === "uk" ) {
			setWidth(115);
			sessionObject.width = 115;
			sessionObject.origin = "UK";
			locale.set({
				origin: "UK",				
			})
			const updatedSessionObject = JSON.stringify(sessionObject);
			sessionStorage.setItem('locale', updatedSessionObject);
		} else if ( value === "eu" ) {
			setWidth(68);
			sessionObject.width = 68;
			sessionObject.origin = "EU";
			locale.set({
				origin: "EU",				
			})
			const updatedSessionObject = JSON.stringify(sessionObject);
			sessionStorage.setItem('locale', updatedSessionObject);
		} else if ( value === "ca" ) {
			setWidth(70);
			sessionObject.width = 70;
			sessionObject.origin = "CA";
			locale.set({
				origin: "CA",				
			})
			const updatedSessionObject = JSON.stringify(sessionObject);
			sessionStorage.setItem('locale', updatedSessionObject);
		}
	}

	return (
		<select
			className={`fade-in ${localeSession && "show"}`}
			id="currency"
			value={session && sessionObject?.origin.toLocaleLowerCase()}
			onChange={(e) => changeSelectWidth(e.target.value)}
			style={{ width: `${session && sessionObject?.width}px` }}
		>
			<option value="us">United States</option>
			<option value="uk">United Kingdom</option>
			<option value="eu">Europe</option>
			<option value="ca">Canada</option>
			<option value="au">Australia & New Zealand</option>
		</select>
	)
}

export default InfoHeader