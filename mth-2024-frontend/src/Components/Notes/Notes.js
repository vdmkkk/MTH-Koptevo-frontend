import { useState, useEffect } from "react";
import './Notes.scss'
import close from '../../assets/icons/close.svg'
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router"
import axios from "axios";
import lock from "../../assets/icons/lock.svg"

function Notes({open, setOpen, placeId}) {
    const [note, setNote] = useState("");
    const [expectation, setExpectation] = useState("");
    const [reality, setReality] = useState("");
    const [cookies, setCookie] = useCookies(["JWT"]);
    const [guest, setGuest] = useState(false); // кент не регнут
    const [isLocked, setIsLocked] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const navigate = useNavigate();

    const getNote = async () =>  {
        await axios.get(`${process.env.REACT_APP_ZAMAN_API}/note/by_user_and_place_ids?user_id=${cookies.JWT}&place_id=${placeId}`).then(res => {
            if (res.data["properties"]) {
                console.log(res.data)
                setNote(res.data["properties"]["note"]);
                setExpectation(res.data["properties"]["expectation"]);
                setReality(res.data["properties"]["reality"]);
                if (res.data["is_check_in"]) setIsLocked(true);
                else setIsLocked(false);
                setIsNew(false);
            } else {
                setIsLocked(false);
                setIsNew(true);
            }
        })

    }

    useEffect(() => {
        getNote();
    }, [])

    useEffect(() => {
        if (cookies.JWT == null) {
            setGuest(true)
        }
    }, [])

    const handleExit = async () => {
        const data = {
            "place_id": parseInt(placeId),
            "user_id": parseInt(cookies.JWT),
            "properties": {
                "note": note,
                "expectation": expectation,
                "reality": reality
            }
        };
        if (isNew)
        await axios.post(`${process.env.REACT_APP_ZAMAN_API}/note/create`, data).then(res => {
            if (res.status != 200) {
                console.log('unlucko');
            }
        })
        else await axios.put(`${process.env.REACT_APP_ZAMAN_API}/note/update`, data).then(res => {
            if (res.status != 200) {
                console.log('unlucko');
            }
        })
        setOpen(false);
    }

    const handleNote = (e) => {
        setNote(e.target.value);
    }

    const handleExpectation = (e) => {
        setExpectation(e.target.value);
    }

    const handleReality = (e) => {
        setReality(e.target.value);
    }
    return(
        <div className="overlay" style={{"display": open ? "block" : "none"}}>
            {guest ? 
            <div className={open ? "notes notes-open" : "notes notes-closed"}>
                <div onClick={() => setOpen(false)} className="close"><img src={close} style={{"transform": "rotate(180deg)"}}/></div>
                <h1>Пожалуйста, зарегестрируйтесь, чтобы оставлять заметки о местах</h1>
                <button onClick={() => {navigate('/login')}}>Вход</button>
            </div>
            : // зареган
            <div className={open ? "notes notes-open" : "notes notes-closed"}>
                <div>
                    <div onClick={() => handleExit()} className="close">
                        <h1>Заметки</h1>
                        <img src={close} style={{"transform": "rotate(180deg)"}}/>
                        </div>
                    
                </div>
                
                <textarea value={note} onChange={(e) => handleNote(e)}></textarea>
                {(isLocked) ? 
                <div style={{position:"relative"}}>
                    <img src={lock} style={{position:"absolute", top:"60%", left:"50%", transform:"translate(-50%, -50%)"}}></img>
                    <h1 style={{textAlign:"left", fontWeight:"500", marginLeft:"36px", color: isLocked ? "#ccc" : "#000"}}>Ожидания</h1>
                    <textarea disabled={isLocked} value={expectation} onChange={(e) => handleExpectation(e)}></textarea>
                </div> : 
                <div>
                    <h1 style={{textAlign:"left", fontWeight:"500", marginLeft:"36px", color: isLocked ? "#ccc" : "#000"}}>Ожидания</h1>
                    <textarea disabled={isLocked} value={expectation} onChange={(e) => handleExpectation(e)}></textarea>
                </div> 
                }
                
                {(isLocked) ? 
                <div>
                    <h1 style={{textAlign:"left", fontWeight:"500", marginLeft:"36px", color: isLocked ? "#000" : "#ccc"}}>Впечатления</h1>
                    <textarea disabled={!isLocked} value={reality} onChange={(e) => handleReality(e)}></textarea> 
                </div> :
                <div style={{position:"relative"}}>
                    <img src={lock} style={{position:"absolute", top:"60%", left:"50%", transform:"translate(-50%, -50%)"}}></img>
                    <h1 style={{textAlign:"left", fontWeight:"500", marginLeft:"36px", color: isLocked ? "#fff" : "#ccc"}}>Впечатления</h1>
                    <textarea disabled={!isLocked} value={reality} onChange={(e) => handleReality(e)}></textarea> 
                </div>
                }

                
                
            </div> }
        </div>
        
    )
}

export default Notes;