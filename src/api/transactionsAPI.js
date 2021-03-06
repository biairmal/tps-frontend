import queryBuilder from 'helpers/queryBuilder';
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
  },
  downloadInvoice(filename) {
    return Api.get(`/files/${filename}`, { responseType: 'blob' });
  },
  getBuyers(query) {
    const queryString = queryBuilder(query);
    return Api.get(`/buyers?${queryString}`);
  }
};

export default transactionsAPI;
