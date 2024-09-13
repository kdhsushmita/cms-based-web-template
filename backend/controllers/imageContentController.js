const path = require('path');
const multer = require('multer');
const ImageContent = require('../models/imageContentModel');

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define where to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
    }
});

const upload = multer({ storage });

// Middleware to handle image uploads
const uploadImage = upload.single('image');

// Get all image contents
const getImageContents = async (req, res) => {
    try {
        const imageContents = await ImageContent.find();
        res.status(200).json(imageContents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new image content
const createImageContent = async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) {
            res.status(400).json({ message: 'Error uploading file' });
            return;
        }

        const { title, description } = req.body;
        if (!title || !description || !req.file) {
            res.status(400).json({ message: "All fields are mandatory" });
            return;
        }

        try {
            const newImageContent = await ImageContent.create({
                title,
                description,
                image: req.file.path // Store the path to the uploaded image
            });
            res.status(201).json(newImageContent);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Get a single image content by ID
const getImageContent = async (req, res) => {
    try {
        const imageContent = await ImageContent.findById(req.params.id);
        if (!imageContent) {
            res.status(404).json({ message: "ImageContent not found!" });
            return;
        }
        res.status(200).json(imageContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update image content by ID
const updateImageContent = async (req, res) => {
    try {
        const imageContent = await ImageContent.findById(req.params.id);
        if (!imageContent) {
            res.status(404).json({ message: "ImageContent not found!" });
            return;
        }

        const updatedImageContent = await ImageContent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedImageContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete image content by ID
const deleteImageContent = async (req, res) => {
    try {
        const imageContent = await ImageContent.findById(req.params.id);
        if (!imageContent) {
            res.status(404).json({ message: "ImageContent not found!" });
            return;
        }
        await ImageContent.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'ImageContent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getImageContents, getImageContent, createImageContent, updateImageContent, deleteImageContent };
