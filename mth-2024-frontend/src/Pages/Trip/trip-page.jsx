import Footer from '../../Components/reusable/footer';
import Layout from '../../Components/reusable/layout';
import './trip-page.css';
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
import moscow from "../../assets/img/moscow.jpg"
import calendar from "../../assets/icons/calendar.svg"
import bonus from "../../assets/icons/Bonus-icon.svg"

import { useState } from 'react';


function TripPage() {
  const navigate = useNavigate();
  const [isOpenDiv, setIsOpenDiv] = useState(2);
  const card = bruh[0];
  const list = [1,2,3,4,5,6];

  return (
    <div className="App">
      <Layout/>
        <div className='main-part'>
          <div className='two-blocks-flex'>
            <div style={{display:"flex", flexDirection:"column", gap:"18px", width:"25%"}}>
              <div style={{display:"flex", gap: "8px"}}>
                <h2 style={{color:"var(--gray-a7)", fontWeight:"500"}}>Поездка</h2>
                <h2 style={{fontWeight:"500"}}>Отпуск 2024</h2>
              </div>


              <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
                        <div className='card-tag'>
                          <img style={{width:"24px"}} src={mapMarker}></img>
                          <p style={{fontSize:"24px"}}>Москва</p>
                        </div>

                        <div className='card-tag'>
                          <img style={{width:"24px"}} src={clock}></img>
                          <p style={{fontSize:"24px"}}> 10 дней</p>
                        </div>

                        <div className='card-tag'>
                          <img style={{width:"24px"}} src={calendar}></img>
                          <p style={{fontSize:"24px"}}>21.03.24 - 1.04.24</p>
                        </div>
              </div>

              <div className='button'> Купить билеты</div>
              <div className='gray-button'> Посмотреть жилье</div>
            </div>
            <div className='trip-image'><img src={moscow}></img></div>
          </div>


          <div className='profile-divisions'>
              <p className={(isOpenDiv == 1) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(1)}>Все места</p>
              <p className={(isOpenDiv == 2) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(2)}>День 1, 21.03 </p>
              <p className={(isOpenDiv == 3) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(3)}>День 2, 22.03</p>
           </div>
        </div>

        <div className='main-part' style={{backgroundColor:"var(--gray-f5)", marginInline:"0px", paddingInline:"108px", paddingTop:"8px", paddingBottom:"8px"}}>
            <div className='two-blocks-flex' style={{alignItems:"center"}}>
                <div>
                <h2 style={{textAlign:"left", fontWeight:"500"}}>Текущий маршрут</h2>

                <div className='card-cont'onClick={async event => {navigate(`/routes/`)}} >
              <div className='card-img' style={{backgroundImage:`url("${card["photos"][card["photos"].length - 2]}")`}}>
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
                <p className='card-place-name' >{card["name"]} </p>
                <div style={{height:"8px"}}></div>
                <div className='card-desrciption'>
                  <div className='card-tag'>
                    <img src={mapMarker}></img>
                    <p>{card["address"]}</p>
                  </div>

                  <div style={{display:"flex", gap:"10px"}}>
                  <div className='card-tag'>
                    <img src={food}></img>
                    <p> {card["type"]}</p>
                  </div>
                  {(card["features"]["Средний счет"] == undefined) ? <div></div> : 
                  <div className='card-tag'>
                    <img src={check}></img>
                    <p> Средний чек {card["features"]["Средний счет"]}</p>
                  </div>
                  }
                  </div>
                  {(card["features"]["Тип кухни"] == undefined) ? <div></div> : 
                  <div className='card-tag'>
                  <img src={kitchen}></img>
                    <p>{card["features"]["Тип кухни"].slice(0, 50)}{(card["features"]["Тип кухни"].length > 50) ? "..." : ""}</p>
                  </div>
                  }
                    </div>
                   </div>
                    <div className='button' style={{margin:"15px"}}>
                      <p>Посмотреть</p>
                    </div>

                  </div>
                </div>

                  <div>
                    <div className='progress-bar'>
                      <div className='back-bar'>
                        <div className='progress' style={{width:"60%"}}></div>
                      </div>
                    </div>

                    <h2 style={{textAlign:"left", fontWeight:"500", marginBottom:"0px"}}>4/6 мест пройдено</h2>
                    <h2 style={{textAlign:"left", fontWeight:"500", marginBottom:"0px", marginTop:"0px"}}>120<img src={bonus}></img> получено</h2>
                    <h2 style={{textAlign:"left", fontWeight:"500", marginBottom:"0px", marginTop:"0px"}}>4 км пройдено</h2>
                    <div style={{height:"50px"}}></div>

                    <h2 style={{textAlign:"left", fontWeight:"500", marginBottom:"0px", marginTop:"0px", color:"var(--gray-a7)"}}> + 50<img src={bonus}></img> за весь маршрут</h2>
                    <div className='gray-button' style={{border:"1px solid var(--gray-a7)", color:"var(--gray-a7)", marginTop:"16px"}}> <p className='quiz-label'>Пройти квиз</p> </div>
                  </div>


                <div>
                  <h2 style={{textAlign:"left", fontWeight:"500"}}>Следующее место</h2>

                  <div className='card-cont'onClick={async event => {navigate(`/routes/`)}} >
                    <div className='card-img' style={{backgroundImage:`url("${card["photos"][card["photos"].length - 2]}")`}}>
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
                    <p className='card-place-name' >{card["name"]} </p>
                    <div style={{height:"8px"}}></div>
                    <div className='card-desrciption'>
                      <div className='card-tag'>
                        <img src={mapMarker}></img>
                        <p>{card["address"]}</p>
                      </div>

                      <div style={{display:"flex", gap:"10px"}}>
                        <div className='card-tag'>
                          <img src={food}></img>
                          <p> {card["type"]}</p>
                        </div>
                        {(card["features"]["Средний счет"] == undefined) ? <div></div> : 
                        <div className='card-tag'>
                          <img src={check}></img>
                          <p> Средний чек {card["features"]["Средний счет"]}</p>
                        </div>
                        }
                      </div>
                      {(card["features"]["Тип кухни"] == undefined) ? <div></div> : 
                      <div className='card-tag'>
                        <img src={kitchen}></img>
                        <p>{card["features"]["Тип кухни"].slice(0, 50)}{(card["features"]["Тип кухни"].length > 50) ? "..." : ""}</p>
                      </div>
                      }
                    </div>
                
                  </div>
                <div className='button' style={{margin:"15px"}}>
                  <p>Забронировать столик</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='main-part'>
          <h2 style={{textAlign:"left", fontWeight:"500"}}>План дня</h2>

          <div className='cards-places'>
              {list.map((index) => (
                  <div className='card-cont'onClick={async event => {navigate(`/routes/`)}} >
                  <div className='card-img' style={{backgroundImage:`url("${card["photos"][card["photos"].length - 2]}")`}}>
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
                  <p className='card-place-name' >{card["name"]} </p>
                  <div style={{height:"8px"}}></div>
                  <div className='card-desrciption'>
                    <div className='card-tag'>
                      <img src={mapMarker}></img>
                      <p>{card["address"]}</p>
                    </div>

                    <div style={{display:"flex", gap:"10px"}}>
                      <div className='card-tag'>
                        <img src={food}></img>
                        <p> {card["type"]}</p>
                      </div>
                      {(card["features"]["Средний счет"] == undefined) ? <div></div> : 
                      <div className='card-tag'>
                        <img src={check}></img>
                        <p> Средний чек {card["features"]["Средний счет"]}</p>
                      </div>
                      }
                    </div>
                    {(card["features"]["Тип кухни"] == undefined) ? <div></div> : 
                    <div className='card-tag'>
                      <img src={kitchen}></img>
                      <p>{card["features"]["Тип кухни"].slice(0, 50)}{(card["features"]["Тип кухни"].length > 50) ? "..." : ""}</p>
                    </div>
                    }
                  </div>
              
                </div>
              <div className='button' style={{margin:"15px"}}>
                <p>Забронировать столик</p>
              </div>
            </div>

              ))}

          </div>
        </div>
      <Footer/>
    </div>
  );
}

export default TripPage;
