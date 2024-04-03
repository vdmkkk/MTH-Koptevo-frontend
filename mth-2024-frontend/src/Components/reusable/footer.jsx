import '../../styles/Footer.css';
import rus from "../../assets/icons/Rus.svg"
import vk from "../../assets/icons/vk.svg"
import zen from "../../assets/icons/zen.svg"
import tg from "../../assets/icons/tg.svg"
import ok from "../../assets/icons/ok.svg"



function Footer() {
  return (
    <div className="footer">
      <div className='footer-content'>
      <div className='footer-separator' style={{height:"40px"}}></div>
        <div className='footer-top'>
          <div className='footer-top-left'>
            <div className='contacts'>
              <p style={{color:"rgba(255,255,255,.5)", fontSize:"14px", marginBottom:"0px"}}>Контакты</p>
              <p>8 (800) 300-6-122</p>
              <p>press@welcome.moscow</p>
            </div>
            <div className='contacts'>
              <p>О проекте</p>
              <p>Вход для партнеров</p>
            </div>
          </div>

          <div className='footer-links'>
            <img src={vk}></img>
            <img src={zen}></img>
            <img src={tg}></img>
            <img src={ok}></img>
          </div>
        </div>
        <div className='footer-separator' style={{height:"40px"}}></div>
        <div className='footer-separator' style={{height:"1px", backgroundColor:"rgba(255,255,255,.5)", marginBottom:"25px"}}></div>
        <div className='bottom-footer'> 
          <img src={rus} style={{cursor:"pointer"}}></img>
          <div className='footer-policy'>
            <p>Политика конфиденциальности</p>
            <p>Политика обработки персональных данных</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
