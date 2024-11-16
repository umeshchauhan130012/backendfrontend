const express = require("express");
const router = new express.Router();
const Tag = require("../models/tags");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add data
router.post("/tags", async(req, res) => {
    try{
       const tagList = new Tag(req.body);
       const createTag = await tagList.save();
       res.status(201).send(createTag);
    }catch(err){
       res.status(400).send(err)
    } 
}) 
//  Get Tags 
router.get("/tags", protect, async(req, res) => {
    try{
        const tagData = await Tag.find();
        res.send(tagData);
        // res.send({
        //     data: tagData,
        //     lengthd: tagData.length,
        //   });
    }catch(err){
        res.status(400).send(err);
    }
})
//  Get Single tag
router.get("/tags/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const tagIdData = await Tag.findById(_id);
        if(!tagIdData){
            return res.status(400).send();
        }else{
            res.status(200).send(tagIdData)
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  Update single data
router.patch("/tags/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const tagUpdate = await Tag.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(tagUpdate);
    }catch(err){
        return res.status(400).send(tagUpdate);
    }
})
//  delete single data
router.delete("/tags/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const tagDelete = await Tag.findByIdAndDelete(_id);
        if(!tagDelete){
            return res.status(400).send();
        }else{
            res.status(200).send(tagDelete);
        }
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router; 