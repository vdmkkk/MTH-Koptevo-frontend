import './place-page.css';
import Layout from '../../Components/reusable/layout.jsx';
import Footer from '../../Components/reusable/footer.jsx';
import {useParams} from 'react-router-dom';
import bruh from "../../data/places.json"
import mapMarker from "../../assets/icons/marker-pin-01.svg"
import redHeart from "../../assets/icons/red-heart.svg"
import clock from "../../assets/icons/clock.svg"
import Spacer from "../../assets/icons/Spacer.svg"
import { useEffect, useState } from 'react';
import Dropdown from '../../Components/reusable/dropdown.jsx';
import sort from "../../data/sort.json"
import {useNavigate} from "react-router"
import loopa from "../../assets/icons/loopa.svg"
import calendar from "../../assets/icons/calendar.svg"
import arrowDown from "../../assets/icons/arrow-down.svg"
import plus from "../../assets/icons/+.svg"
import burgerDD from "../../assets/icons/burger-dd.svg"
import food from "../../assets/icons/food.svg"
import check from "../../assets/icons/coins-03.svg"
import kitchen from "../../assets/icons/kitchen.svg"
import cardImg from "../../assets/img/card-img.png"
import whiteheart from "../../assets/icons/white-heart.svg"
import heart from "../../assets/icons/heart.svg"
import coin from "../../assets/icons/black-coin.svg"





import labels1 from "../../data/sort.json"
import MapDistrictsPopup from '../../Components/Map-Districts-Popup/Map-Districts-Popup';
import close from '../../assets/icons/close.svg'
import MapPlace from '../../Components/Map-Place/Map-Place.js'
import axios from 'axios';
import Notes from '../../Components/Notes/Notes';
import Companions from '../../Components/Companions/Companions.js';
import LinkTrip from '../../Components/LinkTrip/LinkTrip.js';

import { useCookies } from "react-cookie";

