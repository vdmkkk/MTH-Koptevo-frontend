import { useState, useEffect } from "react";
import './Companions.scss'
import close from '../../assets/icons/Arrow-1.svg'
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router"
import { PrimeReactProvider } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import axios from "axios";

function formatDate(date) {
    // Get the day and month from the date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
  
    // Format day and month to ensure they are two digits
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
  
    // Construct and return the formatted date string
    return `${formattedDay}.${formattedMonth}`;
  }

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
    const [tableId, setTableId] = useState(-1);
    const [dateFrom, setDateFrom] = useState(-1);
    const [dateTo, setDateTo] = useState(-1);
    const [login, setLogin] = useState("");

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

    const getCompanions = async (date1, date2) => {
        const data = {
            "date_from": date1,
            "date_to": date2,
            "entity_id": parseInt(placeId),
            "page": 0
        }
        await axios.put(`${process.env.REACT_APP_ZAMAN_API}/companions/get_by_${mode}`, data).then(res => {
            if (res.data == null) setCompanions([]);
            else setCompanions(res.data);
        })
    }

    const handleLogOut = async () => {
        await axios.delete(`${process.env.REACT_APP_ZAMAN_API}/companions/${mode}?id=${tableId}`);
        setCompanions(null);
        setParticipating(false);
    }

    const amICompanion = async () => {
        const data = {
            "date_from": new Date(1000, 0, 1, 0, 0, 0).toJSON(),
            "date_to": new Date(5000, 0, 1, 0, 0, 0).toJSON(),
            "entity_id": parseInt(placeId),
            "page": 0
        }
        await axios.put(`${process.env.REACT_APP_ZAMAN_API}/companions/get_by_${mode}`, data).then(res => {
            if (res.data == null) {
                setParticipating(false);
                setCompanions([]);
            } else {
                if (res.data.filter(obj => obj["user_id"] == cookies.JWT).length > 0) {
                    getCompanions(res.data.filter(obj => obj["user_id"] == cookies.JWT)[0]["date_from"], res.data.filter(obj => obj["user_id"] == cookies.JWT)[0]["date_to"])
                    setParticipating(true);
                    setTableId(res.data.filter(obj => obj["user_id"] == cookies.JWT)[0]["id"]);
                    setDateFrom(res.data.filter(obj => obj["user_id"] == cookies.JWT)[0]["date_from"]);
                    setDateTo(res.data.filter(obj => obj["user_id"] == cookies.JWT)[0]["date_to"]);
                    axios.get(`${process.env.REACT_APP_ZAMAN_API}/user/properties?id=${res.data.filter(obj => obj["user_id"] == cookies.JWT)[0]["id"]}`).then((res) => {
                        setLogin(res.data["login"])
                    })
                }
                setCompanions(res.data);
            }
            
        })
    }

    const register = async () => {
        const data = {
            "date_from": new Date(dates[0]).toJSON(),
            "date_to": new Date(dates[1]).toJSON(),
            "place_id": parseInt(placeId),
            "user_id": parseInt(cookies.JWT)
        }
        await axios.post(`${process.env.REACT_APP_ZAMAN_API}/companions/create_${mode}_companion`, data).then(res => {
            if (res.status == 200) {
                amICompanion();
            }
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
                {participating ? companions ? (companions.length > 0 ? 
                <div>
                <p>Ищем с {formatDate(new Date(dateFrom))} по {formatDate(new Date(dateTo))}</p>
                <button onClick={() => {handleLogOut()}}>перестать поиск</button>
                {companions.map(user => {
                    if (user["id"] !== tableId)
                    return(
                    <div onClick={() => {navigate(`/profile/${user["user_id"]}`)}} className="comp-user"> 
                        <div className="comp-info">
                            <img src={user["user_properties"]["photo"]}/>
                            <div>
                                <p>{login}</p>
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
                })}
                </div>
                : <p>Никого не нашли :(</p>) : <></> : 
                <div>
                    <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                    <button className="comp-button" disabled={!seeActive} onClick={() => register()}/>
                </div> }
            </div> }
        </div>
        </PrimeReactProvider>
        
    )
}

export default Companions;