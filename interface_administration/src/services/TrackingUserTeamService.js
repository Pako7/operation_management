import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:3000/api/v1/';

class TrackingUserTeamService {
  getAll(params =  {}) {

    //debugger
    const filteredParams = Object.keys(params).filter(key => params[key] !== '')
    const paramsForURL = '?' + filteredParams.map(key => key + '=' + params[key]).join('&');

    return axios.get(API_URL + 'tracking_user_teams' + paramsForURL, { headers: authHeader() });
  }
}

export default new TrackingUserTeamService();