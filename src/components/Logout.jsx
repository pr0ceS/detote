import Cookies from "js-cookie";

const Logout = () => {
	Cookies.remove('auth_token');
	window.location.href="/"
};

export default Logout
