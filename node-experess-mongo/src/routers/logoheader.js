const express = require("express");
const router = new express.Router();
const LogoHeader = require("../models/logoheaders");
const upload = require('../middleware/upload');
const fs = require('fs');
const cors = require('cors');
const { protect } = require("../middleware/authMiddleware");

router.use(cors());
router.use('/uploads', express.static('uploads'));
//  add data
router.post("/headerlogo", protect, upload.fields([
   { name: 'logohead', maxCount: 1 }
 ]), async(req, res) => {
   const { logolink, title } = req.body; 
   if (!req.files || !req.files.logohead) {
      return res.status(400).json({ message: 'No file uploaded2222' });
    }
    try {
      const file = new LogoHeader({
         logolink: logolink,
         title: title,
         logohead: {
            filename: req.files.logohead[0].filename,
            path: req.files.logohead[0].path,
            size: req.files.logohead[0].size,
            mimetype: req.files.logohead[0].mimetype
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
router.get("/headerlogo", async(req, res) => {
   try{
      const galleryData = await LogoHeader.find();
      res.send(galleryData);
   }catch(err){
       res.status(400).send(err);
   }
})
//  get by id data
router.get("/headerlogo/:id", protect, async(req, res) => {
  try{
     const _id = req.params.id;
     const singleGalleryImg = await LogoHeader.findById(_id);
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
router.patch("/headerlogo/:id", protect, upload.fields([
   { name: 'logohead', maxCount: 1 }
 ]), async(req, res) => {
   try {
      // Find the document by ID
      const galleryimg = await LogoHeader.findByIdAndUpdate(req.params.id);
      if (!galleryimg) {
        return res.status(404).json({ message: 'galleryimg not found' });
      }
      // Update metadata fields from req.body
      const { logolink, title, slug } = req.body;
      if (logolink) galleryimg.logolink = logolink;
      if (title) galleryimg.title = title;
      // If a new file is uploaded, replace the existing file
      if (req.files && req.files.logohead && req.files.logohead.length > 0) {
         if (galleryimg.logohead && fs.existsSync(galleryimg.logohead.path)) {
         fs.unlinkSync(galleryimg.logohead.path); // Delete old logohead
         }
         galleryimg.logohead = {
         filename: req.files.logohead[0].filename,
         path: req.files.logohead[0].path,
         size: req.files.logohead[0].size,
         mimetype: req.files.logohead[0].mimetype
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
// module export here
module.exports = router; 