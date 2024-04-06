import Footer from '../../Components/reusable/footer';
import Layout from '../../Components/reusable/layout';
import './profile-page.css';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router"
import medal1 from "../../assets/img/kandinsky-download-0.png"
import medal2 from "../../assets/img/kandinsky-download-1.png"
import medal3 from "../../assets/img/kandinsky-download-2.png"
import medal4 from "../../assets/img/kandinsky-download-3.png"
import medal5 from "../../assets/img/kandinsky-download-4.png"
import medal6 from "../../assets/img/kandinsky-download-5.png"
import spb from "../../assets/img/spb.jpg"
import labels1 from "../../data/sort.json"
import cities from "../../data/cities.json"
import Dropdown from '../../Components/reusable/dropdown';
import sea from "../../assets/img/sea.jpg"
import sibir from "../../assets/img/sibir.jpg"
import surgut from "../../assets/img/surgut.jpg"
import greenClose from "../../assets/icons/green-close.svg"
import arrowDown from "../../assets/icons/arrow-down.svg"
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';



function ProfilePage() {

  function handleLogOut() {
    document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setRedirectMain(true);
  }

  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState(labels1[0]);
  const [sortCity, setSortCity] = useState(cities[0]);

  const [isOpenDiv, setIsOpenDiv] = useState(1);
  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const [redirectMain, setRedirectMain] = useState(false)
  const [redirectLogin, setRedirectLogin] = useState(false)
  const [cookies, setCookie] = useCookies(["JWT"]);

  useEffect(() => {
    if (cookies.JWT == null) {
      navigate('/login');
    }
  }, [])

  return (
    <div className="App">
      {redirectMain && <Navigate replace to="/" />}
      {redirectLogin && <Navigate replace to="/login" />}
      <Layout/>
      <div className='main-part'>
        <div onClick={() => handleLogOut()} className='logout-button'> <p>ВЫЙТИ</p></div>
        <h2 style={{textAlign:"left", fontWeight:"500"}}>Профиль</h2>
        <div className='two-blocks-flex'>
            <div className='user-info'>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", gap:"8px"}}>
                        <h1>Василий Иванов</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px", marginBottom:"0px"}}>@vdmk</p>

                        <div className='profile-tags' style={{marginTop:"8px"}}>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Пермь</p></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Местный</p></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Вечерние прогулки</p></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Путешествия</p></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Выставки</p></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Активный отдых</p></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Большие компании</p></div>
                        </div>

                    </div>
                </div>
                <div style={{backgroundColor:"var(--gray-f5)", padding:"1px 16px 1px 16px", borderRadius:"12px", marginTop:"16px"}}>
                    <p style={{ fontSize:"20px", color:"var(--gray-75)", fontWeight:"600", marginBottom:"0px"}}>Cтатус:</p>
                    <p style={{ fontSize:"20px", fontWeight:"600", marginTop:"0px"}}>Культурный гуру - вы посетили больше музеев, чем 90% пользователей в перми</p>
                </div>
            </div>  

            <div className='achievements'>
              <h2 style={{fontWeight:"500"}}>Медали заслуженного туриста</h2>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", overflow:"scroll"}}>
                    <div><div className='medal' style={{background:`url("${medal1}") no-repeat`}}></div> <h3 style={{margin:"0px", fontSize:"12px"}}>Главный культуролог</h3> </div>
                    <div><div className='medal' style={{background:`url("${medal2}") no-repeat`}}></div> <h3 style={{margin:"0px", fontSize:"12px"}}>Старший по музеям</h3> </div>
                    <div><div className='medal' style={{background:`url("${medal3}") no-repeat`}}></div> <h3 style={{margin:"0px", fontSize:"12px"}}>Гуру выставок</h3> </div>
                    <div><div className='medal' style={{background:`url("${medal4}") no-repeat`}}></div> <h3 style={{margin:"0px", fontSize:"12px"}}>Обожатель кафешек</h3> </div>
                    <div><div className='medal' style={{background:`url("${medal5}") no-repeat`}}></div> <h3 style={{margin:"0px", fontSize:"12px"}}>Начинающий культуровед</h3> </div>
                    <div><div className='medal' style={{background:`url("${medal6}") no-repeat`}}></div> <h3 style={{margin:"0px", fontSize:"12px"}}>Заслуженный турист</h3> </div>
              </div>
            </div>

            

        </div>
        <div className='big-button' style={{backgroundImage:`url(${spb})`}} >
          <div style={{margin:"20px", display:"flex", justifyContent:"space-between", height:"-webkit-fill-available"}}>
              <div>
                <h2>Отпуск 2024</h2>
                <p>Москва</p>
                <p>21 марта - 1 апреля</p>
                <p>Текущая поездка</p>
              </div>

              <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"200px", width:"30%", alignItems:"end", justifyContent: "flex-end"}}>
                <div className='white-button' style={{marginRight:"0px"}}><p>Перейти к поездке</p></div>
              </div>
          </div>
        </div>

        <div style={{height:"25px"}}></div>

        <div className='profile-divisions'>
          <p className={(isOpenDiv == 1) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(1)}>Избранное</p>
          <p className={(isOpenDiv == 2) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(2)}>Поездки</p>
          <p className={(isOpenDiv == 3) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(3)}>Хронология</p>
          <p className={(isOpenDiv == 4) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(4)}>Анкета путешественника</p>
        </div>

        {(isOpenDiv == 1) ?
        <div className='dropdown-cont'>
          <Dropdown id={1} label={"Любые"} labels={labels1} selectedOption={sortOption} setSelectedOption={setSortOption} ></Dropdown>
          <Dropdown id={2} label={"Москва"} labels={cities} selectedOption={sortCity} setSelectedOption={setSortCity} ></Dropdown>
        </div>
        : <div></div>}

        {(isOpenDiv == 2) ?
        <div className='trips'>
          <h2 style={{textAlign:"left", fontWeight:"500"}}>Планируемые</h2>
          <div className='big-button' style={{backgroundImage:`url(${surgut})`, border:"none"}} >
          <div style={{width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,.2)"}}>
          <div style={{margin:"20px", display:"flex", justifyContent:"space-between"}}>
              <div>
                <h2 style={{marginTop:"20px"}}>Влюблюсь в сургут</h2>
                <p>Сургут</p>
                <p>3 - 7 июля</p>
              </div>

              <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"215px", width:"30%", alignItems:"end"}}>
                <p style={{textAlign:"right"}}> </p>
                <div className='white-button' style={{marginRight:"0px"}}><p>Планирование</p></div>
              </div>
          </div>
          </div>
        </div>


        <h2 style={{textAlign:"left", fontWeight:"500"}}>Завершенные</h2>

        <div className='big-button' style={{backgroundImage:`url(${sibir})`, border:"none"}} >
        <div style={{width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,.2)"}}>
          <div style={{marginInline:"20px", display:"flex", justifyContent:"space-between"}}>
              <div>
                <h2 style={{marginTop:"20px"}}>Путешествие в Сибирь</h2>
                <p>Новосибирск</p>
                <p>15 - 24 сентября (2023)</p>
              </div>

              <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"215px", width:"30%", alignItems:"end"}}>
                <p style={{textAlign:"right"}}></p>
                <div className='white-button' style={{marginRight:"0px"}}><p>Как это было?</p></div>
              </div>
          </div>
          </div>
        </div>

        <div className='big-button' style={{backgroundImage:`url(${sea})`, border:"none"}} >
          <div style={{width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,.2)"}}>
            <div style={{marginInline:"20px", display:"flex", justifyContent:"space-between"}}>
                <div>
                  <h2 style={{marginTop:"20px"}}>На море!</h2>
                  <p>Анапа</p>
                  <p>30 июля - 5 августа (2023)</p>
                </div>

                <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"235px", width:"30%", alignItems:"end"}}>
                  <p style={{textAlign:"right"}}></p>
                  <div className='white-button' style={{marginRight:"0px"}}><p>Как это было?</p></div>
                </div>
            </div>
          </div>
        </div>
          
        </div>
        : <div></div>}


        {(isOpenDiv == 3) ?
        <div className='history'>
          <div className='hisory-content'>
              <div className='two-blocks-flex' style={{marginBottom:"0px"}}>
                <h2 style={{fontWeight:"500"}}>Отпуск 2024</h2>
                <p>Текущая поездка</p>
              </div>

              <div>
                <p style={{textAlign:"left", marginTop:"0px"}}>Москва</p>
                <p style={{textAlign:"left"}}>21 марта- 1 апреля</p>
              </div>
          </div>
        </div>
        : <div></div>}
        
        <div style={{height:"25px"}}></div>
      </div>

      {(isOpenDiv == 4) ?
      <div className='main-part' style={{backgroundColor:"var(--gray-f5)", marginInline:"0px", paddingInline:"108px", paddingTop:"8px", paddingBottom:"8px"}}>
        <div className='two-blocks-flex' style={{gap:"40px"}}>
            <div className='about-filed-cont'>
              <h2 style={{textAlign:"left", fontWeight:"500"}}>О себе</h2>
              <textarea type='text' className='about-filed' placeholder='Меня зовут Вася, я из города Пермь. Люблю гулять в большой компании и активный отдых'></textarea>
            </div>
            <div className='about-filed-cont'>
              <h2 style={{textAlign:"left", fontWeight:"500"}}>Теги</h2>
              <div className='tags-filed'>
                <p style={{textAlign:"left"}}>Добавьте подходящие вам категории</p>
                <div className='profile-tags' style={{marginTop:"8px", backgroundColor:"#EBEBEB", padding:"10px", borderRadius:"12px"}}>
                          <img className={(isTagsOpen == true) ? 'tag-arrow-opened' : 'tag-arrow'}  src={arrowDown} onClick={() => setIsTagsOpen(!isTagsOpen)}></img>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Пермь</p> <img src={greenClose}></img></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Местный</p><img src={greenClose}></img></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Вечерние прогулки</p><img src={greenClose}></img></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Путешествия</p><img src={greenClose}></img></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Выставки</p><img src={greenClose}></img></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Активный отдых</p><img src={greenClose}></img></div>
                          <div className='tag' > <p style={{fontSize:"12px"}}>Большие компании</p><img src={greenClose}></img></div>
                  </div>
                  <div style={{display:"flex", gap:"4px"}}>
                    <p style={{textAlign:"left"}}>Например:</p>
                    <p style={{textAlign:"left", color:"var(--green)"}}>Москва, Большие компании, Музеи</p>
                  </div>
              </div>
            </div>
            <div style={{height:"25px"}}></div>
        </div>
        </div>
        
        : <div></div>}

      <Footer/>
    </div>
  );
}

export default ProfilePage;
