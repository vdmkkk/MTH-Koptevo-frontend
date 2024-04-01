import '../../styles/layout.css';
import Logo_russpass from '../assets/icons/Logo_russpass.svg'
import Separator from '../assets/icons/Selector.svg'
import LogoRussia from '../assets/icons/Logo-russia.svg'
import arrow from '../assets/icons/arrow-down.svg'
import burgerMenu from '../assets/icons/burger-menu.svg'
import bonus from '../assets/icons/Bonus-icon.svg'
import mosturizm from '../assets/icons/Mosturizm.svg'
import heart from '../assets/icons/heart.svg'
import user from '../assets/icons/user-01.svg'
import flag from '../assets/icons/Flags.svg'



function Layout() {
  return (
    <div className="layout-header">
      <div className='left-half'>
        <div className='left-part-header'>
          <img src={Logo_russpass}></img>
          <img src={Separator}></img>
          <img src={LogoRussia}></img>
          <img src={arrow}></img>
        </div>
        
        <div className='centre-part-header'>
          <img src={burgerMenu}></img>
          <p>Меню</p>
          <img src={bonus}></img>
          <p>Бонусы</p>
        </div>
      </div>

      <div className='right-part-header'>
        <img src={mosturizm}></img>
        <p>Проекты Мостуризма</p>
        <img src={heart}></img>
        <p>Мои планы</p>
        <img src={user}></img>
        <p>Войти</p>
        <img src={flag}></img>
      </div>
    </div>
  );
}

export default Layout;
