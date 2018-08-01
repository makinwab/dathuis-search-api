const { clientsData } = require('./models/client');
const totalCount = clientsData.length;

module.exports = {
  Clients: {
    all(args) {
      let data = clientsData;

      if (args.searchTerm) {
        data = data.filter(client => {
          const {fullName, origin} = searchableFields(client);
          const regex = new RegExp(args.searchTerm, 'gi');

          return (fullName.search(regex) == 0) || (origin.search(regex) == 0);
        });
      }

      return paginateData(data, args.cursor, args.limit);
    }
  }
}

// Get fields/values to be searched
const searchableFields = (client) => {
  let { first_name, last_name, origin } = client;
        
  fullName = `${(first_name || '')} ${(last_name || '')}`;
  origin = origin || '';

  return {fullName, origin};
}

const paginateData = (data, cursor = 0, limit = 10) => {
  if (data.length == 0) {
    return {
      edges: [],
      pageInfo: {}
    };
  }

  const lastIndex = data.findIndex(element => {
    return element.id == cursor
  });

  const paginatedData = data.slice(lastIndex + 1, lastIndex + limit + 1);
  cursor = paginatedData[paginatedData.length - 1].id;
  const endCursor = data.slice(-1)[0].id;

  return {
    edges: paginatedData,
    pageInfo: {
      hasNextPage: cursor != endCursor,
      endCursor,
      size: paginatedData.length,
      totalCount,
      cursor,
      limit
    }
  };
}