const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Aircraft = require("../models/Aircraft.model");
const isAuthenticated = require("../middleware/jwt.middleware");
//READ: list of all the aircrafts

router.get("/aircrafts", (req, res, next)=> {
    Aircraft.find()
   
    .then(aircrafts => {
        // const {aircraftId, startTrip, duration} = 
        res.status(201).json(aircrafts)
    })
    .catch( err => {
        console.log("error getting aircrafts from DB", err);
        next(err);
      })
});

//CREATE: aircrafts

router.post("/aircrafts", (req, res, next)=> {

    const {name, img, description, price, seats, timetable, isBusy } = req.body;

    return Aircraft.create({ name, img, description, price, seats, timetable, isBusy })
    .then(aircraft => {
        // const {aircraftId, startTrip, duration} = 
        res.status(201).json({ aircraft: aircraft });
    })
    .catch( err => {
        console.log("error creating aircrafts from DB", err);
        next(err);
      })
});

//UPDATE: aircrafts

router.get("/aircrafts/:aircraftId", (req, res, next) => {
    const { aircraftId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(aircraftId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Aircraft.findById(aircraftId)
      .then(aircraft => res.json(aircraft))
    .catch(err => {
      console.log("error getting aircraft details...", err);
      res.status(500).json({
        message: "error getting aircraft details...",
        error: err
      })
    });
});

router.put("/aircrafts/:aircraftId", (req, res, next)=> {
    const { aircraftId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(aircraftId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Aircraft.findByIdAndUpdate(aircraftId, req.body, {new: true})
    .then(aircraft => {
        
        res.status(201).json( aircraft);
    })
    .catch( err => {
        console.log("error creating aircrafts from DB", err);
        next(err);
      })
});

//DELETE: aircrafts

router.delete("/aircrafts/:aircraftId", (req, res, next) => {
const {aircraftId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(aircraftId)){
        res.status(400).json({message: "Id is not valid"});
        return;
    }

    Aircraft.findByIdAndRemove(aircraftId)
    .then(()=>{
        res.json({message: `The aircraft with ID: ${aircraftId} is removed successfully`})
    })
    .catch( err => {
        console.log("error deleting aircrafts from DB", err);
        next(err);
      })
})

module.exports = router