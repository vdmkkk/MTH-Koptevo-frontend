import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router"
import axios from "axios";

function CheckinFinal() {
    const navigate = useNavigate();
    const hash  = useParams()["hash"];
    const [mode, setMode] = useState();
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_ZAMAN_API}/user/validate?hash=${hash}`).then(res => {
            if (res.status == 200) setMode("success")
            if (res.status == 418) setMode("error")
        })
    }, [])
    return(
        <div>
            <img></img>
            <h1>{mode == "success" ? "Вы получили 20 бонусов за посещение" : "Эта ссылка уже была использована другим пользователем!"}</h1>
            <div onClick={() => navigate('/')}>
                <p>На главную</p>
            </div>
        </div>
    )
}

export default CheckinFinal;