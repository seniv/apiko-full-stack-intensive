const TOKEN_KEY = 'token';

const tokenMethods = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
  },

  withToken(params) {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      },
      ...params,
    };
  }
};

export default tokenMethods;