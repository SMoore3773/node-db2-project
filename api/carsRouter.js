const express = require('express');
const db = require('../data/db-config');

const router = express.Router();

router.get('/', async (req,res)=>{
   try{
    const cars = await db.select('*').from('cars');
    if(cars.length === 0){
        res.status(200).json({message:"there are no cars in the database"})
    }else{
     res.status(200).json(cars)   
    }
    
    } catch(err){
        res.status(500).json({message:"error in retrieving cars"})
    }
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const car = await db.select('*').from('cars').where('id', id).first();
        if(car){
            res.status(200).json(car);
        }else{
            res.status(404).json({message:"car not found"})
        }
    }catch(err){
        res.status(500).json({message:"error in getting car from database"})
    }
})

router.post('/', async (req,res)=>{
    const car = req.body;
    try{
        if(!car){
            res.status(400).json({message:"car data needed"})
        }else if(!car.vin){
            res.status(400).json({message:"car vin data needed"})
        }else if(!car.make){
            res.status(400).json({message:"car make data needed"})
        }else if(!car.model){
            res.status(400).json({message:"car model data needed"})
        }else if(!car.mileage){
            res.status(400).json({message:"car mileage data needed"})
        }else{
            await db('cars').insert(car);
            res.status(201).json({message:"car added successfully", make: car.make, model: car.model})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"error in adding car to database"})
    }
})

router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const changes = req.body;
  
    if(!changes){
        res.status(400).json({message:"this update requires changes"})
    }else {
       try{
            await db('cars').where('id',id).update({vin: changes.vin, make: changes.make, model:changes.model, mileage: changes.mileage, transmission: changes.transmission, title: changes.title, modelYear: changes.modelYear},['id','vin','make','model','mileage','transmission','title','modelYear']);
            res.status(201).json({message:"update successful"})
        } catch(err){
            res.status(500).json({message:"error in updating car record"})
        }
    }
})

router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            res.status(404).json({message:"car with this ID not found"})
        }else{
            await db('cars').where('id',id).del();
            res.status(204).json({message:"car has been removed from database"})
        }
    }catch(err){
        res.status(500).json({message:"error in removing car from database"})
    }
})

module.exports = router;