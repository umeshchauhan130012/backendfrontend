const express = require("express");
const router = new express.Router();
const Category = require("../models/categories");
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());
//  add category
router.post("/category", protect, async(req, res) => {
    try{
       const categoryList = new Category(req.body);
       const createCategory = await categoryList.save();
       res.status(201).send(createCategory);
    }catch(err){
       res.status(400).send(err)
    } 
}) 
//  Get category 
router.get("/category", protect, async(req, res) => {
    try{
        const categoryData = await Category.find();
        res.send(categoryData);
        // res.send({
        //     data: categoryData,
        //     lengthd: categoryData.length,
        //   });
    }catch(err){
        res.status(400).send(err);
    }
})
//  Get Single category
router.get("/category/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const categoryIdData = await Category.findById(_id);
        if(!categoryIdData){
            return res.status(400).send();
        }else{
            res.status(200).send(categoryIdData)
        }
    }catch(err){
        res.status(400).send(err);
    }
})
//  Update single category
router.patch("/category/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const categoryUpdate = await Category.findByIdAndUpdate(_id, req.body, {new: true});
        res.status(200).send(categoryUpdate);
    }catch(err){
        return res.status(400).send(categoryUpdate);
    }
})
//  delete single category
router.delete("/category/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const categoryDelete = await Category.findByIdAndDelete(_id);
        if(!categoryDelete){
            return res.status(400).send();
        }else{
            res.status(200).send(categoryDelete);
        }
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router; 