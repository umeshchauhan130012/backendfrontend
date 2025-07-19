const express = require("express");
const router = new express.Router();
const Youtube = require("../models/youtubes");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add data
router.post("/youtubelink", protect, async(req, res) => {
    try{
       const youtub = new Youtube(req.body);
       const youtublink = await youtub.save();
       res.status(201).send(youtublink);
    }catch(err){
       res.status(400).send(err)
    } 
}) 
//  Get Tags 
router.get("/youtubelink", async(req, res) => {
    try{
        const youtubeData = await Youtube.find();
        res.send(youtubeData);
    }catch(err){
        res.status(400).send(err);
    }
})
//  get by id data
router.get("/youtubelink/:id", protect, async(req, res) => {
    try{
       const _id = req.params.id;
       const singleyoutubyId = await Youtube.findById(_id);
       if(!singleyoutubyId){
          res.status(400).send();
       }else {
          res.status(200).send(singleyoutubyId);
       }
    }catch(err){
       res.status(400).send(err);
    }
 })
//  get single data
router.patch("/youtubelink/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const youtubeUpdate = await Youtube.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(youtubeUpdate);
    }catch(err){
        return res.status(400).send(youtubeUpdate);
    }
})

module.exports = router; 