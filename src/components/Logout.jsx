
const Logout = () => {
	document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None;';
	console.log(document.cookie);
};

export default Logout
