const express = require("express");
const router = new express.Router();
const Menuitem = require("../models/menuitems");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add Menuitem
router.post("/menuitem", async(req, res) => {
    try{
        const menuList = await Menuitem.insertMany(req.body);
       console.log("hiiiiiiiiiiiiii", menuList);
       res.status(201).send(menuList);
    }catch(err){
       res.status(400).send(err)
    } 
}) 
//  Get All menuitem 
router.get("/menuitem", protect, async(req, res) => {
    try{
        const menuData = await Menuitem.find();
        res.send(menuData);
    }catch(err){
        res.status(400).send(err);
    }
})
//  Get Single tag
router.get("/menuitem/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const menuIdData = await Menuitem.findById(_id);
        if(!menuIdData){
            return res.status(400).send();
        }else{
            res.status(200).send(menuIdData)
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  delete single menuitem
router.delete("/menuitem/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const menuDelete = await Menuitem.findByIdAndDelete(_id);
        if(!menuDelete){
            return res.status(400).send();
        }else{
            res.status(200).send(menuDelete);
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  Update single menuitem
router.patch("/menuitem/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const menuUpdate = await Menuitem.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(menuUpdate);
    }catch(err){
        return res.status(400).send(menuUpdate);
    }
})

module.exports = router; 