const express = require("express");

const router = express.Router();

const { getVideoContents, getVideoContent, createVideoContent, updateVideoContent, deleteVideoContent } = require("../controllers/videoContentController")

router.route("/").get(getVideoContents).post(createVideoContent);

router.route("/:id").get(getVideoContent).put(updateVideoContent);

router.route("/:id").delete(deleteVideoContent);

module.exports = router;
