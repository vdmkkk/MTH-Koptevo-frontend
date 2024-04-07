import '../../styles/layout.css';
import Logo_russpass from '../../assets/icons/Logo_russpass.svg'
import Separator from '../../assets/icons/Selector.svg'
import LogoRussia from '../../assets/icons/Logo-russia.svg'
import arrow from '../../assets/icons/arrow-down.svg'
import burgerMenu from '../../assets/icons/burger-menu.svg'
import bonus from '../../assets/icons/Bonus-icon.svg'
import mosturizm from '../../assets/icons/Mosturizm.svg'
import heart from '../../assets/icons/heart.svg'
import userIcon from '../../assets/icons/user-01.svg'
import flag from '../../assets/icons/Flags.svg'
import {useNavigate} from "react-router"
import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';
import axios from 'axios';



function checkCookie(navigate, cookies) {
  if (cookies.JWT == null) {
    navigate('/login')
  } else navigate(`/profile/${cookies.JWT}`)
}



function Layout() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["JWT"]);
  const [user, setUser] = useState("Войти")

  useEffect(() => {
    if (cookies.JWT != null) {
      axios.get(`${process.env.REACT_APP_ZAMAN_API}/user/properties?id=${cookies.JWT}`).then(res => {
        setUser(res.data["login"]);
      })
    }
  }, [])
  
  return (
    <div className="layout-header">
      <div className='header-content'>
      <div className='left-half'>
        <div className='left-part-header'>
          <img src={Logo_russpass} className='icons' style={{cursor:"pointer"}} onClick={() => navigate('/')}></img>
          <img src={Separator} style={{height:"28px"}}></img>
          <img src={LogoRussia} className='logo-rus' style={{cursor:"pointer"}}></img>
          <img src={arrow} style={{marginLeft:"8px", cursor:"pointer"}}  className='icons'></img>
        </div>
        
        <div className='centre-part-header'>
          <div style={{display:"flex", alignItems:"center", gap:"8px", cursor:"pointer"}}>
            <img src={burgerMenu} className='icons'></img>
            <p>Меню</p>
          </div>
          <div  style={{display:"flex", alignItems:"center", gap:"8px", cursor:"pointer"}}>
            <img src={bonus} className='icons'></img>
            <p>Бонусы</p>
          </div>
        </div>
      </div>

      <div className='right-part-header'>
        <div style={{display:"flex", alignItems:"center", gap:"8px", cursor:"pointer"}}>
          <img src={mosturizm} className='icons'></img>
          <p>Проекты Мостуризма</p>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"8px", cursor:"pointer"}}>
          <img src={heart} className='icons'></img>
          <p>Мои планы</p>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"8px", cursor:"pointer"}} onClick={() => checkCookie(navigate, cookies)}>
          <img src={userIcon} className='icons'></img>
          <p>{user}</p>
        </div>
        <img src={flag} className='icons' style={{cursor:"pointer"}}></img>
      </div>
      </div>
    </div>
  );
}

export default Layout;
