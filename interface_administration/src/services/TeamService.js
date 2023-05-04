import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:3000/api/v1/';

class TeamService {
  getAll() {
    return axios.get(API_URL + 'teams', { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `teams/${id}`, { headers: authHeader() });
  }

  create(payload) {
    return axios.post(API_URL + 'teams', payload, { headers: authHeader() });
  }

  update(id, payload) {
    return axios.put(API_URL + `teams/${id}`, payload, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `teams/${id}`, { headers: authHeader() });
  }
}

export default new TeamService();