function PlacePage() {
  const id  = useParams();
  
  const [place, setPlace] = useState({});
  console.log(place)

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["JWT"]);

  const [sortOption, setSortOption] = useState(sort[0]);
  const [tagOption, setTagOption] = useState();
  const [isOpen, setIsOpen] = useState();

  const [notesOpen, setNotesOpen] = useState(false);
  const [companionsOpen, setCompanionsOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [tripName, setTripName] = useState(null);

  const getPlace = async () => {
    await axios.get(`${process.env.REACT_APP_ZAMAN_API}/place/by_id?id=${id.placeID}`).then((res) => {
      console.log("lol", res.data);
      setPlace(res.data);
    })
  }

  const getTrip = async () => {
    await axios.get(`${process.env.REACT_APP_ZAMAN_API}/trip/by_user_id?id=${cookies.JWT}`).then(res => {
      res.data.forEach(obj => {
        if (obj["places"]) {
          if (obj["places"].filter(place => place["id"] == id.placeID)[0]) {
            setTripName({id: obj["id"], name: obj["properties"]["name"]})
          }
        }
      })
    })
  }

  useEffect(() => {
    getPlace();
  }, []);

  useEffect(() => {
    getTrip();
  }, [linkOpen])

  useEffect(() => {
    if (notesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [notesOpen]);

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

  useEffect(() => {
    if (linkOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [linkOpen]);

  if (Object.keys(place).length > 0)
  return (
    <div className="App">
        <Layout>
        </Layout>
        <Notes open={notesOpen} setOpen={setNotesOpen} placeId={id.placeID}/>
        <Companions open={companionsOpen} setOpen={setCompanionsOpen} mode={"place"} defautDate={{from: -1, to: -1}} placeId={id.placeID}/>
        <LinkTrip open={linkOpen} setOpen={setLinkOpen} mode={"place"} entityId={id.placeID}/>
        <div className='main-part'>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:"25px", alignItems:"baseline"}}>
              <div className='place-info'>
                <h2 className='place-name'>{place.name}</h2>
                <div style={{display:"flex", gap:"15px", alignItems:"center"}}>
                  <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                    <img src={mapMarker} width={"20px"}></img>
                    <p>{place["properties"].address}</p>
                  </div>

                  <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                    <img src={clock} width={"20px"}></img>
                    <p>Сегодня: {place["properties"].work_hours["Понедельник"]}</p>
                  </div>
                </div>

                <div className='place-tags'>
                  <div className='place-tag'> <p>Музей</p></div>
                  <div className='place-tag'> <p>Аудиогид</p></div>
                  <div className='place-tag'> <p>Категория 3</p></div>
                  <div className='place-tag'> <p>Категория 4</p></div>
                </div>
              </div>

              <div className='place-buttons'>
                <div onClick={() => {setNotesOpen(true)}} className='button' style={{backgroundColor:"var(--gray-f5)"}}><p>Открыть заметки</p></div>
                <div className='button'><p>Перейти к билетам</p></div>
                <div onClick={() => tripName ? navigate(`/trip/${tripName["id"]}`) : setLinkOpen(true)} className='button'><p>{tripName ? tripName["name"] : "Добавить в поездку"}</p></div>
                <div onClick={() => {setCompanionsOpen(true)}} className='button'> <p>Найти попутчика</p></div>
                <div className='button' style={{backgroundColor:"var(--gray-f5)", width:"20px"}}><img src={redHeart} style={{marginRight:"0px", width:"24px"}}></img></div>
                <div className='button' style={{backgroundColor:"var(--green)", color:"white"}}><p>8.8</p></div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", minWidth:"100px"}}>
                  <p style={{marginBottom:"0px"}}>На основе</p>
                  <p style={{marginTop:"0px"}}>40 оценок</p>
                </div>
              </div>
          </div>

          <div className='place-photos'>
            <div className='big-place-photo'> <img src={place["properties"].photos[0]}></img></div>
            <div className='big-place-photo'> <img src={place["properties"].photos[1]}></img></div>
            <div style={{display:"flex", gap:"10px", flexDirection:"column"}}>
                <div className='small-place-photo'> <img src={place["properties"].photos[2]}></img></div>
                <div className='small-place-photo' style={{backgroundImage:`url("${place["properties"].photos[3]}")`}}><div className='more-photo'>
                  <p style={{fontSize:"24px", fontWeight:"600", marginBottom:"0px"}}>{place["properties"].photos.length}</p>
                  <p>фото</p>
                  </div></div>
            </div>
          </div>
          <div style={{width:"100%", height:"1px", alignItems:"center"}}>
            <div style={{width:"100%", height:"1px", backgroundColor:"var(--gray-f5)"}}></div>
          </div>
          <div className='place-description'>
            <p className='text-descriptioin'>{place["properties"].description}</p>
          </div>

          {/* <div style={{"marginLeft": "15vw", "marginTop": "70px", "borderRadius": "20px"}}>
            <MapPlace coords={place["properties"]["coords"]}/>
          </div> */}

          <div style={{height:"25px"}}></div>
          <div className='place-address-cont'>
          <div style={{"borderRadius": "20px"}}>
            <MapPlace coords={place["properties"]["coords"]}/>
          </div>

          </div>
          <div style={{height:"25px"}}></div>

          <div className='tickets-cont'>
            <h2 style={{textAlign:"left"}}>Билеты</h2>
            <div className='calendar'></div>
          </div>

          <div style={{width:"100%", height:"10px", alignItems:"center"}}>
            <div style={{width:"100%", height:"1px", backgroundColor:"var(--gray-f5)"}}></div>
          </div>

          <div className='recommended-places'>
            <div className='buttons'>
              <Dropdown id={1} label={"Рекомендованные"} labels={sort} selectedOption={sortOption} setSelectedOption={setSortOption} />
            </div>
            <div className='recommended-cards'></div>
          </div>

          <div className='tickets-cont'>
            <h2 style={{textAlign:"left"}}>Жилье рядом</h2>

            <div className='recommended-cards' style={{marginBottom:"25px"}}>


            <div className='card-cont'onClick={async event => {navigate(`/places/1`)}} >
              <div className='card-img' style={{backgroundImage:`url("${bruh[0]["photos"][bruh[0]["photos"].length - 2]}")`}}>
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

              
              <div className='button' style={{margin:"15px"}}>
                <p>Забронировать столик</p>
              </div>

            </div>



            </div>
          </div>

        </div>
        <Footer/>
    </div>
  );
}

export default PlacePage;
