import express from "express";
import { contactUs, contactSlider, contactCard } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contactUs", contactUs);
router.post("/contactSlider", contactSlider);
router.post("/contactCard", contactCard);

export default router;