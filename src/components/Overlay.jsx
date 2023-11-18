import { isDrawerOpen } from "./Header.astro"
import { useStore } from "@nanostores/react";

const Overlay = () => {
	const $isDrawerOpen = useStore(isDrawerOpen)

	const handleClick = () => {
		isDrawerOpen.set(!$isDrawerOpen);
	}

	return (
		<div onClick={() => handleClick()} className={`overlay ${$isDrawerOpen ? "overlayshow" : "overlayhide"}`}></div>
	)
}

export default Overlay