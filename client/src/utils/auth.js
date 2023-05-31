import jwt_decode from "jwt-decode";

class AuthService {
  getUser() {
    return jwt_decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken, userId) {
    localStorage.setItem("id_token", idToken);
    window.location.assign(`dashboard/:userId`);
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default AuthService();
