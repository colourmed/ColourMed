import axios from 'axios';

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](`${process.env.REACT_APP_API_URL}/${path}`, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        console.error(err);
        // return reject(err.response.data.error);
      });
  });
}
