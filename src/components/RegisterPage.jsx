import { useState } from "react"

const RegisterPage = () => {
	const [user, setUser] = useState({
		name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

	const handleSubmit = async (e) => {
    try {
      e.preventDefault();

			if(user.confirmPassword === user.password) {
				const res = await fetch('http://localhost:5000/api/register', {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({user: {name: user.name, email: user.email, password: user.password}})
				})
				
				const data = await res.json();
				if(data.success) {
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

			} else {
				console.log("Passwords do not match")
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
		<form className="form" onSubmit={(e) => handleSubmit(e)}>
			<div className="form-container">
				<h1>Create an account</h1>
				<p>Already have an account? <a href="/account/login">Sign in</a></p>
				<div>
					<label htmlFor="name">Name</label>
					<input 
						type="text" 
						id="name" 
						name="name" 
						onChange={(e) => setUser({ ...user, name: e.target.value })}
						placeholder="Name"
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
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						placeholder="Password"
						required
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm password</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
						placeholder="Confirm password"
						required
					/>
				</div>
				<button className="button" type="submit" onClick={(e) => handleSubmit(e)} >Create an account</button>
			</div>
		</form>
	)
}

export default RegisterPage