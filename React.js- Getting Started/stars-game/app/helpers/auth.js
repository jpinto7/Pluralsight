import api from './api';

let isAuthenticated = false;
let username = '';
let token = null;
const sessionKey = '_unck_session';

const useCredentials = (credentials) => {
  isAuthenticated = true;
  username = credentials.username;
  token = credentials.token;
}

const storeCredentials = (credentials) => {
  sessionStorage.setItem(sessionKey, JSON.stringify(credentials));
  useCredentials(credentials);
}

const destroyCredentials = () => {
  isAuthenticated = false;
  token = '';
  username = '';
  sessionStorage.removeItem(sessionKey);
}

const auth = {
  doLogin(credentials) {
    return api.login(credentials)
      .then((response) => {
        storeCredentials({
          token: response.token,
          username: credentials.username
        });
        return;
      })
      .catch((error) =>
        Promise.reject(error)
      );
  },
  doLogout() {
    return api.logout()
      .then((response) => {
        destroyCredentials();
        return;
      })
      .catch((error) => {
        destroyCredentials();
        return Promise.reject(error);
      });
  },
  getUsername() {
    return username;
  },
  getToken() {
    return token;
  },
  isAuthenticated() {
    return isAuthenticated;
  },
  loadCredentials() {
    try {
      const credentials = JSON.parse(sessionStorage.getItem(sessionKey));
      if (credentials != null) {
        useCredentials(credentials);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default auth;
