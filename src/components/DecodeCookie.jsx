export const DecodeCookie = () => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  const authCookie = cookies.find(cookie => cookie.startsWith("auth_token="));

  if (authCookie) {
    try {
      const decodedJwt = JSON.parse(atob(authCookie.split('.')[1]));
      return decodedJwt
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return ""
    }
  }
};