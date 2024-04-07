import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router"

const CIPHER_KEY="sudhsaduhjasudjasiduasdas"
function vernamCipher(message, key) {
    if (message.length > key.length) {
        throw new Error(`The message must not be longer than the key. Message: ${message}`);
    }

    let result = '';
    for (let i = 0; i < message.length; i++) {
        // Convert characters to their char codes, XOR them, then convert back to a character
        const charCode = message.charCodeAt(i) ^ key.charCodeAt(i);
        result += String.fromCharCode(charCode);
    }

    return result;
}



function Checkin() {
    const [cookies, setCookie] = useCookies(["JWT"]);
    const navigate = useNavigate();
    const cipher  = useParams()["cipher"];
    // useEffect(() => {
        if (cookies.JWT)
        axios.post(`${process.env.REACT_APP_ZAMAN_API}/user/check_in?cipher=${cipher}&user_id=${cookies.JWT}`).then(res => {
            if (res.status == 200) if (typeof(res.data) == 'string') navigate(`/checkin/show/${res.data}`);
            else {navigate(`/checkin/used`)};
        }); else navigate("/login")
    // }, [])
    return(
        <div>
        </div>
    )
}

export default Checkin;