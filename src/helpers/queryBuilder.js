function queryBuilder(query) {
  if (typeof query === 'object' && Object.keys(query).length > 1) {
    let queryString = '';
    Object.keys(query).map((key, index) => {
      if (query[key]) {
        queryString += `${index > 0 ? '&' : ''}${key}=${query[key]}`;
      }
    });
    return queryString;
  }
  return '';
}

export default queryBuilder;
