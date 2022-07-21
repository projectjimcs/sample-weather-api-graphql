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

  //!!! Should be able to refactor the fetch out to its own function to be used
  // for the others, check differences if time permits
  return fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error ('Unable to create user');
    }

    return res.json();
  }).then(data => {
    // Come back to handle errors here
    console.log(data)
  }).catch(err => {
    // !!! Come back to handle errors
    console.log(err);
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

  return fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error ('Unable to login');
    }

    return res.json();
  }).then(data => {
    // Come back to handle errors here
    return {
      userId: data.data.login.userId,
      token: data.data.login.token,
      tokenExpiry: data.data.login.tokenExpiry,
    }
  }).catch(err => {
    // !!! Come back to handle errors
    console.log(err);
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

    return fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(query), 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        return {
          userId: 0,
          token: '',
        }
      }

      return res.json();
    }).then(data => {
      // Come back to handle errors here
      return {
        userId: data.data.validate.userId,
        token: data.data.validate.token,
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

  return fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(query), 
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Unable to logout');
    }

    return res.json();
  }).then(data => {
    // Come back to handle errors here
    return {
      userId: 0,
      token: '',
    }
  }).catch(err => {
    // Come back to handle errors
    console.log(err);
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

  return fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(query), 
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Unable to get weather');
    }

    return res.json();
  }).then(data => {
    // Come back to handle errors here
    return data.data.weather;
  }).catch(err => {
    // Come back to handle errors
    console.log(err);
  });
}

export {
  register,
  login,
  validateUser,
  logOut,
  getWeather,
};