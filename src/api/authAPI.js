import Api from './api';

const authAPI = {
  login(data) {
    return Api.post('/login', data);
  },
  logout() {
    return Api.post('/logout');
  }
};

export default authAPI;
