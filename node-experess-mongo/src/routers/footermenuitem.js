const express = require("express");
const router = new express.Router();
const FooteMenuitem = require("../models/footermenus");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add Menuitem
router.post("/footmenuitem", protect, async(req, res) => {
    try{
        const footmenuList = await FooteMenuitem.insertMany(req.body);
        console.log("footermenu", footmenuList);
       res.status(201).send(footmenuList);
    }catch(err){
       res.status(400).send(err)
    } 
})  
//  Get All menuitem 
router.get("/footmenuitem", async(req, res) => {
    try{
        const footmenuData = await FooteMenuitem.find();
        res.send(footmenuData);
    }catch(err){
        res.status(400).send(err);
    }
})
//  Get Single tag
router.get("/footmenuitem/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const footmenuIdData = await FooteMenuitem.findById(_id);
        if(!footmenuIdData){
            return res.status(400).send();
        }else{
            res.status(200).send(footmenuIdData)
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  delete single menuitem
router.delete("/footmenuitem/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const footmenuDelete = await FooteMenuitem.findByIdAndDelete(_id);
        if(!footmenuDelete){
            return res.status(400).send();
        }else{
            res.status(200).send(footmenuDelete);
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  Update single menuitem
router.patch("/footmenuitem/:id", protect, async(req, res) => {
    try{
        const _id = req.params.id;
        const footmenuUpdate = await FooteMenuitem.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(footmenuUpdate);
    }catch(err){
        return res.status(400).send(footmenuUpdate);
    }
})

module.exports = router; 