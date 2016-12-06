import auth from './auth';

const endpoint = {
  login: process.env.API_URL + '/users/login',
  logout: process.env.API_URL + '/users/logout',
  people: process.env.API_URL + '/search',
  upload: process.env.API_URL + '/sanctions/upload',
  lists: process.env.API_URL + '/lists'
};

const handleError = (response) => {
  if (!response.ok) {
    return Promise.reject(response);
  }
  return response;
};

const handleJSON = (response) =>
  response.json()

const api = {
  login(credentials) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };
    return fetch(endpoint.login, options)
      .then(handleError)
      .then(handleJSON)
      .then((response) => {
        if (response.codigo !== 200) {
          return Promise.reject('No se pudo iniciar sesión. Verifique sus credenciales e inténtelo nuevamente');
        }
        return response.detalle[0];
      });
  },
  logout() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': auth.getToken()
      },
      body: JSON.stringify({username: auth.getUsername()})
    };
    return fetch(endpoint.logout, options)
      .then(handleError)
      .then(handleJSON)
      .then((response) => {
        if (response.codigo !== 200) {
          return Promise.reject(response);
        }
        return;
      });
  },
  getPeople(name, score, lists) {
    const options = {
      headers: {
        'Auth-Token': auth.getToken()
      }
    };
    let listsPath = '';
    lists.forEach((list) => {
      listsPath += '&lists=' + list.shortName;
    });
    const path = endpoint.people + '?name=' + name + '&score=' + score + listsPath;
    return fetch(path, options)
      .then(handleError)
      .then(handleJSON);
  },
  getLists() {
    const options = {
      headers: {
        'Auth-Token': auth.getToken()
      }
    };
    const path = endpoint.lists;
    return fetch(path, options)
      .then(handleError)
      .then(handleJSON)
      .then((response) => {
        if (response.codigo !== 200) {
          return Promise.reject('No se pudieron obtener las listas');
        }
        return response.detalle;
      });
  },
  upload(form, score, lists) {
    let shortNames = [];
    lists.forEach((list) => {
      shortNames.push(list.shortName);
    });
    form.append('score', score);
    form.append('lists', shortNames.join(','));
    const options = {
      method: 'POST',
      headers: {
        'Accept-encoding': 'multipart/form-data',
        'Content-Disposition': '[form-data;name=file;filename=lista.csv]',
        'Auth-Token': auth.getToken()
      },
      body: form
    };
    return fetch(endpoint.upload, options)
      .then(handleError);
  }
}

export default api;
