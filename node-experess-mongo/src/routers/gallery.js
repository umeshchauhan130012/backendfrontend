const express = require("express");
const router = new express.Router();
const Gallery = require("../models/galleries");
const upload = require('../middleware/upload');
const fs = require('fs');
const cors = require('cors');
const { protect } = require("../middleware/authMiddleware");

router.use(cors());
router.use('/uploads', express.static('uploads'));
//  add data
router.post("/gallery", protect, upload.fields([
   { name: 'filefirst', maxCount: 1 }
 ]), async(req, res) => {
   const { alt, title } = req.body; 
   if (!req.files || !req.files.filefirst) {
      return res.status(400).json({ message: 'No file uploaded2222' });
    }
    try {
      const file = new Gallery({
         alt: alt,
         title: title,
         filefirst: {
            filename: req.files.filefirst[0].filename,
            path: req.files.filefirst[0].path,
            size: req.files.filefirst[0].size,
            mimetype: req.files.filefirst[0].mimetype
          },
      });
      await file.save();
      res.status(201).json({
         message: 'Gallery image inserted successfully'
      });
    } catch (err) {
      res.status(500).send(err);
    }
}) 
//  get data
router.get("/gallery", protect, async(req, res) => {
   try{
      const galleryData = await Gallery.find();
      res.send(galleryData);
   }catch(err){
       res.status(400).send(err);
   }
})
//  get by id data
router.get("/gallery/:id", protect, async(req, res) => {
   try{
      const _id = req.params.id;
      const singleGalleryImg = await Gallery.findById(_id);
      if(!singleGalleryImg){
         res.status(400).send();
      }else {
         res.status(200).send(singleGalleryImg);
      }
   }catch(err){
      res.status(400).send(err);
   }
})
//  update story data
router.patch("/gallery/:id", protect, upload.fields([
   { name: 'filefirst', maxCount: 1 }
 ]), async(req, res) => {
   try {
      // Find the document by ID
      const galleryimg = await Gallery.findByIdAndUpdate(req.params.id);
      if (!galleryimg) {
        return res.status(404).json({ message: 'galleryimg not found' });
      }
      // Update metadata fields from req.body
      const { alt, title, slug } = req.body;
      if (alt) galleryimg.alt = alt;
      if (title) galleryimg.title = title;
      // If a new file is uploaded, replace the existing file
      if (req.files && req.files.filefirst && req.files.filefirst.length > 0) {
         if (galleryimg.filefirst && fs.existsSync(galleryimg.filefirst.path)) {
         fs.unlinkSync(galleryimg.filefirst.path); // Delete old filefirst
         }
         galleryimg.filefirst = {
         filename: req.files.filefirst[0].filename,
         path: req.files.filefirst[0].path,
         size: req.files.filefirst[0].size,
         mimetype: req.files.filefirst[0].mimetype
         };
      } else {
         return res.status(400).json({ error: 'No file selected' });
     }
      // Save the updated document
      await galleryimg.save();
      res.status(200).send(galleryimg);
    } catch (err) {
      res.status(500).send(err);
    }
}) 
// delete story data
router.delete("/gallery/:id", protect, async(req, res) => {
   try{
      const _id = req.params.id;
      const galleryId = await Gallery.findByIdAndDelete(_id);
      if(!galleryId){
         return res.status(400).send();
      }else{
         return res.status(200).send(galleryId);
      }
   }catch(err){
       res.status(400).send(err);
   }
})
// module export here
module.exports = router; 