import { useState, useEffect } from "react";
import { useCity } from "../context/cityContext";
import { uselatAndLonDetails } from "../context/latLonContext";
import { weatherFromApi } from "../services/WeatherServices";
import '../styles/WeatherSide.css';

const WeatherSide = () => {

    const [error, setError] = useState("No data is available ,please select a city to view the relevant data.");
    const [weatherDetails, setWeatherDetails] = useState({});
    const { city } = useCity();
    const { updateLatAndLon } = uselatAndLonDetails();

    const bringFromServer = async () => {

        try {
            const res = await weatherFromApi(city);
            setWeatherDetails(res.data);
            console.log(res.data);
            updateLatAndLon({
                lat: res.data.latitude,
                lon: res.data.longitude,
                time: `accurate to ${res.data.date} at ${res.data.time}`
            });
            setError("");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unable to fetch weather data. Please try again later.");
            }
        }
    };

    useEffect(() => {
        if (city)
            bringFromServer();
    }, [city]);

    return (
        <> <div className="weather_side" aria-live="polite">
            {!error ? <div className="inner_weather_side">
                <h2 className="city">{weatherDetails.city} </h2>
                <p className="country white_grey">{weatherDetails.country}</p>
                <p className="date white_grey">{weatherDetails.accure_date} at {weatherDetails.accure_time}</p>
                <div className="temp_con">
                    <p className="temperature">{weatherDetails.temperature_c}°</p>
                    <p className="condition">{weatherDetails.condition}</p>
                </div>
                <div className="weather_details weather_details_title white_grey">
                    <p className="det">Precipitation:</p>
                    <p className="det">Humidity:</p>
                    <p className="det">Wind:</p>
                </div>
                <div className="weather_details weather_details_data">
                    <p className="det">{weatherDetails.precipitation_mm} mm</p>
                    <p className="det">{weatherDetails.humidity}</p>
                    <p className="det">{weatherDetails.wind_kph} km/h</p>
                </div>

                <div className="weather_details weather_time weather_time_title white_grey">
                    {weatherDetails.temp_per_hours.map((hourData) => (
                        <p key={hourData.time} className="det">{hourData.time}:</p>
                    ))}
                </div>
                <div className="weather_details weather_details_data">
                    {weatherDetails.temp_per_hours.map((hourData) => (
                        <p key={hourData.time} className="det">{hourData.temp_c}°</p>
                    ))}
                </div>
            </div> : <p className="p_no_weather" role="alert">{error}</p>}
        </div>
        </>

    )


}
export default WeatherSide;