import Api from './api';

const usersAPI = {
  createUser(data) {
    return Api.post('/users', data);
  },
  getUsers(options) {
    return Api.get(`/users?limit=${options.limit}&page=${options.page}`);
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
