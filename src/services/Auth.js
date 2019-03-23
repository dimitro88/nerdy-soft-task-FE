class Auth {

	authCheck() {
		return !!localStorage.getItem('token');
	}

	logOut() {
		localStorage.setItem('isAuthorized', false);
		localStorage.removeItem('token');
		localStorage.removeItem('admin');
	}

}

export default new Auth();