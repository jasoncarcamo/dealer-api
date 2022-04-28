const express = require("express");
const AuthenticationRouter = express.Router();
const {requireAuth} = require("../middleware/jwtAuth");
const EmployeeService = require("../services/EmployeeService");
const Bcrypt = require("../services/Bcrypt");
const JWT = require("../services/JWT");
const res = require("express/lib/response");

AuthenticationRouter
    .route("/register")
    .post((req, res)=>{
        const {
            first_name,
            middle_name,
            last_name,
            commission_num,
            work_email,
            mobile_number,
            password
        } = req.body;

        const newEmployee = {
            first_name,
            middle_name,
            last_name,
            commission_num,
            work_email,
            mobile_number,
            password
        };

        for(const key of Object.keys(newEmployee)){
            
            if(!key || !newEmployee[key]){
                return res.status(400).json({
                    error: `Missing ${key} in request`
                });
            };
        };

        const database = req.app.get("db");

        EmployeeService.getEmployeeByWorkEmail(database, newEmployee.work_email)
            .then(dbEmployee => {
                
                if(dbEmployee){
                    return res.status(400).json({
                        error: `${work_email} already exists`
                    });
                };

                Bcrypt.hashPassword(newEmployee.password)
                    .then( hashedPassword => {
                        newEmployee.password = hashedPassword;

                        EmployeeService.createEmployee(database, newEmployee)
                            .then( createdEmployee => {
                                const subject = createdEmployee.work_email;
                                const payload = {
                                    user: createdEmployee.email,
                                    type: "employee"
                                };

                                delete createdEmployee.password;

                                return res.status(200).json({
                                    createdEmployee,
                                    token: JWT.createJwt(subject, payload)
                                });
                            });
                    });
            });
    });

AuthenticationRouter
    .route("/login")
    .post((req, res)=>{
        const {
            work_email,
            password
        } = req.body;

        const employee = {
            work_email,
            password
        };
        const database = req.app.get("db");
        
        for(const key of Object.keys(employee)){
            if(!key || !employee[key]){
                return res.status(400).json({
                    error: `Missing ${key} in request`
                });
            };
        };

        EmployeeService.getEmployeeByWorkEmail(database, employee.work_email)
            .then( dbEmployee => {
                
                if(!dbEmployee){
                    return res.status(200).json({
                        error: `${employee.work_email} was not found`
                    });
                };

                Bcrypt.comparePassword(employee.password, dbEmployee.password)
                    .then( passwordMatched => {

                        if(!passwordMatched){
                            return res.status(400).json({
                                error: "Incorrect password"
                            });
                        }

                        const subject = dbEmployee.work_email;
                        const payload = {
                            user: dbEmployee.work_email,
                            type: "employee"
                        };

                        delete dbEmployee.password;

                        return res.status(200).json({
                            employee: dbEmployee,
                            token: JWT.createJwt(subject, payload)
                        });
                    });
            });
    });

module.exports = AuthenticationRouter;
