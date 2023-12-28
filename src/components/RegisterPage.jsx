import { useState } from "react"
import Cookies from "js-cookie";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { urlString } from "../utils/api";

const RegisterPage = () => {
	const [user, setUser] = useState({
		name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

	const updateOrder = async (cartId, userId) => {
		try {
			const response = await fetch(`${urlString}/orders/registered/${cartId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId: userId }),
			});

			if (response.ok) {
				const res = response.json();
				console.log(res);
			} else {
				console.error('Failed to update order');
			}
		} catch (error) {
			console.error('Error updating order:', error);
		}
	};

	const handleSubmit = async (e) => {
    try {
      e.preventDefault();

			if(user.confirmPassword === user.password) {
				const res = await fetch(`${urlString}/register`, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({user: {name: user.name, email: user.email, password: user.password}})
				})
				
				const data = await res.json();
				if(data.success) {
					const cartID = sessionStorage.getItem('order');
					if(cartID) {
						updateOrder(cartID, data.user)
					}
					Cookies.set('auth_token', data.cookie, {SameSite: "Lax"});
					Toastify({
						text: `Account created, redirecting`,
						duration: 3000,
						close: true,
						gravity: "bottom",
						position: "right",
						style: {
							background: "#22c55e",
						}
					}).showToast();
					setTimeout(() => {
						window.location.href = "/account"
					}, 500);
				} else {
					Toastify({
						text: `${data.message}`,
						duration: 3000,
						close: true,
						gravity: "bottom",
						position: "right",
						style: {
							background: "#dc2626",
						}
					}).showToast();
				}

			} else {
				Toastify({
					text: `Passwords do not match`,
					duration: 3000,
					close: true,
					gravity: "bottom",
					position: "right",
					style: {
						background: "#dc2626",
					}
				}).showToast();
			}
    } catch (error) {
      console.log(error);
			Toastify({
				text: `SERVER ERROR: Please try again later`,
				duration: 3000,
				close: true,
				gravity: "bottom",
				position: "right",
				style: {
					background: "#dc2626",
				}
			}).showToast();
    }
  };

	// Ask chatgpt to send a put request to orders/registered/:id get the userid from decodecookie and send it.
	
	return (
		<form className="form" onSubmit={(e) => handleSubmit(e)}>
			<div className="form-container">
				<h1>Een account aanmaken</h1>
				<p>Heeft u al een account? <a href="/account/inloggen">Inloggen</a></p>
				<div>
					<label htmlFor="name">Volledige Naam</label>
					<input 
						type="text" 
						id="name" 
						name="name" 
						onChange={(e) => setUser({ ...user, name: e.target.value })}
						placeholder="Volledige Naam"
						required
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input 
						type="email" 
						id="email" 
						name="email" 
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						placeholder="Email"
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Wachtwoord</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						placeholder="Wachtwoord"
						required
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">Herhaal Wachtwoord</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
						placeholder="Herhaal Wachtwoord"
						required
					/>
				</div>
				<button className="button" type="submit" onClick={(e) => handleSubmit(e)} >Registreren</button>
			</div>
		</form>
	)
}

export default RegisterPage