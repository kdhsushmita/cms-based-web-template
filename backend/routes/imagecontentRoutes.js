const express = require("express");

const router = express.Router();

const { getImageContents, getImageContent, createImageContent, updateImageContent, deleteImageContent } = require("../controllers/imageContentController")

router.route("/").get(getImageContents).post(createImageContent);

router.route("/:id").get(getImageContent).put(updateImageContent);

router.route("/:id").delete(deleteImageContent);

module.exports = router;
