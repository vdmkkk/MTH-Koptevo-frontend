import { useState, useEffect } from "react";
import './Notes.scss'
import close from '../../assets/icons/Arrow-1.svg'
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router"

function Notes({open, setOpen, mode}) {
    const [note, setnote] = useState("");
    const [expectation, setExpectation] = useState("");
    const [reality, setReality] = useState("");
    const [cookies, setCookie] = useCookies(["JWT"]);
    const [guest, setGuest] = useState(false); // кент не регнут
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.JWT == null) {
            setGuest(true)
        }
    }, [])
    return(
        <div className="overlay" style={{"display": open ? "block" : "none"}}>
            {guest ? 
            <div className={open ? "notes notes-open" : "notes notes-closed"}>
                <div onClick={() => setOpen(false)} className="close"><img src={close} style={{"transform": "rotate(180deg)"}}/></div>
                <h1>Бро регнись</h1>
                <button onClick={() => {navigate('/login')}}>Вход</button>
            </div>
            : // зареган
            <div className={open ? "notes notes-open" : "notes notes-closed"}>
                <div>
                    <div onClick={() => setOpen(false)} className="close"><img src={close} style={{"transform": "rotate(180deg)"}}/></div>
                    <h1>Заметки</h1>
                </div>
                
                <textarea/> 
                <h1>Ожидания</h1>
                <textarea/> 
                <h1>Впечатления</h1>
                <textarea/> 
            </div> }
        </div>
        
    )
}

export default Notes;