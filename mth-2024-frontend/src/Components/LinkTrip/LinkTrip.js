import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import close from '../../assets/icons/close.svg'
import axios from "axios";
import { PrimeReactProvider } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import Dropdown from "../reusable/dropdown";
import './LinkTrip.scss'

function getDateIntervalLength(jsonDate1, jsonDate2) {
    const dateStr1 = jsonDate1;
    const dateStr2 = jsonDate2;
  
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
  
    const normalizedDate1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const normalizedDate2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
    const diffInMilliseconds = Math.abs(normalizedDate2 - normalizedDate1);
  
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  
    return Math.ceil(diffInDays) + 1; // +1 to include both the start and end dates in the interval
  }

function LinkTrip({open, setOpen, mode, entityId}) {
    const [cookies, setCookie] = useCookies(["JWT"]);
    const [guest, setGuest] = useState(false)
    const [labels, setLabels] = useState([]);
    const [trip, setTrip] = useState(null);
    const [trips, setTrips] = useState([]);
    const [date, setDate] = useState(null);
    useEffect(() => {
        if (cookies.JWT) setGuest(false);
        else setGuest(true);
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ZAMAN_API}/trip/by_user_id?id=${cookies.JWT}`).then(res => {
            setTrips(res.data);
            setLabels(res.data.map((obj) => {return {id: obj["id"], label: obj["properties"]["name"]}}));
            console.log('.', res.data)
        })
    }, [])

    function handleAdd() {
        const data = {
            "entity_id": parseInt(entityId),
            "trip_id": parseInt(trip.id),
            "day": date ?  getDateIntervalLength(trips.filter(obj => obj["id"] == trip.id)[0]["date_start"], new Date(date).toJSON()) : 0,
            "position": 0
        }
        console.log("wtf", data);
        axios.put(`${process.env.REACT_APP_ZAMAN_API}/trip/${mode}/add`, data);
        setOpen(false);
    }
    return(
        <div className="overlay" style={{"display": open ? "block" : "none"}}>
            <div className="linkTrip">
                
                {guest ? 
                <div>
                    <p>Чтобы добавить место в поездку, нужно зарегистрироваться</p>
                </div>
                :
                <div>
                    <Dropdown id={0} labels={labels} label={"Выберите поездку"} selectedOption={trip} setSelectedOption={setTrip} width={"200px"}/>
                    {trip ? 
                    <div style={{backgroundColor:"var(--gray-f5)", width:"100%", height:"fit-content"}}>
                    <Calendar value={date} onChange={(e) => setDate(e.value)} minDate={new Date(trips.filter(obj => obj["id"] == trip.id)[0]["date_start"])} maxDate={new Date(trips.filter(obj => obj["id"] == trip.id)[0]["date_end"])} /> 
                    </div>
                    : <></>}
                </div>
                }
                <div className="button"> <p onClick={() => handleAdd()}>Добавить в поездку</p></div>
                <img onClick={() => setOpen(false)} src={close} style={{cursor:"pointer", width:"20px", marginTop:"15px"}}/>
            </div>
        </div>
    )
}

export default LinkTrip;