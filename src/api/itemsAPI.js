import queryBuilder from 'helpers/queryBuilder';
import Api from './api';

const itemsAPI = {
  createItem(data) {
    return Api.post('/items', data);
  },
  getItems(query) {
    const queryString = queryBuilder(query);
    return Api.get(`/items?${queryString}`);
  },
  getItemById(id) {
    return Api.get(`/items/${id}`);
  },
  updateItem(id, data) {
    return Api.put(`/items/${id}`, data);
  },
  deleteItemById(id) {
    return Api.delete(`/items/${id}`);
  }
};

export default itemsAPI;
