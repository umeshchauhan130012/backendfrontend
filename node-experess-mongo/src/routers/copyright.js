const express = require("express");
const router = new express.Router();
const Copyright = require("../models/copyrights");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add data
router.post("/copyright", protect, async(req, res) => {
    try{
       const copytext = new Copyright(req.body);
       const copyrightext = await copytext.save();
       res.status(201).send(copyrightext);
    }catch(err){
       res.status(400).send(err)
    } 
}) 
//  Get Tags 
router.get("/copyright", async(req, res) => {
    try{
        const copyrightData = await Copyright.find();
        res.send(copyrightData);
    }catch(err){
        res.status(400).send(err);
    }
})
//  get by id data
router.get("/copyright/:id", protect, async(req, res) => {
    try{
       const _id = req.params.id;
       const singleGetCopyId = await Copyright.findById(_id);
       if(!singleGetCopyId){
          res.status(400).send();
       }else {
          res.status(200).send(singleGetCopyId);
       }
    }catch(err){
       res.status(400).send(err);
    }
 })
//  get single data
router.patch("/copyright/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const copyrightUpdate = await Copyright.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(copyrightUpdate);
    }catch(err){
        return res.status(400).send(copyrightUpdate);
    }
})

module.exports = router; 