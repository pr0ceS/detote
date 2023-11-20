import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DecodeCookie } from "./DecodeCookie";
import Logout from "./Logout";
import { FiLogOut } from "react-icons/fi";

const AccountPage = () => {
	const [userData, setUserData] = useState({})

	useEffect(() => {
		const initCookie = async () => {
			try {
				const authToken = await Cookies.get('auth_token');

				if(authToken) {
					const decodedJwt = await DecodeCookie()
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
					<p>You have no orders</p>
				</div>
			</div>
		</div>
	)
}

export default AccountPage