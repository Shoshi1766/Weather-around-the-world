import { useState } from "react";
import { useCity } from "../context/cityContext";

const InputCity = () => {

    const [cityInp, setCityInp] = useState("");
    const [errorM, setErrorM] = useState("");

    const { updateCity } = useCity();
    function validateCityName(city) {
        if (!city) {
            return { isValid: false, message: "City name is required." };
        }

        if (city.length < 2) {
            return { isValid: false, message: "City name must be at least 2 characters long." };
        }

        if (city.length > 50) {
            return { isValid: false, message: "City name must be less than 50 characters." };
        }

        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(city)) {
            return { isValid: false, message: "City name must contain only letters and spaces." };
        }

             return { isValid: true, message: "City is valid." };
;
    }


    const bringDetailsOfCity = () => {
        let valid = validateCityName(cityInp);
        if (valid.isValid) {
            updateCity(cityInp); 
            setErrorM(""); 
        }
        else
            setErrorM(valid.message);
    }
    return (
        <>
            <label className="label_city_name">City name</label>
            <div className="input_and_button">
                <input type="text" value={cityInp} onChange={(e) => { setCityInp(e.target.value) }} className='input' />
                <input type="button" value={"Check"} onClick={bringDetailsOfCity} className="button" />
            </div>
            <p className="error" role="alert" >{errorM}</p>
        </>
    )
}
export default InputCity;