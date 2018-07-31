const { clientsData } = require('./models/client');

module.exports = {
  Clients: {
    all(args) {
      let data = clientsData;

      if (args.name && args.origin) {
        data = clientsData.filter(client => {
          return (`${client.first_name} ${client.last_name}` == args.name) && 
            (client.origin == args.origin);
        });
      }
      
      if (args.name) {
        data = clientsData.filter(client => {
          return `${client.first_name} ${client.last_name}` == args.name
        });
      }
      
      if (args.origin) {
        data = clientsData.filter(client => client.origin == args.origin)
      }
      
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
    edge: paginatedData,
    pageInfo: {
      size: paginatedData.length,
      endCursor: paginatedData[paginatedData.length - 1].id,
      limit
    }
  };
}