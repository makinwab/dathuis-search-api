const { clientsData } = require('./models/client');
const totalCount = clientsData.length;

module.exports = {
  Clients: {
    all(args) {
      let data = clientsData;

      if (args.name && args.origin) {
        data = data.filter(client => {
          const {fullName, origin} = selectFields(client);

          return (fullName == args.name.toLowerCase()) && (origin == args.origin.toLowerCase());
        });
      }

      if (args.name) {
        data = data.filter(client => {
          const { fullName } = selectFields(client);

          return fullName == args.name.toLowerCase();
        });
      }

      if (args.origin) {
        data = data.filter(client => {
          const { origin } = selectFields(client);

          return origin == args.origin.toLowerCase();
        });
      }

      return paginateData(data, args.cursor, args.limit);
    }
  }
}

const selectFields = (client) => {
  let { first_name, last_name, origin } = client;
        
  fullName = `${(first_name || '').toLowerCase()} ${(last_name || '').toLowerCase()}`;
  origin = (origin || '').toLowerCase();

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