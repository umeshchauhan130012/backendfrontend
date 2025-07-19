const express = require("express");
const router = new express.Router();
const NetworkMenuitem = require("../models/networkmenus");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add Menuitem
router.post("/networkmenuitem", protect, async(req, res) => {
    try{
        const networkmenuList = await NetworkMenuitem.insertMany(req.body);
       res.status(201).send(networkmenuList);
    }catch(err){
       res.status(400).send(err)
    } 
})  
//  Get All menuitem 
router.get("/networkmenuitem", async(req, res) => {
    try{
        const networkmenuData = await NetworkMenuitem.find();
        res.send(networkmenuData);
    }catch(err){
        res.status(400).send(err);
    }
})
//  Get Single tag
router.get("/networkmenuitem/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const networkmenuIdData = await NetworkMenuitem.findById(_id);
        if(!networkmenuIdData){
            return res.status(400).send();
        }else{
            res.status(200).send(networkmenuIdData)
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  delete single menuitem
router.delete("/networkmenuitem/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const networkmenuDelete = await NetworkMenuitem.findByIdAndDelete(_id);
        if(!networkmenuDelete){
            return res.status(400).send();
        }else{
            res.status(200).send(networkmenuDelete);
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  Update single menuitem
router.patch("/networkmenuitem/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const networkmenuUpdate = await NetworkMenuitem.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(networkmenuUpdate);
    }catch(err){
        return res.status(400).send(networkmenuUpdate);
    }
})

module.exports = router; 