import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send("VIDEOS"));
videoRouter.get(routes.upload, (req, res) => res.send("UPLOAD"));
videoRouter.get(routes.videoDetail, (req, res) => res.send("VIDEO_DETAIL"));
videoRouter.get(routes.editVideo, (req, res) => res.send("EDIT_VIDEO"));
videoRouter.get(routes.deleteVideo, (req, res) => res.send("DELETE_VIDEO"));

export default videoRouter;