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
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";


function getDateIntervalLength(jsonDate1, jsonDate2) {
  const dateStr1 = jsonDate1;
  const dateStr2 = jsonDate2;

  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  const normalizedDate1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const normalizedDate2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const diffInMilliseconds = Math.abs(normalizedDate2 - normalizedDate1);

  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.ceil(diffInDays) + 1; // +1 to include both the start and end dates in the interval
}

function TripPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [isOpenDiv, setIsOpenDiv] = useState(2);
  // const card = bruh[0];
  // const list = [1,2,3,4,5,6];
  const [trip, setTrip] = useState(null);

  const [places, setPlaces] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [cookies, setCookie] = useCookies(["JWT"]);

  const getPlaces = async (id) => {
    await axios.get(`${process.env.REACT_APP_ZAMAN_API}/place/by_id?id=${id}`).then(res => {
      console.log('got', res.data)
      setPlaces(prev => {return [...prev, res.data]})
    })
  }

  async function fetchAllPromises(data) {
    // var promises = [];
    data["places"].map(obj => obj["id"]).forEach(id => {
      const promise = getPlaces(id);
      // promises.push(promise)
    })
    // var results = await Promise.all(promises);
    // console.log('res', results);
    // setPlaces(results);
  }

  useEffect(() => {console.log(places)}, [places])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_ZAMAN_API}/trip/by_id?id=${params.id}`).then(async res => {
      setTrip(res.data);
  
      if (res.data["places"]) {
        const placePromises = res.data["places"].map(async obj => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_ZAMAN_API}/place/by_id?id=${obj["id"]}`);
          const response1 = await axios.get(`${process.env.REACT_APP_ZAMAN_API}/user/place_check_in_flag?place_id=${obj["id"]}&user_id=${cookies.JWT}`);
          return { obj: response.data, day: obj["day"], check_in: response1.data };
        } catch (error) {
          console.error('Error fetching place details:', error);
          // Handle error, e.g., by returning a partial object with error info or default values
          return { obj: null, day: obj["day"], error: true };
        }
      });
  
      // Use Promise.all to wait for all the promises to resolve
      const newPlaces = await Promise.all(placePromises);
      console.log(newPlaces);
      setPlaces(newPlaces);
      } else setPlaces([])
      

      if (res.data["Routes"]) {
          const routePromises = res.data["Routes"].map(async obj => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_ZAMAN_API}/route/by_id?id=${obj["id"]}`);
            // const response1 = await axios.get(`${process.env.REACT_APP_ZAMAN_API}/user/place_check_in_flag?place_id=${obj["id"]}&user_id=${cookies.JWT}`);
            return { obj: response.data, day: obj["day"],
            //  check_in: response1.data
            };
          } catch (error) {
            console.error('Error fetching place details:', error);
            // Handle error, e.g., by returning a partial object with error info or default values
            return { obj: null, day: obj["day"], error: true };
          }
        });
    
        // Use Promise.all to wait for all the promises to resolve
        const newRoutes = await Promise.all(routePromises);
        console.log(newRoutes);
        setRoutes(newRoutes);
      } else setRoutes([]);
      
    });
  }, [])

  if (trip)
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
            <p className={(isOpenDiv == 0) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(0)}>Все места</p>
            {Array.from({ length: getDateIntervalLength(trip["date_start"], trip["date_end"]) }, (_, index) => index + 1).map(ind => {
              return <p className={(isOpenDiv == ind) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(ind)}>{`День ${ind}, 21.03`}</p>

            })}
          </div>
        </div>
        {/* <div className='main-part' style={{backgroundColor:"var(--gray-f5)", marginInline:"0px", paddingInline:"108px", paddingTop:"8px", paddingBottom:"8px"}}>
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
                    <div className='gray-button-disabled' style={{border:"1px solid var(--gray-a7)", color:"var(--gray-a7)", marginTop:"16px"}}> <p className='quiz-label'>Пройти квиз</p> </div>
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
        </div> */}


        <div className='main-part'>
          <h2 style={{textAlign:"left", fontWeight:"500"}}>План дня</h2>

          <div className='cards-places'>

            {routes.filter(obj => obj["day"] == isOpenDiv).length > 0 ? routes.filter(obj => obj["day"] == isOpenDiv).map((card, index) => (
            <div className='card-cont'onClick={async event => {navigate(`/routes/${card["id"]}`)}} >
              <div className='card-img' 
              style={{backgroundImage:`url("${card["properties"]["photos"][card["properties"]["photos"].length - 2]}")`}}
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
                  <div className='routes-tags'>
                  {card["tags"] != null ? card["tags"].map((tag, index) => 
                  (
                  <div className='routes-card-tag'>
                    <p>{card.tags[index].name}</p>
                  </div>
                   )) : <div/>}
                   </div>
       
                </div>
              </div>
              
              <div className='button' style={{margin:"15px"}}>
                <p>Посмотреть</p>
              </div>

            </div>


          )) : <div/>}
          </div>

          <div className='cards-places'>
              {places.filter(obj => obj["day"] == isOpenDiv && obj["check_in"] == false).length > 0 ? places.filter(obj => obj["day"] == isOpenDiv && obj["check_in"] == false).map((obj) => {const card = obj["obj"]; return (
                  <div className='card-cont'onClick={async event => {navigate(`/routes/`)}} >
                  <div className='card-img' style={{backgroundImage:`url("${card["properties"]["photos"][0]}")`}}>
                    <div className='img-tags'>
                      <div className='left-img-tags'>
                      <div className='img-tag'>
                        <img src={coin}></img>
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
                      <p>{card["properties"]["address"]}</p>
                    </div>

                    <div style={{display:"flex", gap:"10px"}}>
                      <div className='card-tag'>
                        <img width={"16px"} src={book}></img>
                        <p> {card["variety"]}</p>
                      </div>
                    </div>
                  </div>
              
                </div>
              <div className='button' style={{margin:"15px"}}>
                <p>{(card["variety"] == "Ресторан") ? "Забронировать столик" : (card["variety"] == "Театр" || card["variety"] == "Музей" || card["variety"] == "Развлечения") ? "Купить билет" : "Посмотреть"}</p>
              </div>
            </div>

              )}) : <></>}

          </div>
          {places.filter(obj => obj["day"] == isOpenDiv && obj["check_in"] == false).length == 0 && routes.filter(obj => obj["day"] == isOpenDiv && obj["check_in"] == false).length == 0 ? <div>
            <p>Здесь пока ничего нет :(</p>
            <div className='button' onClick={() => {navigate('/routes')}}>Добавить маршруты</div>
          </div> : <></>}
        </div>
        <div className='main-part'>
          <h2 style={{textAlign:"left", fontWeight:"500"}}>Завершенные</h2>

          <div className='cards-places'>

            {routes.filter(obj => obj["day"] == isOpenDiv).length > 0 ? routes.filter(obj => obj["day"] == isOpenDiv).map((card, index) => (
            <div className='card-cont'onClick={async event => {navigate(`/routes/${card["id"]}`)}} >
              <div className='card-img' 
              style={{backgroundImage:`url("${card["properties"]["photos"][card["properties"]["photos"].length - 2]}")`}}
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
                  <div className='routes-tags'>
                  {card["tags"] != null ? card["tags"].map((tag, index) => 
                  (
                  <div className='routes-card-tag'>
                    <p>{card.tags[index].name}</p>
                  </div>
                   )) : <div/>}
                   </div>
       
                </div>
              </div>
              
              <div className='button' style={{margin:"15px"}}>
                <p>Посмотреть</p>
              </div>

            </div>


          )) : <div/>}
          </div>

          <div className='cards-places'>
              {places.filter(obj => obj["day"] == isOpenDiv && obj["check_in"]).length > 0 ? places.filter(obj => obj["day"] == isOpenDiv  && obj["check_in"]).map((obj) => {const card = obj["obj"]; return (
                  <div className='card-cont'onClick={async event => {navigate(`/routes/`)}} >
                  <div style={{"position": "absolute", "width": "inherit", "height": "inherit", "backgroundColor": "rgba(255, 255, 255, .7)"}}/>
                  <div className='card-img' style={{backgroundImage:`url("${card["properties"]["photos"][0]}")`}}>
                    <div className='img-tags'>
                      <div className='left-img-tags'>
                      <div className='img-tag'>
                        <img src={coin}></img>
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
                      <p>{card["properties"]["address"]}</p>
                    </div>

                    <div style={{display:"flex", gap:"10px"}}>
                      <div className='card-tag'>
                        <img src={book}></img>
                        <p> {card["variety"]}</p>
                      </div>
                      {/* {(card["features"]["Средний счет"] == undefined) ? <div></div> : 
                      <div className='card-tag'>
                        <img src={check}></img>
                        <p> Средний чек {card["features"]["Средний счет"]}</p>
                      </div>
                      } */}
                    </div>
                    {/* {(card["features"]["Тип кухни"] == undefined) ? <div></div> : 
                    <div className='card-tag'>
                      <img src={kitchen}></img>
                      <p>{card["features"]["Тип кухни"].slice(0, 50)}{(card["features"]["Тип кухни"].length > 50) ? "..." : ""}</p>
                    </div>
                    } */}
                  </div>
              
                </div>
              <div className='button' style={{margin:"15px"}}>
                <p>{}</p>
              </div>
            </div>

              )}) : <></>}

          </div>
        </div>
      <Footer/>
    </div>
  );
}

export default TripPage;
