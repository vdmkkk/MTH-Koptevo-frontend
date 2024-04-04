import './places-page.css';
import Layout from '../../Components/reusable/layout.jsx';
import Footer from '../../Components/reusable/footer.jsx';
import loopa from "../../assets/icons/loopa.svg"
import calendar from "../../assets/icons/calendar.svg"
import arrowDown from "../../assets/icons/arrow-down.svg"
import plus from "../../assets/icons/+.svg"
import burgerDD from "../../assets/icons/burger-dd.svg"
import mapMarker from "../../assets/icons/marker-pin-01.svg"
import food from "../../assets/icons/food.svg"
import check from "../../assets/icons/coins-03.svg"
import kitchen from "../../assets/icons/kitchen.svg"
import cardImg from "../../assets/img/card-img.png"
import whiteheart from "../../assets/icons/white-heart.svg"
import heart from "../../assets/icons/heart.svg"
import coin from "../../assets/icons/black-coin.svg"
// import bruh from "../../data/places.json"
import {useNavigate} from "react-router"
import Dropdown from '../../Components/reusable/dropdown.jsx';
import { useState, useEffect } from 'react';
import labels1 from "../../data/sort.json"
import MapDistrictsPopup from '../../Components/Map-Districts-Popup/Map-Districts-Popup';
import close from '../../assets/icons/close.svg'
import axios from 'axios';


const tags = [
  {
    label:"Кафе",
    id: 0
  },
  {
    label:"Бары",
    id: 1
  },
  {
    label:"Рестораны",
    id: 2
  },
  {
    label:"Харчевни",
    id: 3
  }
]

function PlacesPage() {
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState(labels1[0]);
  const [tagOption, setTagOption] = useState();
  const [isOpen, setIsOpen] = useState();
  const [districtsOpen, setDistrictsOpen] = useState(false);
  const [currDistrict, setCurrDistrict] = useState(-1);
  const [bruh, setBruh] = useState([]); // NAMING XDDD

  const getPlaces = async () => {
    await axios.put("http://217.18.63.245:8080/place/get_all_with_filter", {pagination_page: 1}).then((res) => {
      console.log("lol", res.data);
      setBruh(res.data);
    })
  }

  useEffect(() => {
    getPlaces();
  }, []);

  const [districts, setDistricts] = useState([])

    useEffect(() => {
        axios.get('http://217.18.63.245:8080/district/by_city_id?id=1').then((res) => {
            setDistricts(res.data);
            console.log("hey", res.data)
        })
    }, [])

  useEffect(() => {
    if (districtsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [districtsOpen]);
  
  return (
    <div style={{"overflow": districtsOpen ? "hidden" : "auto"}} className="App">
        <MapDistrictsPopup isOpen={districtsOpen} setIsOpen={setDistrictsOpen} currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>
        <Layout/>
        <div className='main-part'>
          <div>
            <div style={{display:"flex", justifyContent:"flex-start"}}>
              <p style={{fontSize:"32px", fontFamily:"Proto Grotesk"}}>Рестораны и кафе</p>
            </div>
            <div className='search-cont'>
              <div style={{width:"60%", display:"flex", alignItems:"center"}} className='input-cont'>
                <img className='input-img' src={loopa} style={{right:"15px"}}/>
                <input className='input-1' placeholder='Найти маршрут, экскурсию или город...'></input>
              </div>
              <div className='input-cont' style={{width:"30%", display:"flex", alignItems:"center"}}>
                <img className='input-img' src={calendar} alt="" style={{left:"15px"}} />
                <input style={{paddingLeft:"40px"}} placeholder='Дата' className='input-1'></input>
              </div>
              <div className='button' style={{width:"5%"}}>
                <p>Найти</p>
              </div>
            </div>
          </div>

          <div className='buttons-cont'>
            
            <Dropdown id={1} label={"Рекомендованные"} labels={labels1} selectedOption={sortOption} setSelectedOption={setSortOption} />
            <Dropdown id={2} label={"Теги"} labels={tags} selectedOption={tagOption} setSelectedOption={setTagOption}  />
            
            <div onClick={() => setDistrictsOpen(true)} className='dropdown' style={districts.filter(dist => dist["id"] == currDistrict)[0] == undefined ? {} : {"backgroundColor": "#FFCF08"}}>
              <p>{districts.filter(dist => dist["id"] == currDistrict)[0] == undefined ? "Выбрать район" : districts.filter(dist => dist["id"] == currDistrict)[0]["name"]}</p>
              {districts.filter(dist => dist["id"] == currDistrict)[0] == undefined ? <></> : <div style={{"zIndex": 997, display:"flex", alignItems:"center"}} onClick={() => {setCurrDistrict(-1); setDistrictsOpen(false);}}><img src={close} style={{"marginLeft": "110px", "width": '14px'}} /></div>}
            </div>
            <div className='button' style={{width:"25%", justifyContent:"flex-start"}}> 
              <img src={plus}></img>
              <p>Поездка</p>
            </div>
          </div>


          <div className='cards-places'>

            {bruh.length > 0 ? bruh.map((card, index) => (
            <div className='card-cont'onClick={async event => {navigate(`/places/${card["id"]}`)}} >
              {console.log("bruh", card)}
              <div className='card-img' style={{backgroundImage:`url("${card["properties"]["photos"][card["properties"]["photos"].length - 1]}")`}}>
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
                    <p>{card["properties"]["address"]}</p>
                  </div>

                  <div style={{display:"flex", gap:"10px"}}>
                  <div className='card-tag'>
                    <img src={food}></img>
                    <p> {card["variety"]}</p>
                  </div>
                  {(card["properties"]["features"]["Средний счет"] == undefined) ? <div></div> : 
                  <div className='card-tag'>
                    <img src={check}></img>
                    <p> Средний чек {card["properties"]["features"]["Средний счет"]}</p>
                  </div> 
                  }
                  </div>
                  {(card["properties"]["features"]["Тип кухни"] == undefined) ? <div></div> : 
                  <div className='card-tag'>
                  <img src={kitchen}></img>
                    <p>{card["properties"]["features"]["Тип кухни"].slice(0, 50)}{(card["properties"]["features"]["Тип кухни"].length > 50) ? "..." : ""}</p>
                  </div>
                  }
                </div>
                
              </div>

              
              <div className='button' style={{margin:"15px"}}>
                <p>Забронировать столик</p>
              </div>

            </div>



          )) : <div/>}

          </div>

        </div>
        <Footer/>
    </div>
  );
}

export default PlacesPage;
