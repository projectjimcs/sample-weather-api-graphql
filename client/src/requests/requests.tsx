function fetchData(query: any, errorMessage: string = '', isModifyToken: boolean = false, token: string = '') {
    // This is awkward, will come back to if time permits
    let headers;
    if (token) {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    } else {
      headers = {
        'Content-Type': 'application/json',
      }
    }

  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(query),
    credentials: 'include',
    headers: headers,
  };

  return fetch('http://localhost:8000/graphql', options).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      if (isModifyToken) {
        return {
          userId: 0,
          token: '',
        }
      } else {
        throw new Error(errorMessage);
      }
    }

    return res.json();
  })
}

function register(username: string, password: string) {
  const query = {
    query: `
      mutation {
        addUser(username: "${username}", password: "${password}") {
          id
          username
        }
      }
    `
  }

  const errorMessage = 'Unable to create user';

  return fetchData(query, errorMessage).then(data => {
    if (data.hasOwnProperty('errors')) {
      return data.errors[0].message;
    } else {
      return 'success';
    }
  }).catch(err => {
    return errorMessage;
  });
}

function login(username: string, password: string) {
  const query = {
    query: `
      query {
        login(username: "${username}", password: "${password}") {
          userId
          token
          tokenExpiry
        }
      }
    `
  }

  const errorMessage = 'Unable to login';

  return fetchData(query, errorMessage).then(data => {
    if (data.hasOwnProperty('errors')) {
      return data.errors[0].message;
    } else {
      return {
        userId: data.data.login.userId,
        token: data.data.login.token,
        tokenExpiry: data.data.login.tokenExpiry,
      }
    }
  }).catch(err => {
    return errorMessage;
  });
}

function validateUser() {
  const query = {
      query: `
        query {
          validate {
            userId
            token
          }
        }
      `
    }

    return fetchData(query, '', true).then(data => {
      if (data.hasOwnProperty('errors')) {
        return {
          userId: 0,
          token: '',
        }
      } else {
        return {
          userId: data.data.validate.userId,
          token: data.data.validate.token,
        }
      }
    }).catch(err => {
      return {
        userId: 0,
        token: '',
      }
    });
}

function logOut() {
  const query = {
    query: `
      mutation {
        logout {
          userId
          token
        }
      }
    `
  }

  const errorMessage = 'Unable to logout';

  // Need to rethink this if time permits, because error or no error, we still
  // reset the auth info, logging the user out, so all paths are essentially the same
  return fetchData(query, errorMessage, true).then(data => {
    return {
      userId: 0,
      token: '',
    }
  }).catch(err => {
    return {
      userId: 0,
      token: '',
    }
  });
}

function getWeather(city: string, token: string | undefined) {
  const query = {
    query: `
      query {
        weather(city: "${city}") {
          shortDesc
          description
          temp
        }
      }
    `
  }

  const errorMessage = 'Unable to get weather';

  return fetchData(query, errorMessage, false, token).then(data => {
    if (data.hasOwnProperty('errors')) {
      return data.errors[0].message;
    } else {
      return data.data.weather;
    }
  }).catch(err => {
    return errorMessage;
  });
}

export {
  register,
  login,
  validateUser,
  logOut,
  getWeather,
};