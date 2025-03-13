import { uselatAndLonDetails } from "../context/latLonContext";
import '../styles/LatAndLonDetails.css';

const LatAndLonDetails = () => {
    const { latAndLonDetails } = uselatAndLonDetails();
    return (
        <>
            {Object.keys(latAndLonDetails).length !== 0 ?
                <div className="small_details">
                    <div className="lat_lon">
                        <p className="lan lat">latitude: {latAndLonDetails.lat}</p>
                        <p className="lan lon">longitude: {latAndLonDetails.lon}</p>
                    </div>
                    <p className="time">{latAndLonDetails.time}</p>
                </div> : <p></p>}
        </>
    )
};
export default LatAndLonDetails;