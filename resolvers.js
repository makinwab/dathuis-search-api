const { clientsData } = require('./models/client');
const totalCount = clientsData.length;

module.exports = {
  Clients: {
    all(args) {
      let data = clientsData;

      data = data.filter(client => {
        let { first_name, last_name, origin } = client;
        
        fullName = (first_name || '').toLowerCase() + (last_name || '').toLowerCase();
        origin = (origin || '').toLowerCase();

        if (args.name && args.origin) {
          return (fullName == args.name.toLowerCase()) && (origin == args.origin.toLowerCase())
        }

        if (args.name) {
          return fullName == args.name.toLowerCase();
        }

        if (args.origin) {
          return origin == args.origin.toLowerCase();
        }

        return true;
      });

      return paginateData(data, args.cursor, args.limit);
    }
  }
}

const paginateData = (data, cursor = 0, limit = 10) => {
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