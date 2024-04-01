import '../../styles/layout.css';
import Logo_russpass from '../../assets/icons/Logo_russpass.svg'
import Separator from '../../assets/icons/Selector.svg'
import LogoRussia from '../../assets/icons/Logo-russia.svg'
import arrow from '../../assets/icons/arrow-down.svg'
import burgerMenu from '../../assets/icons/burger-menu.svg'
import bonus from '../../assets/icons/Bonus-icon.svg'
import mosturizm from '../../assets/icons/Mosturizm.svg'
import heart from '../../assets/icons/heart.svg'
import user from '../../assets/icons/user-01.svg'
import flag from '../../assets/icons/Flags.svg'



function Layout() {
  return (
    <div className="layout-header">
      <div className='left-half'>
        <div className='left-part-header'>
          <img src={Logo_russpass} className='icons'></img>
          <img src={Separator} style={{height:"28px"}}></img>
          <img src={LogoRussia} className='logo-rus'></img>
          <img src={arrow} style={{marginLeft:"8px"}}  className='icons'></img>
        </div>
        
        <div className='centre-part-header'>
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <img src={burgerMenu} className='icons'></img>
            <p>Меню</p>
          </div>
          <div  style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <img src={bonus} className='icons'></img>
            <p>Бонусы</p>
          </div>
        </div>
      </div>

      <div className='right-part-header'>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <img src={mosturizm} className='icons'></img>
          <p>Проекты Мостуризма</p>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <img src={heart} className='icons'></img>
          <p>Мои планы</p>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <img src={user} className='icons'></img>
          <p>Войти</p>
        </div>
        <img src={flag} className='icons'></img>
      </div>
    </div>
  );
}

export default Layout;
