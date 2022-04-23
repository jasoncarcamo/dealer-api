const express = require("express");
const EmployeeRouter = express.Router();
const {requireAuth} = require("../middleware/jwtAuth");
const EmployeeService = require("../services/EmployeeService");

EmployeeRouter
    .route("/employee")
    .all(requireAuth)
    .get((req, res)=>{
        const database = req.app.get("db");

        EmployeeService.getEmployeeByWorkEmail(database, req.user.work_email)
            .then( dbEmployee => {
                if(!dbEmployee){
                    return res.status(404).json({
                        error: `${req.user.email} not found`
                    });
                };

                delete dbEmployee.password;
                
                return res.status(200).json({
                    dbEmployee
                });
            });
    })

EmployeeRouter
    .route("/employee/:id")
    .all(requireAuth)
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        EmployeeService.getEmployeeById(database, id)
            .then( dbEmployee => {
                if(!dbEmployee){
                    return res.status(404).json({
                        error: `Employee not found`
                    });
                };

                delete dbEmployee.password;
                
                return res.status(200).json({
                    dbEmployee
                });
            });
    })
    .patch((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;
        const {
            first_name,
            middle_name,
            last_name,
            commission_num,
            work_email,
            mobile_number,
            password
        } = req.body;

        const updatemployee = {
            first_name,
            middle_name,
            last_name,
            commission_num,
            work_email,
            mobile_number,
            password
        };

        EmployeeService.getEmployeeById(database, id)
            .then( dbEmployee => {
                if(!dbEmployee){
                    return res.status(404).json({
                        error: `Employee not found`
                    });
                };

                EmployeeService.updateEmployeeById(database, updatemployee, id)
                    .then( updatedEmployee => {
                        
                        delete updatedEmployee.password;

                        return res.status(200).json({
                            updatedEmployee
                        });
                    });
            });
    })
    .delete((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        EmployeeService.getEmployeeById(database, id)
            .then( dbEmployee => {
                if(!dbEmployee){
                    return res.status(404).json({
                        error: `Employee not found`
                    });
                };

                EmployeeService.deleteEmployeeById(database, id)
                    .then( deletedEmployee => {
                        return res.status(200).json({
                            success: "Successfully deleted employee"
                        });
                    });
            });
    })

module.exports = EmployeeRouter;