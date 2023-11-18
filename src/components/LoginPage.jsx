import { useState } from "react"

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
				document.cookie = `auth_token=${await data.cookie}; SameSite=None;`;
				window.location.href = "/account"
			} else {
				console.log(error);
			}
    } catch (error) {
      console.log(error);
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