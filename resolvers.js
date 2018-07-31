const { clientsData } = require('./models/client');

module.exports = {
  Clients: {
    all(args) {
      clientsData.filter(client => {
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
      });

      return paginateData(clientsData, args.endCursor, args.limit);
    }
  }
}

const paginateData = (data, endCursor = 0, limit = 10) => {
  const lastIndex = data.findIndex(element => {
    return element.id == endCursor
  });

  const paginatedData = data.slice(lastIndex + 1, lastIndex + limit + 1);

  return {
    edges: paginatedData,
    pageInfo: {
      size: paginatedData.length,
      endCursor: paginatedData[paginatedData.length - 1].id,
      limit
    }
  };
}