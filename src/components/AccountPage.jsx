import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DecodeCookie } from "./DecodeCookie";
import { urlString } from "../utils/api";
import Logout from "./Logout";
import { FiLogOut } from "react-icons/fi";
import Price from "./Price";
import moment from 'moment';
import FadeIn from "react-fade-in";

const AccountPage = () => {
	const [userData, setUserData] = useState({})
	const [userOrders, setUserOrders] = useState({})

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
				console.log(data);
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
					console.log(decodedJwt._id);
					setUserData(decodedJwt);
				} else {
					window.location.href = "/account/login"
				}
			} catch (error) {
				console.log(error);
			}
		}

		initCookie();
	}, [])

	return (
		<div className="account">
			<div className="account-container">
				<div className="greeting">
					<h1>Welcome back, <span className={`fade-in ${userData && userData.name && "show"}`}>{userData && userData.name && userData.name.includes(' ') ? userData.name.split(' ')[0] : userData.name}</span></h1>
					<p>Use your account to manage your orders, track deliveries and access your order history.</p>
					<button className="button" onClick={() => Logout()}><FiLogOut />Sign out</button>
				</div>
				<div className="orders">
					<h2>My Orders</h2>
						{userOrders && userOrders.length > 0 ? (
							userOrders.map((order) => {
								return (
									<FadeIn key={order._id}>
										<a href={`/order/${order._id}`} className="order">
											<p>Order: #{order.reference}</p>
											<p><Price price={order.total / 100} /></p>
											<p>
												{moment(order.createdAt).format('D MMMM YYYY')}
												<img src="/svg/Chevron.svg" alt="Chevron right" />
											</p>
										</a>
									</FadeIn>
								)
							})
						) : (
							<p>You have no orders</p>
						)}
				</div>
			</div>
		</div>
	)
}

export default AccountPage