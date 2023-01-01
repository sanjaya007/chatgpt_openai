import express from "express";
import { getData, postData } from "./controllers/controller.js";

const router = express.Router();

// get
router.get("/", getData);

// post
router.post("/", postData);

export default router;
