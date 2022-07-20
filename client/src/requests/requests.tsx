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

  return fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export {
  register,
};