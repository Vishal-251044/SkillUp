import express from "express";
import { removeCourse } from "../controllers/RemoveCourseController.js";

const router = express.Router();

router.delete("/courses/:courseId", removeCourse);

export default router;
