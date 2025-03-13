import https from "https";
import axios from "axios";

export const getTodayWeather = async (city) => {
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        let res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.KEY_WEATHER_API}&q=${city}&days=1`, { httpsAgent: agent });
        return res;

    }
    catch (error) {
        return "Error! cannot connect to weather API: " + error;
    }
}
