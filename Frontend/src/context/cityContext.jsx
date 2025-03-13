import { createContext, useContext, useState } from "react";

const CityContext = createContext();

export const CityProvider = ({ children}) => {
    const [city, setCity] = useState("");
    const updateCity = (newCity) => {
        setCity(newCity);
    }
    return(
        <CityContext.Provider value={{city, updateCity}}>
            {children}
        </CityContext.Provider>
    )
}

export const useCity=()=> useContext(CityContext);