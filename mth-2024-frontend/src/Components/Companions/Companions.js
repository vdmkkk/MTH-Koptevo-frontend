import { useState, useEffect } from "react";
import './Companions.scss'
import close from '../../assets/icons/Arrow-1.svg'
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router"
import { PrimeReactProvider } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import axios from "axios";

function Companions({open, setOpen, mode, defaultDate, placeId}) {
    const [note, setnote] = useState("");
    const [expectation, setExpectation] = useState("");
    const [reality, setReality] = useState("");
    const [cookies, setCookie] = useCookies(["JWT"]);
    const [guest, setGuest] = useState(false); // кент не регнут
    const [dates, setDates] = useState([]);
    const [seeActive, setSeeActive] = useState(true);
    const [companions, setCompanions] = useState(null);
    const [participating, setParticipating] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.JWT == null) {
            setGuest(true)
        }
    }, [])

    useEffect(() => {
        if (dates[0] && dates[1]) setSeeActive(true);
        else setSeeActive(false)
    }, [dates])

    const getCompanions = async () => {
        const data = {
            "date_from": new Date(dates[0]).toJSON(),
            "date_to": new Date(dates[1]).toJSON(),
            "entity_id": parseInt(placeId),
            "page": 0
        }
        await axios.put(`${process.env.REACT_APP_ZAMAN_API}/companions/get_by_${mode}`, data).then(res => {
            console.log(`${process.env.REACT_APP_ZAMAN_API}/companions/get_by_${mode}`)
            console.log("bruh", res.data.filter(obj => obj["user_id"] == cookies.JWT))
            setCompanions(res.data);
            setParticipating(res.data.filter(obj => obj["user_id"] == cookies.JWT))
        })
    }

    const amICompanion = async () => {
        const data = {
            "date_from": new Date(1000, 0, 1, 0, 0, 0),
            "date_to": new Date(5000, 0, 1, 0, 0, 0),
            "entity_id": parseInt(placeId),
            "page": 0
        }
        await axios.put(`${process.env.REACT_APP_ZAMAN_API}/companions/get_by_${mode}`, data).then(res => {
            console.log("bruh", res.data.filter(obj => obj["user_id"] == cookies.JWT))
            setCompanions(res.data);
            setParticipating(res.data.filter(obj => obj["user_id"] == cookies.JWT))
        })
    }

    const register = async () => {
        const data = {
            "date_from": new Date(dates[0]).toJSON(),
            "date_to": new Date(dates[1]).toJSON(),
            "entity_id": parseInt(placeId),
            "user_id": cookies.JWT
        }
        await axios.post(`${process.env.REACT_APP_ZAMAN_API}/companions/create_${mode}_companion`).then(res => {
            console.log(res.data)
        })
    }

    useEffect(() => {
        amICompanion();
    }, [])
    return(
        <PrimeReactProvider>
        <div className="overlay" style={{"display": open ? "block" : "none"}}>
            {guest ? 
            <div className={open ? "notes notes-open" : "notes notes-closed"}>
                <div onClick={() => setOpen(false)} className="close"><img src={close} style={{"transform": "rotate(180deg)"}}/></div>
                <h1>Бро регнись</h1>
                <button onClick={() => {navigate('/login')}}>Вход</button>
            </div>
            : // зареган
            <div className={open ? "notes notes-open" : "notes notes-closed"}>
                <div onClick={() => setOpen(false)} className="close"><img src={close} style={{"transform": "rotate(180deg)"}}/></div>
                <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                <button className="comp-button" disabled={!seeActive} onClick={() => register()}/>
                {companions ? (companions.length > 0 ? companions.map(user => {
                    return(
                    <div onClick={() => {navigate(`/profile/${user["user_id"]}`)}} className="comp-user"> 
                        <div className="comp-info">
                            <img src={user["user_properties"]["photo"]}/>
                            <div>
                                <p>{user["user_properties"]["login"]}</p>
                                <p>из г. {user["user_properties"]["city"]}</p>
                                <p>{user["user_properties"]["form"]}</p>
                            </div>
                        </div>
                        <div>
                            {user["user_properties"]["tags"].map((tag) => {
                                return(
                                    <div><p>{tag}</p></div>
                                )
                            })}
                        </div>
                    </div>
                    )
                }) : <p>Никого не нашли :(</p>) : <></> }
            </div> }
        </div>
        </PrimeReactProvider>
        
    )
}

export default Companions;