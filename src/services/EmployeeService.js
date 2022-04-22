const res = require("express/lib/response");

const EmployeeService = {
    getAllEmpoyees(db){
    return db.select("*").from("employees");  
    },
    getEmployeeByWorkEmail(db, work_email){
        return db.select("*").from("employees").where({work_email}).first();
    },
    getEmployeeById(db, id){
        return db.select("*").from("employees").where({id}).first();
    },
    createEmployee(db, newEmployee){
        return db.insert(newEmployee).into("employees").returning("*").then(([createdEmployee]) => createdEmployee);
    },
    updateEmployeeById(db, updateEmployee, id){
        return db.update(updateEmployee).from("employees").where({id}).returning("*").then(([updatedEmployee]) => updatedEmployee);
    },
    deleteEmployeeById(db, id){
        return db.delete().from("employees").where({id});
    }
};

module.exports = EmployeeService;