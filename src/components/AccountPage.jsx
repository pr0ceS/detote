import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DecodeCookie } from "./DecodeCookie";
import { urlString } from "../utils/api";
import Logout from "./Logout";
import Price from "./Price";
import moment from 'moment';
import FadeIn from "react-fade-in";

const AccountPage = () => {
	const [userData, setUserData] = useState({})
	const [userOrders, setUserOrders] = useState({})
	const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

	const getUserOrders = async (userId) => {
		try {
			const authToken = await Cookies.get('auth_token');
			const response = await fetch(`${urlString}/orders/find/${userId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'auth_token': `${authToken}`,
				},
			});
	
			if (response.ok) {
				const data = await response.json();
				setUserOrders(data);
			} else {
				console.error('Failed to update order');
			}
		} catch (error) {
			console.error('Error fetching orders:', error);
		}
	};

	useEffect(() => {
		const initCookie = async () => {
			try {
				const authToken = await Cookies.get('auth_token');

				if(authToken) {
					const decodedJwt = await DecodeCookie()
					getUserOrders(decodedJwt._id);
					setUserData(decodedJwt);
				} else {
					window.location.href = "/account/inloggen"
				}
			} catch (error) {
				console.log(error);
			}
		}

		initCookie();
	}, [])

	return (
		<>
			<div className="account">
				<div className="account-container">
					<div className="greeting">
						<h1>Welkom terug, <span className={`fade-in ${userData && userData.name && "show"}`}>{userData && userData.name && userData.name.includes(' ') ? userData.name.split(' ')[0] : userData.name}</span></h1>
						<p>Gebruik uw account om uw bestellingen te beheren, leveringen te volgen en uw bestelgeschiedenis te zien.</p>
						<button className="button" onClick={() => Logout()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Uitloggen</button>
					</div>
					<div className="orders">
						<h2>Mijn bestellingen</h2>
							{userOrders && userOrders.length > 0 ? (
								userOrders.map((order) => {
									return (
										<div key={order._id}>
											<FadeIn>
												<div className="order" onClick={() => handleOrderClick(order)}>
													<p>Bestelling: #{order.reference}</p>
													<p><Price price={order.total / 100} /></p>
													<p>
														{moment(order.createdAt).format('D MMMM YYYY')}
														<img src="/svg/Chevron.svg" alt="Chevron right" />
													</p>
												</div>
											</FadeIn>
											{selectedOrder && (
												// Modal component to display order information
												<div className="modal">
													<div className="modal-content">
														<h1>Bestelstatus</h1>
														<div className="wrapper">
															<FadeIn>
																<ol className="c-stepper">
																	<li className={`c-stepper__item ${order.delivery_status === "pending" ? "stepper-active" : order.delivery_status === "shipped" ? "stepper-active" : order.delivery_status === "delivered" ? "stepper-active" : ""}`}>
																		{order.delivery_status === "pending" ? 
																		<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
																		: order.delivery_status === "shipped" ? 
																		<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
																		: order.delivery_status === "delivered" ? 
																		<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
																		: ""	
																		}
																		<h3 className="c-stepper__title">
																			Betaald
																		</h3>
																	</li>
																	<li className={`c-stepper__item ${order.delivery_status === "shipped" ? "stepper-active" : order.delivery_status === "delivered" ? "stepper-active" : ""}`}>
																		<h3 className="c-stepper__title">
																			{order.delivery_status === "shipped" ? 
																			<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
																			: order.delivery_status === "delivered" ? 
																			<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
																			: ""	
																			}
																			Verzonden
																		</h3>
																	</li>
																	<li className={`c-stepper__item ${order.delivery_status === "delivered" ? "stepper-active" : ""}`}>
																		<h3 className="c-stepper__title">
																			{order.delivery_status === "delivered" ? 
																				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
																				: ""	
																			}
																			Geleverd
																		</h3>
																	</li>
																</ol>
															</FadeIn>
														</div>
														<h3>Bestelinformatie</h3>
														<div className="order-information">
															<FadeIn>
															<div>
																<b>Adres:</b>
																<div className="address">
																	<p>{order.customerInfo.email}</p>
																	<p>{order.customerInfo.name}</p>
																	<p>{order.customerInfo.address.line1}</p>
																	<p>{order.customerInfo.address.line2}</p>
																	<p>{order.customerInfo.address.postal_code}, {order.customerInfo.address.city}</p>
																	<p>{order.customerInfo.address.state}</p>
																	<p>{order.customerInfo.address.country}</p>
																</div>
															</div>
															<div>
																<b>Producten:</b>
																{order.products.map((product, index) => (
																	<div className="products" key={index}>
																		{product.data.map((dataItem) => (
																			<p key={dataItem.id}>{dataItem.description}, <Price price={dataItem.amount_total / 100}/></p>
																		))}
																	</div>
																))}
															</div>
															<div>
																<b>Bestelnummer:</b>
																<div>
																	<p>{order.reference}</p>
																</div>
															</div>
															<div>
																<b>Bestelling verzekerd?: {order.insurance ? "Ja" : "Nee"}</b>
																<div></div>
															</div>
															<div>
																<b>Totaalbedrag: <Price price={order.total / 100} /></b>
																<div></div>
															</div>
															</FadeIn>
														</div>
														<button className="button" onClick={() => handleCloseModal()}>Sluit bestelling</button>
													</div>
												</div>
											)}
										</div>
									);
								})
							) : (
								<p>U heeft geen bestellingen</p>
							)}
					</div>
				</div>
			</div>
		</>
	)
}

export default AccountPage