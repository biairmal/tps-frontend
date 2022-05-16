import Api from './api';

const itemsAPI = {
  createItem(data) {
    return Api.post('/items', data);
  },
  getItems(options) {
    return Api.get(`/items?limit=${options.limit}&page=${options.page}&search=${options.search}`);
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
