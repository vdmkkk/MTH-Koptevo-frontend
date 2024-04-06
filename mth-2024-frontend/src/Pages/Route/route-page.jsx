import Footer from '../../Components/reusable/footer';
import Layout from '../../Components/reusable/layout';
import './route-page.css';
import bruh from "../../data/places.json"
import heart from "../../assets/icons/heart.svg"
import mapMarker from "../../assets/icons/marker-pin-01.svg"
import food from "../../assets/icons/food.svg"
import check from "../../assets/icons/coins-03.svg"
import clock from "../../assets/icons/clock.svg"
import coinBl from "../../assets/icons/black-coin.svg"
import book from "../../assets/icons/book.svg"
import coin from "../../assets/icons/black-coin.svg"
import whiteheart from "../../assets/icons/white-heart.svg"
import kitchen from "../../assets/icons/kitchen.svg"
import {useNavigate} from "react-router"
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import MapRoutesComponent from '../../Components/Map-Routes-Component/Map-Routes-Component';
import Companions from '../../Components/Companions/Companions.js';


function RoutePage() {
  const id  = useParams();
  console.log("id", id)
  const navigate = useNavigate();

  const [route, setRoute] = useState([])

  const [companionsOpen, setCompanionsOpen] = useState(false);

  useEffect(() => {
      axios.get(`${process.env.REACT_APP_ZAMAN_API}/route/by_id?id=${id.routeID}`).then((res) => {
          setRoute(res.data);
          console.log("hey", res.data)
      })
  }, [])

  useEffect(() => {
    if (companionsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [companionsOpen]);

  if (Object.keys(route).length > 0)
  return (
    

    <div className="App">
      <Layout/>
      <Companions open={companionsOpen} setOpen={setCompanionsOpen} mode={"route"} defautDate={{from: -1, to: -1}} placeId={id.placeID}/>
        <div className='banner' 
          style={{backgroundImage:`url("${route["properties"].photos[2]}")`, display:"flex", flexDirection:"column", alignItems:"flex-start"}}
        >
              <div style={{width:"100%", backgroundColor:"rgba(0,0,0,.5)", height:"100%"}}>
                  <h1 style={{color:'#FFFFFF', fontSize:"64px", fontWeight:"400", width:"60%", marginLeft:"108px", textAlign:"left"}}>{route.name}</h1>
                  <div style={{width:"20%", display:"flex", alignItems:"center", gap:"8px", marginLeft:"108px", cursor:"pointer"}}>
                    <div className='white-button'> <p>Прикрепить к поездке</p></div>
                    <div className='white-like-button'><img src={heart}></img></div>
                  </div>
              </div>
        </div>
        <div className='border-div'></div>

      <div className='main-part'> 
        <div className='two-blocks-flex' style={{gap:"10px"}}>
          <div className='route-tags'>
                  <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
                        <div className='card-tag'>
                          <img style={{width:"24px"}} src={mapMarker}></img>
                          <p style={{fontSize:"24px"}}>Москва</p>
                        </div>

                        <div className='card-tag'>
                          <img style={{width:"24px"}} src={clock}></img>
                          <p style={{fontSize:"24px"}}> 1,5 часа</p>
                        </div>

                        <div className='card-tag'>
                          <img style={{width:"24px"}} src={mapMarker}></img>
                          <p style={{fontSize:"24px"}}>Москва</p>
                        </div>

                  </div>
          </div>

          <div className='buttons-raw' style={{flexWrap:"wrap"}}>
            <div className='button' style={{width:"40%"}} onClick={() => {setCompanionsOpen(true)}}> <p>Найти попутчика</p></div>
          </div>
        </div>

        <div className='two-blocks-flex' >
            <div className='route-description'>
              <p style={{fontSize:"24px"}}>Первая и единственная российская достопримечательность в списке лучших мест мира по версии журнала Time. Закладывайте на посещение «Зарядья» минимум полдня, чтобы спокойно погулять по ландшафтным зонам, виртуально полетать над Россией, отобедать в стилизованных под 60-е интерьерах и сделать идеальное селфи на закате, зависнув над Москвой-рекой.</p>
            </div>

            <div className='route-advice'>
              <div className='localComment'>
              <h3 style={{textAlign:"left", fontSize:"32px", fontFamily:"Proto Grotesk", fontWeight:"500", marginTop:"0px"}}>Совет местного</h3>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div>
                        <h1>Аноним</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px"}}>в городе уже долго</p>
                    </div>
                </div>
                <p style={{ marginInline:"8px"}}>В данном районе плохо работает gps, поэтому лучше изучить маршрут заранее. В самом парке располагается кафе, на случай если вы захотите перекусить. Но я рекомендовал пройти от парка 2-3 квартала, где находятся несколько неплохих заведений</p>
                <div className='line'/>
            </div>
            </div>

        </div>

        <MapRoutesComponent places={route["places"]}/>

        <div className='reviews'>
          <h2 style={{textAlign:"left", fontSize:"32px", fontFamily:"Proto Grotesk", fontWeight:"500", marginTop:"0px"}}>Отзывы</h2>
          <div className='review-slider'>
            <div className='review-cont'>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div>
                        <h1>Вадим С.</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px"}}>дата написания отзыва</p>
                    </div>
                </div>
                <p>Обожаю красную площадь и главное - Кремль, находящийся прямо там же! Ходил бы туда каждый день! </p>
                <div className='photos-review'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                </div>
            </div>


            <div className='review-cont'>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div>
                        <h1>Вадим С.</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px"}}>дата написания отзыва</p>
                    </div>
                </div>
                <p>Обожаю красную площадь и главное - Кремль, находящийся прямо там же! Ходил бы туда каждый день! </p>
                <div className='photos-review'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                </div>
            </div>

            
            <div className='review-cont'>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div>
                        <h1>Вадим С.</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px"}}>дата написания отзыва</p>
                    </div>
                </div>
                <p>Обожаю красную площадь и главное - Кремль, находящийся прямо там же! Ходил бы туда каждый день! </p>
                <div className='photos-review'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                </div>
            </div>


            <div className='review-cont'>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div>
                        <h1>Вадим С.</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px"}}>дата написания отзыва</p>
                    </div>
                </div>
                <p>Обожаю красную площадь и главное - Кремль, находящийся прямо там же! Ходил бы туда каждый день! </p>
                <div className='photos-review'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                </div>
            </div>


            <div className='review-cont'>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div>
                        <h1>Вадим С.</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px"}}>дата написания отзыва</p>
                    </div>
                </div>
                <p>Обожаю красную площадь и главное - Кремль, находящийся прямо там же! Ходил бы туда каждый день! </p>
                <div className='photos-review'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                </div>
            </div>



          </div>
        </div>

        <div style={{height:"55px"}}></div>
        

        <div className='tickets-cont'>
            <h2 style={{textAlign:"left"}}>Жилье рядом</h2>

            <div className='recommended-cards' style={{marginBottom:"25px"}}>


            <div className='card-cont'onClick={async event => {navigate(`/places/1`)}} >
              <div className='card-img'
               style={{backgroundImage:`url("${route["properties"]["photos"][route["properties"]["photos"].length - 1]}")`}}
               >
                  <div className='img-tags'>
                      <div className='left-img-tags'>
                        <div className='img-tag' style={{backgroundColor:"var(--green)"}}>
                          <p>8.8</p>
                        </div>
                        <div className='img-tag'>
                          <img src={coin}></img>
                        </div>
                        <div className='img-tag'>
                          <img className='tag-bg-icon' src={heart}></img>
                          <p style={{color:"var(--black)"}}>Скидка</p>
                        </div>
                      </div>
                      <div className='like-tag'>
                        <img src={whiteheart}></img>
                      </div>
                  </div>
                  <div className='img-slider'>
                    <div className='img-slide-chosen'></div>
                    <div className='img-slide'></div>
                    <div className='img-slide'></div>
                    <div className='img-slide'></div>
                  </div>

              </div>
              <div className='card-info'>
                <p className='card-place-name' >Отель</p>
                <div style={{height:"8px"}}></div>
                <div className='card-desrciption'>
                  <div className='card-tag'>
                    <img src={mapMarker}></img>
                    <p>Пушкина, 35</p>
                  </div>

                  <div style={{display:"flex", gap:"10px"}}>
                  <div className='card-tag'>
                    <img src={food}></img>
                    <p> Отель</p>
                  </div>
                  <div className='card-tag'>
                    <img src={check}></img>
                    <p> Средний чек 3000</p>
                  </div>

                  </div>
                  <div className='card-tag'>
                  <img src={kitchen}></img>
                    <p>Русская</p>
                  </div>
                </div>
                
              </div>

              
              <div className='button' style={{margin:"15px"}} onClick={() => window.open("https://russpass.ru/housing-catalog")}>
                <p>Посмотреть</p>
              </div>

            </div>



            </div>
          </div>

      </div>
      <Footer/>
    </div>
  );
}

export default RoutePage;
