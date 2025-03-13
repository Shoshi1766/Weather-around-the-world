import express from "express";
import { config } from "dotenv";
import cors from "cors";
import weatherRoute from "./routes/weatherRoute.js";


config();

const weatherApp  = express();
weatherApp .use(cors());
weatherApp .use(express.json());
weatherApp .use("/api/weather",weatherRoute);


weatherApp .listen(process.env.PORT, "localhost", () => {
});