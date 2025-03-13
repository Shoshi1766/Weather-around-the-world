import { createContext, useContext, useState } from "react";

const LatAndLonContext = createContext();

export const LatAndLonProvider = ({ children}) => {
    const [latAndLonDetails, setLatAndLonDetails] = useState({});
    const updateLatAndLon = (detailsFromServer) => {
        setLatAndLonDetails(detailsFromServer);
    }
    return(
        <LatAndLonContext.Provider value={{latAndLonDetails, updateLatAndLon}}>
            {children}
        </LatAndLonContext.Provider>
    )
}

export const uselatAndLonDetails=()=> useContext(LatAndLonContext);