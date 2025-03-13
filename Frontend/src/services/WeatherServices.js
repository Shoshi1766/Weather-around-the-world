import axios from "axios"

export const weatherFromApi=(city)=>{
    return axios.get(`http://localhost:8080/api/weather/${city}`);
}