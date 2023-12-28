import { isDrawerOpen } from "../Header.astro"
import { useStore } from "@nanostores/react";

const Sidenav = () => {
	const $isDrawerOpen = useStore(isDrawerOpen)

	return (
		<div className={`sidenav ${$isDrawerOpen ? "showsidenav" : ""}`}>
			<a href="/sale" className="header-sale">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_137:7825)"> <path d="M18.6693 9.74103C18.5888 9.90564 18.5888 10.0945 18.6693 10.2591L19.4152 11.7851C19.8305 12.6347 19.5015 13.6475 18.6661 14.0907L17.1657 14.8868C17.0039 14.9727 16.8929 15.1255 16.8612 15.3059L16.5677 16.9788C16.4043 17.9103 15.5431 18.5363 14.6065 18.4038L12.9248 18.1659C12.7433 18.1404 12.5638 18.1986 12.4321 18.326L11.2113 19.507C10.8715 19.8357 10.4352 20.0001 9.99918 20.0001C9.56301 20.0002 9.127 19.8358 8.78708 19.507L7.56635 18.326C7.43463 18.1986 7.25502 18.1402 7.07365 18.1659L5.3919 18.4038C5.30796 18.4157 5.22444 18.4214 5.14214 18.4214C4.30648 18.4215 3.57938 17.8268 3.43063 16.9789L3.13719 15.3059C3.10551 15.1255 2.99454 14.9726 2.83266 14.8868L1.33228 14.0907C0.496894 13.6475 0.167834 12.6348 0.583144 11.7851L1.32908 10.2592C1.40955 10.0946 1.40955 9.90576 1.32908 9.74111L0.583183 8.21518C0.167873 7.36554 0.496933 6.35277 1.33232 5.90957L2.8327 5.11348C2.99454 5.02758 3.10551 4.87481 3.13719 4.69434L3.43063 3.02142C3.59402 2.08994 4.45535 1.46393 5.39187 1.59647L7.07361 1.83436C7.2551 1.85991 7.43459 1.80166 7.56631 1.67424L8.78708 0.493195C9.46676 -0.164418 10.5316 -0.164379 11.2113 0.493195L12.4321 1.67413C12.5637 1.80151 12.7432 1.85987 12.9248 1.83424L14.6065 1.59635C15.5427 1.46389 16.4043 2.08983 16.5677 3.02131L16.8612 4.6943C16.8929 4.87473 17.0038 5.02754 17.1657 5.1134L18.6661 5.90949C19.5015 6.35273 19.8305 7.36542 19.4152 8.21506L18.6693 9.74103Z" fill="currentColor"></path> <path d="M14.2136 5.78562C13.9884 5.56039 13.6232 5.56039 13.398 5.78562L5.78514 13.3985C5.5599 13.6237 5.5599 13.9889 5.78514 14.2141C5.89775 14.3267 6.04537 14.3831 6.19295 14.3831C6.34052 14.3831 6.48818 14.3268 6.60076 14.2141L14.2136 6.60132C14.4389 6.37605 14.4389 6.0109 14.2136 5.78562Z" fill="white"></path> <path d="M7.69243 4.80908C6.52634 4.80908 5.57764 5.75779 5.57764 6.92387C5.57764 8.08996 6.52634 9.03867 7.69243 9.03867C8.85852 9.03867 9.80722 8.08996 9.80722 6.92387C9.80722 5.75779 8.85852 4.80908 7.69243 4.80908ZM7.69243 7.88512C7.16239 7.88512 6.73118 7.45391 6.73118 6.92384C6.73118 6.3938 7.16239 5.96259 7.69243 5.96259C8.22247 5.96259 8.65371 6.3938 8.65371 6.92384C8.65367 7.45391 8.22247 7.88512 7.69243 7.88512Z" fill="white"></path> <path d="M12.3067 10.9614C11.1406 10.9614 10.1919 11.9101 10.1919 13.0762C10.1919 14.2423 11.1406 15.191 12.3067 15.191C13.4728 15.191 14.4215 14.2423 14.4215 13.0762C14.4215 11.9101 13.4728 10.9614 12.3067 10.9614ZM12.3067 14.0375C11.7767 14.0375 11.3454 13.6063 11.3454 13.0762C11.3454 12.5462 11.7766 12.115 12.3067 12.115C12.8367 12.115 13.2679 12.5462 13.2679 13.0762C13.2679 13.6063 12.8367 14.0375 12.3067 14.0375Z" fill="white"></path> </g> <defs> <clipPath id="clip0_137:7825"> <rect width="20" height="20" fill="white" transform="translate(-0.000488281)"></rect> </clipPath> </defs> </svg>
				SALE
			</a>
			<a href="/producten">
				PRODUCTEN
			</a>
			<a href="/contact">
				CONTACT
			</a>
			<div className="login-help">
				<a className="login" href="/account/login">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </svg>
					Inloggen
				</a>
				<a className="help" href="/contact">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9.08984 9.00008C9.32495 8.33175 9.789 7.76819 10.3998 7.40921C11.0106 7.05024 11.7287 6.91902 12.427 7.03879C13.1253 7.15857 13.7587 7.52161 14.2149 8.06361C14.6712 8.60561 14.9209 9.2916 14.9198 10.0001C14.9198 12.0001 11.9198 13.0001 11.9198 13.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 17H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </svg>
					Contact
				</a>
				<a className="help" href="#">
					<img
						src={"/svg/klarna.png"}
						width="45"
						className="klarna"
						alt="Klarna"
					/>
					Shop nu. Betaal later
				</a>
			</div>
		</div>
	)
}

export default Sidenav