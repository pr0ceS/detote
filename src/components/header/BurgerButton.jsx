import { useEffect } from "react";
import { isDrawerOpen } from "../Header.astro"
import { useStore } from "@nanostores/react";

const burgerButton = () => {
	const $isDrawerOpen = useStore(isDrawerOpen)

	useEffect(() => {
    if ($isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

		return () => {
      document.body.style.overflow = 'auto';
    };
  }, [$isDrawerOpen]);

	const handleClick = () => {
		isDrawerOpen.set(!$isDrawerOpen);
	}

	return (
		<span className="burgericon">
			<input onClick={() => handleClick()} type="checkbox" id="checkbox1" className="checkbox1 visuallyHidden" checked={$isDrawerOpen} readOnly />
			<label htmlFor="checkbox1">
				<div className="hamburger hamburger1">
					<span className="bar bar1"></span>
					<span className="bar bar2"></span>
					<span className="bar bar3"></span>
					<span className="bar bar4"></span>
				</div>
			</label>
		</span>
	)
}

export default burgerButton