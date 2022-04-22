const express = require("express");
const DealsRouter = express.Router();
const DealsService = require("../services/DealsService");
const {requireAuth} = require("../middleware/jwtAuth");

DealsRouter
    .route("/deals")
    .all(requireAuth)
    .get((req, res)=>{
        const database = req.app.get("db");

        DealsService.getAllDeals(database)
            .then(dbDeals => {
                return res.status(200).json({
                    dbDeals
                });
            });
    })
    .post((req, res)=>{
        const {
            type,
            year,
            make,
            model,
            trim,
            vin,
            arrival_start,
            arrival_end,
            trade_in,
            trade_year,
            trade_make,
            trade_model,
            has_title,
            comments,
            write_up_date,
            deposit,
            employee_id
        } = req.body;
        const newDeal = {
            type,
            year,
            make,
            model,
            trim,
            vin,
            arrival_start,
            arrival_end,
            trade_in,
            trade_year,
            trade_make,
            trade_model,
            has_title,
            comments,
            write_up_date,
            deposit,
            employee_id
        };
        const database = req.app.get("db");

        for(const key of Object.keys(newDeal)){
            if(newDeal[key] === undefined){
                return res.status(400).json({
                    error: `Missing ${key} in request`
                });
            };
        };

        DealsService.createDeal(database, newDeal)
            .then( createdDeal => {
                return res.status(200).json({
                    createdDeal
                });
            });
    });

DealsRouter
    .route("/deals/:id")
    .all(requireAuth)
    .get((req, res)=>{
        const database = req.app.get("db");

        DealsService.getDealById(database, req.params.id)
            .then( dbDeal => {
                if(!dbDeal){
                    return res.status(404).json({
                        error: `Deal does not exist`
                    });
                };

                return res.status(200).json({
                    dbDeal
                });
            })
    })
    .patch((req, res)=>{
        const database = req.app.get("db");
        const {
            type,
            year,
            make,
            model,
            trim,
            vin,
            arrival_start,
            arrival_end,
            trade_in,
            trade_year,
            trade_make,
            trade_model,
            has_title,
            comments,
            write_up_date,
            deposit,
            employee_id
        } = req.body;
        const updateDeal = {
            id: req.params.id,
            type,
            year,
            make,
            model,
            trim,
            vin,
            arrival_start,
            arrival_end,
            trade_in,
            trade_year,
            trade_make,
            trade_model,
            has_title,
            comments,
            write_up_date,
            deposit,
            employee_id
        };

        for(const key of Object.keys(updateDeal)){
            if(updateDeal[key] === undefined){
                return res.status(400).json({
                    error: `${key} is undefined`
                });
            };
        };

        DealsService.getDealById(database, updateDeal.id)
            .then( dbDeal => {
                if(!dbDeal){
                    return res.status(404).json({
                        error: `Deal was not found`
                    });
                };

                DealsService.updateDealById(database, updateDeal, updateDeal.id)
                    .then( updatedDeal => {
                        return res.status(200).json({
                            updatedDeal
                        });
                    });
            })
    })
    .delete((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        DealsService.getDealById(database, id)
            .then( dbDeal => {
                if(!dbDeal){
                    return res.status(404).json({
                        error: `Deal was not found`
                    });
                };

                DealsService.deleteDealById(database, id)
                    .then( deletedDeal => {
                        return res.status(200).json({
                            success: "Deleted deal"
                        });
                    });
            });
    });

module.exports = DealsRouter;