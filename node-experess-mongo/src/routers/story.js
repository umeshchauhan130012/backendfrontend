const express = require("express");
const router = new express.Router();
const Story = require("../models/stories");
const upload = require('../middleware/upload');
const fs = require('fs');
const cors = require('cors');
const { protect } = require("../middleware/authMiddleware");

router.use(cors());
router.use('/uploads', express.static('uploads'));
//  add data
router.post("/story", protect, upload.fields([
   { name: 'filefirst', maxCount: 1 },  
   { name: 'filesecond', maxCount: 1 } 
 ]), async(req, res) => {
   const { headline, subheadline, slug, summary, bodytext, pagetitle, metatitle, metakeyword, metadescription } = req.body; 
   if (!req.files || !req.files.filefirst || !req.files.filesecond) {
      return res.status(400).json({ message: 'No file uploaded2222' });
    }
    try {
      const file = new Story({
         headline: headline,
         subheadline: subheadline,
         slug: slug,
         summary: summary,
         bodytext: bodytext,
         pagetitle: pagetitle,
         metatitle: metatitle,
         metakeyword: metakeyword,
         metadescription: metadescription,
         filefirst: {
            filename: req.files.filefirst[0].filename,
            path: req.files.filefirst[0].path,
            size: req.files.filefirst[0].size,
            mimetype: req.files.filefirst[0].mimetype
          },
          filesecond: {
            filename: req.files.filesecond[0].filename,
            path: req.files.filesecond[0].path,
            size: req.files.filesecond[0].size,
            mimetype: req.files.filesecond[0].mimetype
          },
      });
      await file.save();
      res.status(201).json({
         message: 'Story created successfully'
      });
    } catch (err) {
      res.status(500).send(err);
    }
}) 
//  get data
router.get("/story", protect, async(req, res) => {
   try{
      const storyData = await Story.find();
      res.send(storyData);
   }catch(err){
       res.status(400).send(err);
   }
})
//  get by id data
router.get("/story/:id", protect, async(req, res) => {
   try{
      const _id = req.params.id;
      const singleStory = await Story.findById(_id);
      if(!singleStory){
         res.status(400).send();
      }else {
         res.status(200).send(singleStory);
      }
   }catch(err){
      res.status(400).send(err);
   }
})
//  update story data
router.patch("/story/:id", protect, upload.fields([
   { name: 'filefirst', maxCount: 1 },  
   { name: 'filesecond', maxCount: 1 } 
 ]), async(req, res) => {
   try {
      // Find the document by ID
      const story = await Story.findByIdAndUpdate(req.params.id);
      if (!story) {
        return res.status(404).json({ message: 'Story not found' });
      }
      // Update metadata fields from req.body
      const { headline, subheadline, slug, summary, bodytext, pagetitle, metatitle, metakeyword, metadescription } = req.body;
      if (headline) story.headline = headline;
      if (subheadline) story.subheadline = subheadline;
      if (slug) story.slug = slug;
      if (summary) story.summary = summary;
      if (bodytext) story.bodytext = bodytext;
      if (pagetitle) story.pagetitle = pagetitle;
      if (metatitle) story.metatitle = metatitle;
      if (metakeyword) story.metakeyword = metakeyword;
      if (metadescription) story.metadescription = metadescription;
      // If a new file is uploaded, replace the existing file
      if (req.files && req.files.filefirst && req.files.filefirst.length > 0) {
         if (story.filefirst && fs.existsSync(story.filefirst.path)) {
         fs.unlinkSync(story.filefirst.path); // Delete old filefirst
         }
         story.filefirst = {
         filename: req.files.filefirst[0].filename,
         path: req.files.filefirst[0].path,
         size: req.files.filefirst[0].size,
         mimetype: req.files.filefirst[0].mimetype
         };
      } else {
         return res.status(400).json({ error: 'No file selected' });
     }
      // If a new `filesecond` is uploaded, delete the old file and update
      if (req.files && req.files.filesecond && req.files.filesecond.length > 0) {
         if (story.filesecond && fs.existsSync(story.filesecond.path)) {
         fs.unlinkSync(story.filesecond.path); // Delete old filesecond
         }
         story.filesecond = {
         filename: req.files.filesecond[0].filename,
         path: req.files.filesecond[0].path,
         size: req.files.filesecond[0].size,
         mimetype: req.files.filesecond[0].mimetype
         };
      }
      else {
         return res.status(400).json({ error: 'No file selected' });
     }
      // Save the updated document
      await story.save();
      res.status(200).send(story);
    } catch (err) {
      res.status(500).send(err);
    }
}) 
// delete story
router.delete("/story/:id", protect, async(req, res) => {
   try{
      const _id = req.params.id;
      const storyId = await Story.findByIdAndDelete(_id);
      if(!storyId){
         return res.status(400).send();
      }else{
         return res.status(200).send(storyId);
      }
   }catch(err){
       res.status(400).send(err);
   }
})


module.exports = router; 