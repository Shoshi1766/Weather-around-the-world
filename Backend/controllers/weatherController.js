import { getTodayWeather } from "../api/requests.js";

export const getWeather = async (req, res) => {
    const { city } = req.params;

    async function getTemperatureAtRelativeHours(data, currentTime, hoursBack = 3) {
        const [currentHour, currentMinute] = currentTime.split(':').map(Number);
        const hourlyData = data.forecast.forecastday[0].hour;

        const tempData = [];

        for (let i = hoursBack; i > 0; i--) {
            let targetHour = currentHour - i;
            const targetHourFormatted = targetHour.toString().padStart(2, '0');
            const targetTimeString = `${targetHourFormatted}:00`;

            const hourData = hourlyData.find(h => h.time.includes(`${targetHourFormatted}:00`));
            if (hourData) {
                tempData.push({ time: targetTimeString, temp_c: hourData.temp_c });
            }
        }

        const currentHourFormatted = currentHour.toString().padStart(2, '0');
        const currentTimeString = `${currentHourFormatted}:00`;
        const currentData = hourlyData.find(h => h.time.includes(currentTimeString));
        if (currentData) {
            tempData.push({ time: currentTimeString, temp_c: currentData.temp_c });
        }

        let targetHour = currentHour + 1;

        const targetHourFormatted = targetHour.toString().padStart(2, '0');
        const targetTimeString = `${targetHourFormatted}:00`;

        const hourData = hourlyData.find(h => h.time.includes(`${targetHourFormatted}:00`));
        if (hourData) {
            tempData.push({ time: targetTimeString, temp_c: hourData.temp_c });
        }


        return tempData;
    }
    try {
        const response = await getTodayWeather(city);
        if (response && !response.data)
            return res.status(400).json({
                title: "Bad Request",
                message: "There is no such city, please try typing again. ",
            });
        const filterWeather = {
            city: response.data.location.name,
            country: response.data.location.country,
            date: response.data.location.localtime.split(" ")[0], // YYYY-MM-DD
            time: response.data.location.localtime.split(" ")[1], // HH:MM
            temperature_c: response.data.current.temp_c,
            accure_date: response.data.current.last_updated.split(" ")[0],
            accure_time: response.data.current.last_updated.split(" ")[1],
            condition: response.data.current.condition.text, // כמו "Sunny"
            precipitation_mm: response.data.current.precip_mm,
            humidity: `${response.data.current.humidity}%`,
            wind_kph: response.data.current.wind_kph,
            latitude: response.data.location.lat,
            longitude: response.data.location.lon,
            temp_per_hours: [],
        };
        const tempData = await getTemperatureAtRelativeHours(
            response.data,
            response.data.location.localtime.split(" ")[1],
        );


        filterWeather.temp_per_hours = tempData;
        res.json(filterWeather);
    }
    catch (error) {
        return res.status(400).json({
            title: "Bad Request",
            message: error.message,
        });
    }


};
export const getWeatherWithoutCity = async (req, res) => {
    return res.status(400).json({
        title: "Bad Request",
        message: "City name is required.",
    });
}

