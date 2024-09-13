const path = require('path');
const multer = require('multer');
const VideoContent = require('../models/videoContentModel');

// Set up storage configuration for multer for videos
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'videos/'); // Define where to save video files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
    }
});

const uploadVideo = multer({ storage: videoStorage }).single('video');

// Get all video contents
const getVideoContents = async (req, res) => {
    try {
        const videoContents = await VideoContent.find();
        res.status(200).json(videoContents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new video content
const createVideoContent = async (req, res) => {
    uploadVideo(req, res, async (err) => {
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
            const newVideoContent = await VideoContent.create({
                title,
                description,
                video: req.file.path // Store the path to the uploaded video
            });
            res.status(201).json(newVideoContent);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Get a single video content by ID
const getVideoContent = async (req, res) => {
    try {
        const videoContent = await VideoContent.findById(req.params.id);
        if (!videoContent) {
            res.status(404).json({ message: "VideoContent not found!" });
            return;
        }
        res.status(200).json(videoContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update video content by ID
const updateVideoContent = async (req, res) => {
    try {
        const videoContent = await VideoContent.findById(req.params.id);
        if (!videoContent) {
            res.status(404).json({ message: "VideoContent not found!" });
            return;
        }

        const updatedVideoContent = await VideoContent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedVideoContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete video content by ID
const deleteVideoContent = async (req, res) => {
    try {
        const videoContent = await VideoContent.findById(req.params.id);
        if (!videoContent) {
            res.status(404).json({ message: "VideoContent not found!" });
            return;
        }
        await VideoContent.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'VideoContent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getVideoContents, getVideoContent, createVideoContent, updateVideoContent, deleteVideoContent };
