const DealsService = {
    getAllDeals(db){
        return db.select("*").from("deals");
    },
    getDealById(db, id){
        return db.select("*").from("deals").where({id}).first();
    },
    getAllEmployeeDeals(db, employee_id){
        return db.select("*").from("deals").where({ employee_id });
    },
    createDeal(db, createDeal){
        return db.insert(createDeal).into("deals").returning("*").then(([createdDeal]) => createdDeal)
    },
    updateDealById(db, updateDeal, id){
        return db.update(updateDeal).from("deals").where({id}).returning("*").then(([updatedDeal]) => updatedDeal);
    },
    deleteDealById(db, id){
        return db.delete().from("deals").where({id});
    }
};

module.exports = DealsService;