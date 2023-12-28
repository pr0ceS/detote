import FadeIn from "react-fade-in";
import { useStore } from "@nanostores/react";
import { order } from "../stores/order";

const SuccessPaid = () => {
	const $order = useStore(order);

	if($order && $order.order) {
		sessionStorage.setItem("order", $order?.order[0]?._id);
	}

  return (
    <div className="success">
      {$order && $order.order && (
        <div className="success-container">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"></path>
					</svg>
					<FadeIn className="success-text">
						<h1>{$order?.order[0]?.customerInfo?.name}, we hebben uw betaling ontvangen!</h1>
						<p>We sturen je e-mailupdates over de verzending. Als je een account aanmaakt, wordt je bestelling opgeslagen en kun je deze op elk moment controleren. Zo niet, geen probleem! We sturen je nog steeds e-mails over de status van je bestelling.</p>
						<div>
							<a className="a-button" href="/contact">Contact</a>
							<a className="a-button" href="/account/register">Een account aanmaken</a>
						</div>
					</FadeIn>
        </div>
      )}
    </div>
  );
};

export default SuccessPaid;
