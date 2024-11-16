const express = require("express");
const router = new express.Router();
const Social = require("../models/socialUsers");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add data
router.post("/social", async(req, res) => {
    try{
       const socialList = new Social(req.body);
       const createTag = await socialList.save();
       res.status(201).send(createTag);
    }catch(err){
       res.status(400).send(err)
    } 
}) 
//  Get Tags 
router.get("/social", protect, async(req, res) => {
    try{
        const socialData = await Social.find();
        res.send(socialData);
    }catch(err){
        res.status(400).send(err);
    }
})
//  delete single data
router.delete("/social/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const socialDelete = await Social.findByIdAndDelete(_id);
        if(!socialDelete){
            return res.status(400).send();
        }else{
            res.status(200).send(socialDelete);
        }
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router; 