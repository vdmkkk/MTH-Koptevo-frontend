import { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import {Navigate} from 'react-router-dom';
import loginPhoto from "../../assets/img/login.jpg"
import Layout from "../../Components/reusable/layout";
import Footer from "../../Components/reusable/footer";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errUser, setErrUser] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errBelow, setErrBelow] = useState("");

    const [cookies, setCookie] = useCookies(["JWT"]); // как я понял, указываем интересующие нас куки (?)
    const [redirect, setRedirect] = useState(false);
    const [guest, setGuest] = useState(true);

    useEffect(() => {
        if (cookies.JWT != null) {
            setGuest(false);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // чтоб форма не сбросилась к хуям в теории
        if (username == '') setErrUser("Это обязательное поле!");
        if (password == '') setErrPassword("Это обязательное поле!");
        if (username != "" && password != "") {
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            let data = {
                login: username,
                password: password
            };

            await axios.put('http://217.18.63.245:8080/user/login', data, { headers })
            .then(response => {
                if (response.status == 200){
                    setCookie("JWT", response.data, {path: "/"});
                    setRedirect(true);
                }
            })
            .catch(error => {
                setErrBelow(`Ошибка: ${error}`)
                console.error(`Error: ${error}`);
            });
        }
    }

    function handleUsername(value) {
        setUsername(value);
        if (errUser != '') setErrUser("");
        if (errBelow != '') setErrBelow("");
    }

    function handlePassword(value) {
        setPassword(value);
        if (errPassword != '') setErrPassword("");
        if (errBelow != '') setErrBelow("");
    }

    return(
        <div className="App">
            <Layout/>
            {guest ? 
                <div>
                    {redirect && <Navigate replace to="/" />}
                    <h1>login</h1>
                    <input style={{"borderColor": errUser == "" ? "#aaa" : "#F00"}} value={username} onChange={(e) => handleUsername(e.target.value)}/>
                    <p style={{"display": errUser == "" ? "none" : "block"}}>{errUser}</p>
                    <input style={{"borderColor": errPassword == "" ? "#aaa" : "#F00"}} value={password} type="password" onChange={(e) => handlePassword(e.target.value)}/>
                    <p style={{"display": errPassword == "" ? "none" : "block"}}>{errPassword}</p>
                    <div style={{"height": 200}} />
                    <p style={{"display": errBelow == "" ? "none" : "block"}}>{errBelow}</p>
                    <button onClick={(e) => {handleSubmit(e)}}>Войти</button>
                </div>
            :
                // if user somehow accessed /login while already logged in
                <div>
                    <h1>Вы уже вошли в аккаунт!</h1>
                    <button onClick={() => {
                        setGuest(true);
                        setRedirect(true);
                    }}>На главную</button>
                </div>
            }
        <Footer/>
        </div>
    )
}

export default Login;