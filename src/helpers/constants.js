export const server = 'http://autism-app-30447.botics.co';

export const headers = {
  Accept: 'application/json, text/plain, /',
  'Content-Type': 'application/json',
};

export const fetchToken = () => {
  var token = localStorage.getItem('authUser')
    ? JSON.parse(localStorage.getItem('authUser')).token
    : null;

  const config = {
    headers: {
      'X-CSRFToken':
        'ZgT2jJvV2D7L3zktN7I7FW4Bk8Nshero3do19BEBUvrYPJnwoyBfy8WkZrwZ8YG4',
      ...headers,
    },
  };

  return config;
};
