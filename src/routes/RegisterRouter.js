const express = require("express");
const RegisterRouter = express.Router();
const {requireAuth} = require("../middleware/jwtAuth");

RegisterRouter
    .post((req, res)=>{
        const {
            first_name,
            middle_name,
            last_name,
            comission_num,
            work_mail
        } = req.body;

        const newEmployee = {
            first_name,
            middle_name,
            last_name,
            comission_num,
            work_mail
        };

        for(const [key] of Object.keys(newEmployee)){
            if(key === undefined){
                return res.status(400).json({
                    error: `Missing ${key} in request`
                });
            };
        };
    });

module.exports = RegisterRouter;
