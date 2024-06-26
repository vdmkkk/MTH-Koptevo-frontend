import './onboarding-page.css';
import React from 'react';
import {useNavigate} from "react-router"
import Layout from '../../Components/reusable/layout.jsx';
import banner from "../../assets/img/BannerOnboarding.png"
import marshruti from "../../assets/img/marshruti.png"
import places from "../../assets/img/places.png"
import guides from "../../assets/img/guides.png"
import room from "../../assets/img/room.png"
import airplane from "../../assets/img/airplane.png"
import train from "../../assets/img/train.png"
import restoran from "../../assets/img/restoran.png"
import bgimage from "../../assets/img/bgimage.png"
import linkTrain from "../../assets/img/frame1.jpg"
import frame2 from "../../assets/img/frame2.jpg"
import frame3 from "../../assets/img/frame3.jpg"
import arrow from "../../assets/icons/Arrow-1.svg"
import Footer from '../../Components/reusable/footer.jsx';
import yellowArrow from "../../assets/icons/yellow-arrow-down.svg"
import underline from "../../assets/icons/yellow-underline.svg"


function OnboardingPage() {
  const navigate = useNavigate();
  return (
    <div className="App">
        <Layout>
        </Layout>
        <div className='bgimg' style={{backgroundImage:`url("${bgimage}")`}}>
        <div className='banner' style={{backgroundImage:`url("${banner}")`, display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
              <h1 style={{color:'#FFFFFF', fontWeight:"400", textAlign:"left"}}>Спланируйте иделальное путешествие с RUSSPASS</h1>
              <div className='moskva-text' style={{display:"flex", alignItems:"baseline", gap:"8px", cursor:"pointer"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                  <h1 style={{color:'#FFC300', fontWeight:"400", marginTop:"0px", marginBottom:"0px", textDecoration:"underline dashed", textDecorationSkip:"5px"}}>Москва</h1>
                  {/* <img src={underline} style={{width:"101%"}} /> */}
                </div>
                <img src={yellowArrow}></img>
              </div>
        </div>  
        <div className='border-div'></div>
        
          <div className='main-part'>
            <div className='icons-routes'>
              <div className='icons-routes-1'>
                <div className='icon-route-1' style={{backgroundImage:`url("${marshruti}")`, backgroundPositionY:"-25px"}} onClick={() => navigate("/routes")}>
                  {/* <img src={marshruti}></img> */}
                  <p className='icons-bit-text'>Маршруты</p>
                  <p className='icons-small-text'>популярные и уединенные</p>
                </div>
                <div className='icon-route' style={{backgroundImage:`url("${places}")`}} onClick={() => navigate("/places")}>
                  <p className='icons-bit-text'>Места</p>
                  <p className='icons-small-text'>посетить всё</p>
                </div>
                <div className='icon-route-1' style={{backgroundImage:`url("${guides}")`, backgroundPositionY:"-25px"}}>
                  <p className='icons-bit-text'>Экскурсии</p>
                  <p className='icons-small-text'>интересно послушать</p>
                </div>
              </div>
              <div className='icons-routes-1'>
                <div className='icon-route' style={{backgroundImage:`url("${room}")`}} onClick={() => window.open("https://russpass.ru/housing-catalog")}>
                  <p className='icons-bit-text'>Жилье</p>
                  <p className='icons-small-text'>милый дом</p>
                </div>
                <div className='icon-route' style={{backgroundImage:`url("${airplane}")`}} onClick={() => window.open("https://russpass.ru/avia-tickets")}>
                  <p className='icons-bit-text'>Авиабилеты</p>
                  <p className='icons-small-text'>как можно быстрее</p>
                </div>

                <div className='icon-route' style={{backgroundImage:`url("${train}")`}} onClick={() => window.open("https://russpass.ru/railways-tickets")}>
                  <p className='icons-bit-text'>ЖД билеты</p>
                  <p className='icons-small-text'>все в одном месте</p>
                </div>
                <div className='icon-route-1' style={{backgroundImage:`url("${restoran}")`, backgroundPositionY:"-195px"}}>
                  <p className='icons-bit-text'>Рестораны</p>
                  <p className='icons-small-text'>вкусно - и точно</p>
                </div>
              </div>
            </div>

            <div className='links' style={{backgroundImage:{bgimage}}}>
              <div className='link-div' style={{backgroundImage: `url('${linkTrain}')` }} >
                <div className='train-part' >
                  <h1>Планирование поездок</h1>
                  <div className='arrow-link' onClick={() => navigate("/trip")}>
                        <h2>Перейти к разделу</h2>
                        <img src={arrow}></img>
                      </div>
                </div>
                <div className='non-train-part' style={{marginLeft:"0px"}}>
                  <h2>ПЛАНИРУЙТЕ СВОИ ПОЕЗДКИ ПРАВИЛЬНО </h2>
                  <p style={{textAlign:"end"}}>Вы можете <span style={{fontWeight:"500"}}>добавлять интересные места</span> и маршруты в свои путешествия, чтобы ничего не потерялось. Наш сервис поможет разбить <span style={{fontWeight:"500"}}>активности по дням</span>, следить за прогрессом прохождения и <span style={{fontWeight:"500"}}>делиться впечатлениями </span> 
   с другими путешественниками</p>
                </div>
              </div>

              <div className='link-div' style={{backgroundImage: `url('${frame2}')`, backgroundPositionX:"right", backgroundSize:"cover"  }} >
                  
                    <div className='non-train-part-reverse' style={{alignItems:"start"}}>
                      <h2>СОСТАВИЛИ МАРШРУТЫ ЗА ВАС</h2>
                      <p style={{textAlign:"start"}}>Для <span style={{fontWeight:"500"}}>каждого маршрута</span> представлена его продолжительность, уникальные <span style={{fontWeight:"500"}}>достопримечательности</span>, рекомендуемые отели и рестораны на пути, а также <span style={{fontWeight:"500"}}>другие особенности</span>, которые стоит учитывать при планировании путешествия.
  </p>
                    </div>
                    <div className='train-part-reverse' style={{alignItems:"end", marginRight:"78px"}}>
                      <h1>Маршруты</h1>
                      <div className='arrow-link' onClick={() => navigate("/routes")}>
                        <h2>Перейти к разделу</h2>
                        <img src={arrow}></img>
                      </div>
                    </div>
              </div>

              <div className='link-div' style={{backgroundImage: `url('${frame3}')`}} >
                  <div className='train-part'>
                      <h1>Места</h1>
                      <div className='arrow-link' onClick={() => navigate("/places")}>
                        <h2>Перейти к разделу</h2>
                        <img src={arrow}></img>
                      </div>
                    </div>
                    <div className='non-train-part'>
                      <h2>ВЫБИРАЙ ИНТЕРЕСНЫЕ МЕСТА САМ</h2>
                      <p style={{textAlign:"end"}}>Каждое место имеет <span style={{fontWeight:"500"}}>уникальную атмосферу </span>
  и привлекает туристов своими особенностями. Раздел о местах <span style={{fontWeight:"500"}}>помогает</span> путешественникам выбрать идеальное место для отдыха или экскурсии, а также познакомиться с новыми <span style={{fontWeight:"500"}}>культурами</span> и <span style={{fontWeight:"500"}}>традициями</span>.</p>
                    </div>
              </div>
            </div>
            
          </div>
        </div>
        <Footer/>
    </div>
  );
}

export default OnboardingPage;
