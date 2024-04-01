import './onboarding-page.css';
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
import linkTrain from "../../assets/img/frame1.png"
import frame2 from "../../assets/img/frame2.png"
import frame3 from "../../assets/img/frame3.png"
import arrow from "../../assets/icons/Arrow-1.svg"

function OnboardingPage() {
  return (
    <div className="App">
        <Layout>
        </Layout>
        <div className='banner'>
            <h1 style={{color:'#FFFFFF', position:"absolute", left: "200px", fontSize:"64px", width:"800px"}}>Спланируйте иделальное путешествие с RUSSPASS</h1>
            <h1 style={{bottom:"400px", color:'#FFC300', position:"absolute", left: "200px", fontSize:"64px"}}>Москва</h1>
            <img src={banner}></img>
            <div className='border-div'></div>
        </div>  
        <div className='main-part'>
          <div className='icons-routes'>
            <div className='icons-routes-1'>
              <div className='icon-route'>
                <img src={marshruti}></img>
              </div>
              <div className='icon-route'>
                <img src={places}></img>
              </div>
              <div className='icon-route'>
                <img src={guides}></img>
              </div>
            </div>
            <div className='icons-routes-1'>
              <div className='icon-route'>
                <img src={room}></img>
              </div>
              <div className='icon-route'>
                <img src={airplane}></img>
              </div>
              <div className='icon-route'>
                <img src={train}></img>
              </div>
              <div className='icon-route'>
                <img src={restoran}></img>
              </div>
            </div>
          </div>

          <div className='links' style={{backgroundImage:{bgimage}}}>
            <div className='link-div' style={{backgroundImage: `url('${linkTrain}')` }}>
              <div className='train-part' >
                <h1>Планирование поездок</h1>
                <div style={{display:"flex", gap:"14px", alignItems:"baseline"}}>
                  <h2>Перейти к разделу</h2>
                  <img src={arrow}></img>
                </div>
              </div>
              <div className='non-train-part' style={{marginLeft:"0px"}}>
                <h2>ПЛАНИРУЙТЕ СВОИ ПОЕЗДКИ ПРАВИЛЬНО </h2>
                <p style={{textAlign:"end"}}>Вы можете <strong>добавлять интересные места</strong> и маршруты в свои путешествия, чтобы ничего не потерялось. Наш сервис поможет разбить <strong>активности по дням</strong>, следить за прогрессом прохождения и <strong>делиться впечатлениями</strong>
с другими путешественниками</p>
              </div>
            </div>

            <div className='link-div' style={{backgroundImage: `url('${frame2}')` }}>
                
                  <div className='non-train-part' style={{alignItems:"start"}}>
                    <h2>СОСТАВИЛИ МАРШРУТЫ ЗА ВАС</h2>
                    <p style={{textAlign:"start"}}>Для <strong>каждого маршрута</strong> представлена его продолжительность, уникальные <strong>достопримечательности</strong>, рекомендуемые отели и рестораны на пути, а также <strong>другие особенности</strong>, которые стоит учитывать при планировании путешествия.
</p>
                  </div>
                  <div className='train-part' style={{alignItems:"end", marginRight:"78px"}}>
                    <h1>Маршруты</h1>
                    <div style={{display:"flex", gap:"14px", alignItems:"baseline"}}>
                      <img src={arrow} style={{transform:"rotate(0.5turn)"}}></img>
                      <h2>Перейти к разделу</h2>
                    </div>
                  </div>
            </div>

            <div className='link-div' style={{backgroundImage: `url('${frame3}')` }}>
                <div className='train-part'>
                    <h1>Места</h1>
                    <div style={{display:"flex", gap:"14px", alignItems:"baseline"}}>
                      <h2>Перейти к разделу</h2>
                      <img src={arrow}></img>
                    </div>
                  </div>
                  <div className='non-train-part'>
                    <h2>ВЫБИРАЙ ИНТЕРЕСНЫЕ МЕСТА САМ</h2>
                    <p style={{textAlign:"end"}}>Каждое место имеет <strong>уникальную атмосферу</strong>
и привлекает туристов своими особенностями. Раздел о местах <strong>помогает</strong> путешественникам выбрать идеальное место для отдыха или экскурсии, а также познакомиться с новыми <strong>культурами</strong> и <strong>традициями</strong>.</p>
                  </div>
            </div>
          </div>
          
        </div>
        <div className='footer'></div>
    </div>
  );
}

export default OnboardingPage;
