const fs = require('fs');
const clientsData = JSON.parse(fs.readFileSync('clients.json'));

// Parse Clients Data - replace id value with $old's value
clientsData.forEach(item => {
  item.id = item.id['$oid'];
});

module.exports = { clientsData };