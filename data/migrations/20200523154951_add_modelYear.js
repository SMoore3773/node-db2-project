
exports.up = function(knex) {
    return knex.schema.table('cars',tbl =>{
        tbl.integer('modelYear');
    })
};

exports.down = function(knex) {
    return knex.schema.table('cars', tbl=>{
        tbl.dropColumn('modelYear');
    })
};
