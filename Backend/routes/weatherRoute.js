import express from "express";
import { getWeather,getWeatherWithoutCity } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/:city", getWeather);
router.get("/", getWeatherWithoutCity);

export default router;
