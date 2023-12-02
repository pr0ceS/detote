import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { getLocale } from "../utils/localeApi";
import { newAddToCart, newCheckout, newConvert, newVisit } from "../utils/visitApi";

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

export async function initVisit() {
	const fingerprint = await getCurrentBrowserFingerPrint();
	const visitRef = sessionStorage.getItem('visitRef');
	const newVisitRef = !visitRef ? await generateRandomCode() : visitRef;

	if (!visitRef) {
		sessionStorage.setItem('visitRef', await newVisitRef);
	}
	
	const localeData = await getLocale();
	const locale = sessionStorage.getItem('locale');
	const utmSource = new URLSearchParams(window.location.search).get('utm_source');
  const utmMedium = new URLSearchParams(window.location.search).get('utm_medium');
	const origin = JSON.parse(locale)?.origin;
	const country = JSON.parse(locale)?.country;
  const referrer = document.referrer;
	const isComputer = () => !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent));
	// Check if the user is on an Android phone
	const isAndroid = () => /android/i.test(navigator.userAgent);
	// Check if the user is on an iPhone
	const isiPhone = () => /iphone/i.test(navigator.userAgent);

	const data = {
		fingerprint: await fingerprint.toString(),
		ip: await localeData.query,
    visitRef: newVisitRef,
		origin,
		country,
    utm_source: utmSource ? utmSource : "",
    utm_medium: utmMedium ? utmMedium : "",
    referrer,
		device: isComputer() ? "pc" : isAndroid() ? "android" : isiPhone() ? "iphone" : "unrecognized",
  };

	if(data !== undefined) {
		newVisit(data.fingerprint, data.ip, data.visitRef, data.origin, data.country, data.utm_source, data.utm_medium, data.referrer, data.device)
	}
}

export async function trackAddToCart() {
	const fingerprint = await getCurrentBrowserFingerPrint();
	const visitRef = sessionStorage.getItem('visitRef');
	const newVisitRef = !visitRef ? await generateRandomCode() : visitRef;

	if (!visitRef) {
		sessionStorage.setItem('visitRef', await newVisitRef);
	}
	
	const locale = sessionStorage.getItem('locale');
	const utmSource = new URLSearchParams(window.location.search).get('utm_source');
  const utmMedium = new URLSearchParams(window.location.search).get('utm_medium');
	const origin = JSON.parse(locale)?.origin;
	const country = JSON.parse(locale)?.country;
  const referrer = document.referrer;
	const isComputer = () => !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent));
	// Check if the user is on an Android phone
	const isAndroid = () => /android/i.test(navigator.userAgent);
	// Check if the user is on an iPhone
	const isiPhone = () => /iphone/i.test(navigator.userAgent);

	const data = {
		fingerprint: await fingerprint.toString(),
    visitRef: newVisitRef,
		origin,
		country,
    utm_source: utmSource ? utmSource : "",
    utm_medium: utmMedium ? utmMedium : "",
    referrer,
		device: isComputer() ? "pc" : isAndroid() ? "android" : isiPhone() ? "iphone" : "unrecognized",
  };

	if(data !== undefined) {
		newAddToCart(data.fingerprint, data.visitRef, data.origin, data.country, data.utm_source, data.utm_medium, data.referrer, data.device)
	}
}

export async function trackCheckout() {
	const fingerprint = await getCurrentBrowserFingerPrint();
	const visitRef = sessionStorage.getItem('visitRef');
	const newVisitRef = !visitRef ? await generateRandomCode() : visitRef;

	if (!visitRef) {
		sessionStorage.setItem('visitRef', await newVisitRef);
	}
	
	const locale = sessionStorage.getItem('locale');
	const utmSource = new URLSearchParams(window.location.search).get('utm_source');
  const utmMedium = new URLSearchParams(window.location.search).get('utm_medium');
	const origin = JSON.parse(locale)?.origin;
	const country = JSON.parse(locale)?.country;
  const referrer = document.referrer;
	const isComputer = () => !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent));
	// Check if the user is on an Android phone
	const isAndroid = () => /android/i.test(navigator.userAgent);
	// Check if the user is on an iPhone
	const isiPhone = () => /iphone/i.test(navigator.userAgent);

	const data = {
		fingerprint: await fingerprint.toString(),
    visitRef: newVisitRef,
		origin,
		country,
    utm_source: utmSource ? utmSource : "",
    utm_medium: utmMedium ? utmMedium : "",
    referrer,
		device: isComputer() ? "pc" : isAndroid() ? "android" : isiPhone() ? "iphone" : "unrecognized",
  };

	if(data !== undefined) {
		newCheckout(data.fingerprint, data.visitRef, data.origin, data.country, data.utm_source, data.utm_medium, data.referrer, data.device)
	}
}

export async function trackConvert() {
	const fingerprint = await getCurrentBrowserFingerPrint();
	const visitRef = sessionStorage.getItem('visitRef');
	const newVisitRef = !visitRef ? await generateRandomCode() : visitRef;

	if (!visitRef) {
		sessionStorage.setItem('visitRef', await newVisitRef);
	}
	
	const locale = sessionStorage.getItem('locale');
	const utmSource = new URLSearchParams(window.location.search).get('utm_source');
  const utmMedium = new URLSearchParams(window.location.search).get('utm_medium');
	const origin = JSON.parse(locale)?.origin;
	const country = JSON.parse(locale)?.country;
  const referrer = document.referrer;
	const isComputer = () => !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent));
	// Check if the user is on an Android phone
	const isAndroid = () => /android/i.test(navigator.userAgent);
	// Check if the user is on an iPhone
	const isiPhone = () => /iphone/i.test(navigator.userAgent);

	const data = {
		fingerprint: await fingerprint.toString(),
    visitRef: newVisitRef,
		origin,
		country,
    utm_source: utmSource ? utmSource : "",
    utm_medium: utmMedium ? utmMedium : "",
    referrer,
		device: isComputer() ? "pc" : isAndroid() ? "android" : isiPhone() ? "iphone" : "unrecognized",
  };

	if(data !== undefined) {
		newConvert(data.fingerprint, data.visitRef, data.origin, data.country, data.utm_source, data.utm_medium, data.referrer, data.device)
	}
}