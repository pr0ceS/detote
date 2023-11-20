import { useState } from "react"
import Cookies from "js-cookie";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const LoginPage = () => {
	const [user, setUser] = useState({
    email: "",
    password: "",
  });


	const handleSubmit = async (e) => {
    try {
      e.preventDefault();

			const res = await fetch('http://localhost:5000/api/login', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({user})
			});


			const data = await res.json();
			if(data.success) {
				Cookies.set('auth_token', data.cookie, {SameSite: "Lax"});
				Toastify({
					text: `Logged in, redirecting`,
					duration: 3000,
					close: true,
					gravity: "bottom",
					position: "right",
					style: {
						background: "#22c55e",
					}
				}).showToast();
				window.location.href = "/account"
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

	return (
		<form className="form form-login" onSubmit={(e) => handleSubmit(e)}>
			<div className="form-container">
				<h1>Account log in</h1>
				<p>Don't have an account? <a href="/account/register">Sign up</a></p>
				<div>
					<label htmlFor="email">Email:</label>
					<input 
						type="email" 
						id="email" 
						name="email" 
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						value={user.email}
						placeholder="Email"
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						value={user.password}
						placeholder="Password"
						required
					/>
				</div>
				<a className="forgotpassword" href="/">Forgot password?</a>
				<button className="button" type="submit" onClick={(e) => handleSubmit(e)} >Login</button>
			</div>
		</form>
	)
}

export default LoginPage