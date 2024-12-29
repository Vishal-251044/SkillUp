import express from "express";
import { fetchUserCourses } from "../controllers/profileUpdateController.js";

const router = express.Router();

router.get("/purchased-courses/:email", fetchUserCourses);

export default router;
