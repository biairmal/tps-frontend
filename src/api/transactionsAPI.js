import Api from './api';

const transactionsAPI = {
  createTransaction(data) {
    return Api.post('/transactions', data);
  },
  getTransactions(options) {
    return Api.get(`/transactions?limit=${options.limit}&page=${options.page}`);
  },
  getTransactionById(id) {
    return Api.get(`/transactions/${id}`);
  }
};

export default transactionsAPI;
