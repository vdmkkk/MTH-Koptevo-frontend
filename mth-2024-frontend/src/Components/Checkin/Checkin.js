import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Checkin() {
    const cipher  = useParams()["cipher"];
    useEffect(() => {
        axios.post(`http://0.0.0.0:8080/checkin?cipher=${cipher}&userId=1`);
    }, [])
    return(
        <div>
            <Navigate replace to="/checkin/show/123123123" />
            <h1>{cipher}</h1>
        </div>
    )
}

export default Checkin;