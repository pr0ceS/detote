import Logout from "./Logout"

const AccountPage = () => {
	return (
		<>
			<div>
				<h1>Welcome back, mehmet</h1>
				<p>Use your account to manage your orders, track deliveries and access your order history.</p>
				<button onClick={() => Logout()}>Sign out</button>
			</div>
			<div className="orders">
				<h2>My Orders</h2>
				<p>You have no orders</p>
			</div>
		</>
	)
}

export default AccountPage