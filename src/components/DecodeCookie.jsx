import Cookies from 'js-cookie';

export const DecodeCookie = () => {
  const authCookie = Cookies.get('auth_token');

  if (authCookie) {
    try {
      const decodedJwt = JSON.parse(atob(authCookie.split('.')[1]));
      return decodedJwt;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return '';
    }
  }
};