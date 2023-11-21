import { useEffect, useState } from 'react';
import { DecodeCookie } from './DecodeCookie';
import Cookies from "js-cookie";

const LoginLink = () => {
  const [userData, setUserData] = useState({})

	useEffect(() => {
		const initCookie = async () => {
			try {
				const authToken = await Cookies.get('auth_token');

				if(authToken) {
					const decodedJwt = await DecodeCookie()
					setUserData(decodedJwt);
				}
			} catch (error) {
				console.log(error);
			}
		}

		initCookie();
	}, [])

  return (
    <div>
    {userData._id && (
      <a className="login" href="/account">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </svg>
      My account
    </a>
    )}
    {!userData._id && (
      <a className="login" href="/account/login">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </svg>
      Log in
    </a>
    )}
  </div>
  );
}

export default LoginLink;