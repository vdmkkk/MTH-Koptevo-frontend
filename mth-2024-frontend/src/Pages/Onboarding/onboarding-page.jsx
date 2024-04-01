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
import linkTrain from "../../assets/icons/linkTrain.svg"

function OnboardingPage() {
  return (
    <div className="App">
        <Layout>
        </Layout>
        <div className='banner'>
            
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
            <div className='link-div'>
              <div>
              <h1>Планирование поездок</h1>
              <h2>Перейти к разделу</h2>
              <img src={linkTrain}></img>
              </div>
              <div>
                <h2>Планируйте свои поездки правильно </h2>
                <h3>Вы можете <strong>добавлять интересные места</strong> и маршруты в свои путешествия, чтобы ничего не потерялось. Наш сервис поможет разбить <strong>активности по дням</strong>, следить за прогрессом прохождения и <strong>делиться впечатлениями</strong>
с другими путешественниками</h3>
              </div>
            </div>
            <div className='link-div'></div>
            <div className='link-div'></div>
          </div>
          
        </div>
        <div className='footer'></div>
    </div>
  );
}

export default OnboardingPage;
