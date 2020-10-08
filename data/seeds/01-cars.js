
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin:123756192, make:'Chevrolet', model:'Corvette', mileage:50102, transmission:'manual', title:'clear',},
        {vin:999991211, make:'Ford', model:'Mustang', mileage:49, transmission:'auto', title:'salvage',},
        {vin:459681881, make:'Ferrari', model:'F40', mileage:25092, transmission:'manual', title:'clear',}
      ]);
    });
};
