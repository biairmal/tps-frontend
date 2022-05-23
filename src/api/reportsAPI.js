import queryBuilder from 'helpers/queryBuilder';
import Api from './api';

const reportsAPI = {
  getReports(query) {
    const queryString = queryBuilder(query);
    return Api.get(`/dailyReports?${queryString}`);
  },
  getThisMonthSummary() {
    return Api.get('dailyReports/summary')
  }
};

export default reportsAPI;
