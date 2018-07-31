const { clientsData } = require('./models/client');
const totalClients = clientsData.length;

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

      return paginateData(data, args.endCursor, args.limit);
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
      size: totalClients,
      endCursor: paginatedData[paginatedData.length - 1].id,
      limit
    }
  };
}