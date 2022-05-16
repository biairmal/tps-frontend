import Api from './api';

const transactionsAPI = {
  createUser(data) {
    return Api.post('/transactions', data);
  },
  getUsers(options) {
    return Api.get(`/transactions?limit=${options.limit}&page=${options.page}`);
  },
  getUserById(id) {
    return Api.get(`/transactions/${id}`);
  }
};

export default transactionsAPI;
