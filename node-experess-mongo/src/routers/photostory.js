const express = require("express");
const router = new express.Router();
const PhotoStory = require("../models/photostories");
const upload = require('../middleware/upload');
const fs = require('fs');
const cors = require('cors');
const { protect } = require("../middleware/authMiddleware");

router.use(cors());
router.use('/uploads', express.static('uploads'));
//  add data
router.post("/photostory", protect, upload.array('files', 9), async(req, res) => {
   const { headline, slug, category, tags, summary, pagetitle, metatitle, metakeyword, metadescription, courtesy, title, description } = req.body; 
    try {
        //console.log("Received files:", req.files); 
        const courtesyArray = Array.isArray(courtesy) ? courtesy : [courtesy];
        const titleArray = Array.isArray(title) ? title : [title];
        const descriptionArray = Array.isArray(description) ? description : [description];

        const files = req.files.map((file, index ) => ({
            filename: file.filename,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
            courtesy: courtesyArray[index],
            title: titleArray[index],
            description: descriptionArray[index],
        }));
        const file = new PhotoStory({
            headline: headline,
            slug: slug,
            category: category,
            tags: tags,
            summary: summary,
            pagetitle: pagetitle,
            metatitle: metatitle,
            metakeyword: metakeyword,
            metadescription: metadescription,
            files
        });
        await file.save();
        console.log('alll data post', file);
        res.status(201).json({
            message: 'Photo Story created successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
}) 
//  get data
router.get("/photostory", async(req, res) => {
   try{
      const storyData = await PhotoStory.find();
      res.send(storyData);
   }catch(err){
       res.status(400).send(err);
   }
})
//  get by id data
router.get("/photostory/:id", async(req, res) => {
   try{
      const _id = req.params.id;
      const singleStory = await PhotoStory.findById(_id);
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
router.patch("/photostory/:id", protect, upload.array("files", 9), async (req, res) => {
    const { id } = req.params;
    const { headline, slug, category, tags, summary, pagetitle, metatitle, metakeyword, metadescription, 
        courtesy, title, description, updatedFiles, removeFiles } = req.body;

    try {
        let photoStory = await PhotoStory.findById(id);
        if (!photoStory) {
            return res.status(404).json({ message: "Photo Story not found" });
        }

        // Update text fields if provided
        if (headline) photoStory.headline = headline;
        if (slug) photoStory.slug = slug;
        if (category) photoStory.category = category;
        if (tags) photoStory.tags = tags;
        if (summary) photoStory.summary = summary;
        if (pagetitle) photoStory.pagetitle = pagetitle;
        if (metatitle) photoStory.metatitle = metatitle;
        if (metakeyword) photoStory.metakeyword = metakeyword;
        if (metadescription) photoStory.metadescription = metadescription;

        // Ensure files field exists
        if (!photoStory.files) {
            photoStory.files = [];
        }

        // Remove specific files if requested
        if (removeFiles) {
            const filesToRemove = Array.isArray(removeFiles) ? removeFiles : [removeFiles];

            // Filter out files to be removed
            photoStory.files = photoStory.files.filter(file => {
                if (filesToRemove.includes(file.filename)) {
                    // Delete file from the server
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                    return false; // Exclude from updated array
                }
                return true;
            });
        }

        if (updatedFiles) {
            const updatedFilesArray = JSON.parse(updatedFiles); // Ensure it's an array

            updatedFilesArray.forEach(updatedFile => {
                const fileIndex = photoStory.files.findIndex(f => f._id.toString() === updatedFile._id);
                if (fileIndex !== -1) {
                    // Update only the fields that were provided in the request
                    if (updatedFile.courtesy) photoStory.files[fileIndex].courtesy = updatedFile.courtesy;
                    if (updatedFile.title) photoStory.files[fileIndex].title = updatedFile.title;
                    if (updatedFile.description) photoStory.files[fileIndex].description = updatedFile.description;
                }
            });
        }

        // Handle new file uploads
        if (req.files && req.files.length > 0) {
            const courtesyArray = Array.isArray(courtesy) ? courtesy : [courtesy];
            const titleArray = Array.isArray(title) ? title : [title];
            const descriptionArray = Array.isArray(description) ? description : [description];

            const newFiles = req.files.map((file, index) => ({
                filename: file.filename,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype,
                courtesy: courtesyArray[index] || "",
                title: titleArray[index] || "",
                description: descriptionArray[index] || "",
            }));

            // Append new files to existing ones
            photoStory.files.push(...newFiles);
        }

        // Save updated PhotoStory
        await photoStory.save();

        console.log('Updated data:', photoStory);
        res.status(200).json({
            message: "Photo Story updated successfully",
            photoStory
        });

    } catch (err) {
        console.error("Error updating Photo Story:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});
// delete story
router.delete("/photostory/:id", protect, async(req, res) => {
   try{
      const _id = req.params.id;
      const storyId = await PhotoStory.findByIdAndDelete(_id);
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