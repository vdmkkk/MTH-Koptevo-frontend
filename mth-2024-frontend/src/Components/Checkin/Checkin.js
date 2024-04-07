import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router"


function Checkin() {
    const [cookies, setCookie] = useCookies(["JWT"]);
    const navigate = useNavigate();
    const cipher  = useParams()["cipher"];
    useEffect(() => {
        if (cookies.JWT)
        axios.post(`${process.env.REACT_APP_ZAMAN_API}/user/check_in?cipher=${cipher}&user_id=${cookies.JWT}`).then(res => {
            navigate(`/checkin/show${res.data}`)
        })
    }, [])
    return(
        <div>
        </div>
    )
}

export default Checkin;