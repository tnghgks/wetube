import express from "express";
import routes from "../routes";
import { uploadVideo, onlyPrivate } from "../middlewares";

import {
  videos,
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../controllers/videoController";

const videoRouter = express.Router();

// UPLOAD
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload,onlyPrivate, uploadVideo,postUpload);

//DELETE VIDEO
videoRouter.get(routes.deleteVideo(),onlyPrivate, deleteVideo);

// VIDEO DETAIL
videoRouter.get(routes.videoDetail(), videoDetail);

// EDIT VIDEO
videoRouter.get(routes.editVideo(),onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(),onlyPrivate, postEditVideo);



export default videoRouter;