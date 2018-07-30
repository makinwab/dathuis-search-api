const { clientsData } = require('../models/client');

class Clients {
  getAll(args) {
    if (args.name && args.origin) {
      return clientsData.filter(client => {
        return (`${client.first_name} ${client.last_name}` == args.name) && 
          (client.origin == args.origin);
      });
    }
    
    if (args.name) {
      return clientsData.filter(client => {
        return `${client.first_name} ${client.last_name}` == args.name
      });
    }
    
    if (args.origin) {
      return clientsData.filter(client => client.origin == args.origin);
    }
    
    return clientsData;
  };
}

const clients = new Clients;

module.exports = { clients };