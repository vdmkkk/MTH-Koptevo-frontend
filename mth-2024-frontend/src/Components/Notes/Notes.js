import { useState, useEffect } from "react";
import './Notes.scss'
import close from '../../assets/icons/close.svg'
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
                    <div onClick={() => setOpen(false)} className="close">
                        <h1>Заметки</h1>
                        <img src={close} style={{"transform": "rotate(180deg)"}}/>
                        </div>
                    
                </div>
                
                <textarea></textarea>
                <h1 style={{textAlign:"left", fontWeight:"500", marginLeft:"36px"}}>Ожидания</h1>
                <textarea></textarea>
                <h1 style={{textAlign:"left", fontWeight:"500", marginLeft:"36px"}}>Впечатления</h1>
                <textarea></textarea> 
            </div> }
        </div>
        
    )
}

export default Notes;