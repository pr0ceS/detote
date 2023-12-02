import FadeIn from "react-fade-in";
import { useStore } from "@nanostores/react";
import { order } from "../stores/order";

const SuccessPaid = () => {
	const $order = useStore(order);

	if($order && $order.order) {
		sessionStorage.setItem("order", $order.order[0]._id);
	}

  return (
    <div className="success">
      {$order && $order.order && (
        <div className="success-container">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"></path>
					</svg>
					<FadeIn className="success-text">
						<h1>{$order?.order[0]?.customerInfo?.name}, we've received your payment!</h1>
						<p>We'll email you updates on shipping. If you make an account, your order will be saved, and you can check anytime. If not, no problem! We'll still email you about your order's status.</p>
						<div>
							<a className="a-button" href="/contact">Contact us</a>
							<a className="a-button" href="/account/register">Create an account</a>
						</div>
					</FadeIn>
        </div>
      )}
    </div>
  );
};

export default SuccessPaid;
