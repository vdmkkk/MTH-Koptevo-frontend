import {useNavigate} from "react-router"

function CheckinUsed() {
    const navigate = useNavigate();
    return(
        <div>
            <img></img>
            <h1>Вы уже получили баллы за посещение этого места!</h1>
            <div onClick={() => navigate('/')}>
                <p>На главную</p>
            </div>
        </div>
    )
}

export default CheckinUsed;