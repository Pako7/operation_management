import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/';

class UserService {
  getAll() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
  }

  create(payload) {
    return axios.post(API_URL + 'users', payload, { headers: authHeader() });
  }

  update(id, payload) {
    return axios.put(API_URL + `users/${id}`, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
  }

}

export default new UserService();