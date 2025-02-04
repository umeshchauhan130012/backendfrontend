const express = require("express");
const router = new express.Router();
const Auth = require("../models/authors");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add data
router.post("/author", async(req, res) => {
    try{
       const authList = new Auth(req.body);
       const createAuth = await authList.save();
       res.status(201).send(createAuth);
    }catch(err){
       res.status(400).send(err)
    } 
}) 
//  Get Tags 
router.get("/author", protect, async(req, res) => {
    try{
        const authData = await Auth.find();
        res.send(authData);
        // res.send({
        //     data: authData,
        //     lengthd: authData.length,
        //   });
    } catch(err){
        res.status(400).send(err);
    }
})
//  Get Single tag
router.get("/tags/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const tagIdData = await Auth.findById(_id);
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
        const tagUpdate = await Auth.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(tagUpdate);
    }catch(err){
        return res.status(400).send(tagUpdate);
    }
})
//  delete single data
router.delete("/tags/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const tagDelete = await Auth.findByIdAndDelete(_id);
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