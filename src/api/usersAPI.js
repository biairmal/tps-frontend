import Api from './api';

const usersAPI = {
  createUser(data) {
    return Api.post('/users', data);
  },
  getUsers() {
    return Api.get('/users');
  },
  getUserById(id) {
    return Api.get(`/users/${id}`);
  },
  updateUser(data) {
    return Api.put('/users', data);
  },
  deleteUserById(id) {
    return Api.delete(`/users/${id}`);
  }
};

export default usersAPI;
