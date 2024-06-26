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
import mapMarker from "../../assets/icons/marker-pin-01.svg"
import book from "../../assets/icons/book.svg"
import spb from "../../assets/img/spb.jpg"
import labels1 from "../../data/sort.json"
import cities from "../../data/cities.json"
import whiteheart from "../../assets/icons/white-heart.svg"
import heart from "../../assets/icons/red-heart.svg"
import Dropdown from '../../Components/reusable/dropdown';
import sea from "../../assets/img/sea.jpg"
import sibir from "../../assets/img/sibir.jpg"
import surgut from "../../assets/img/surgut.jpg"
import greenClose from "../../assets/icons/green-close.svg"
import coin from "../../assets/icons/Bonus-icon.svg"
import arrowDown from "../../assets/icons/arrow-down.svg"
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function formatDate(date) {
  // Get the day and month from the date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12

  // Format day and month to ensure they are two digits
  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  // Construct and return the formatted date string
  return `${formattedDay}.${formattedMonth}`;
}



function ProfilePage() {

  const params = useParams();

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
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState(null);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [likedRoutes, setLikedRoutes] = useState([]);
  // useEffect(() => {
  //   if (cookies.JWT == null) {
  //     navigate('/login');
  //   }
  // }, [])
  useEffect(() => {
    if (cookies.JWT != null) {
      axios.get(`${process.env.REACT_APP_ZAMAN_API}/user/properties?id=${params.id}`).then(res => {
        console.log("user", res.data)
        setUser(res.data);
        getTrips();
        getLiked();
      })
    }
  }, [])

  const getTrips = async () => {
    await axios.get(`${process.env.REACT_APP_ZAMAN_API}/trip/by_user_id?id=${params.id}`).then(res => {
      setTrips(res.data);
      console.log('trips', res.data);
    })
  } 
  

  const getLiked = async () => {
    await  axios.get(`${process.env.REACT_APP_ZAMAN_API}/favourite/by_user_id?id=${cookies.JWT}`).then((res) => {
      setLikedPlaces(res.data["places"]);
      setLikedRoutes(res.data["routes"]);
      console.log('liked', res.data["places"]);
    })
  }

  if (user)
  return (
    <div className="App">
      {redirectMain && <Navigate replace to="/" />}
      {redirectLogin && <Navigate replace to="/login" />}
      <Layout/>
      <div className='main-part'>
        <div onClick={() => handleLogOut()} className='logout-button'>
          <img src={arrowDown} style={{transform:"rotate(90deg)"}}></img>
           <p>ВЫЙТИ</p>
        </div>
        <h2 style={{textAlign:"left", fontWeight:"500"}}>Профиль</h2>
        <div className='two-blocks-flex'>
            <div className='user-info'>
                <div className='top'>
                    <div style={{overflow:"hidden", borderRadius:"100px", width:"139px", height:"139px"}}><img src={user["properties"]["photo"]}></img></div>
                    
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", gap:"8px"}}>
                        <h1>Василий Иванов</h1>
                        <p style={{color:"var(--gray-75)", marginTop:"0px", marginBottom:"0px"}}>@{user['login']}</p>
                        <div className='profile-tags' style={{marginTop:"8px"}}>
                          <div className='tag' > <p style={{fontSize:"12px"}}>{user["properties"]["city"]}</p></div>
                          {user["properties"]["tags"].map(tag => {return(
                            <div className='tag' > <p style={{fontSize:"12px"}}>{tag}</p></div>
                          )})}
                        </div>

                    </div>
                </div>
                <div style={{backgroundColor:"var(--gray-f5)", padding:"1px 16px 1px 16px", borderRadius:"12px", marginTop:"16px"}}>
                    <p style={{ fontSize:"20px", color:"var(--gray-75)", fontWeight:"600", marginBottom:"0px"}}>Cтатус:</p>
                    <p style={{ fontSize:"20px", fontWeight:"600", marginTop:"0px"}}>{user["properties"]["status"]}</p>
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
        {user["current_trip_start_date"] ? 
        trips ? 
        <div className='big-button' style={{backgroundImage:`url(${spb})`}} >
          <div style={{margin:"20px", display:"flex", justifyContent:"space-between", height:"-webkit-fill-available"}}>
              <div>
                <h2>{trips[0]["properties"]["name"]}</h2>
                <p>{trips[0]["properties"]["city"]}</p>
                <p>{formatDate(new Date(trips[0]["date_start"]))} - {formatDate(new Date(trips[0]["date_end"]))}</p>
                <p>Текущая поездка</p>
              </div>

              <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"200px", width:"30%", alignItems:"end", justifyContent: "flex-end"}}>
                <div className='white-button' style={{marginRight:"0px"}} onClick={() => navigate(`/trip/${trips[0]["id"]}`)}><p>Перейти к поездке</p></div>
              </div>
          </div>
        </div> : <></>
        : <div>Сейчас нет поездок :(</div> }

        <div style={{height:"25px"}}></div>

        <div className='profile-divisions'>
          <p className={(isOpenDiv == 1) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(1)}>Избранное</p>
          <p className={(isOpenDiv == 2) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(2)}>Поездки</p>
          <p className={(isOpenDiv == 3) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(3)}>Хронология</p>
          <p className={(isOpenDiv == 4) ? 'choosen-division' : 'non-choosen-division'} onClick={() => setIsOpenDiv(4)}>Анкета путешественника</p>
        </div>

        {(isOpenDiv == 1) ?
        <div>
          <div className='dropdown-cont'>
            <Dropdown id={1} label={"Любые"} labels={labels1} selectedOption={sortOption} setSelectedOption={setSortOption} ></Dropdown>
            <Dropdown id={2} label={"Москва"} labels={cities} selectedOption={sortCity} setSelectedOption={setSortCity} ></Dropdown>
          </div>
          <div style={{height:"24px"}}></div>
          <h2 style={{textAlign:"left", fontWeight:"500"}}>Места</h2>
          <div className='cards-places'>
          {likedPlaces.map((card) => (
                  <div className='card-cont'onClick={async event => {navigate(`/routes/`)}} >
                  <div className='card-img' style={{backgroundImage:`url("${card["properties"]["photos"][0]}")`}}>
                    <div className='img-tags'>
                      <div className='left-img-tags'>
                      <div className='img-tag'>
                        <img src={coin}></img>
                      </div>
                    </div>
                    <div className='like-tag'>
                      <img src={heart}></img>
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

              ))}
          </div>


          <h2 style={{textAlign:"left", fontWeight:"500"}}>Маршруты</h2>
          <div className='cards-places'>
          {likedRoutes.map((card) => (
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
                    {/* <div className='card-tag'>
                      <img src={mapMarker}></img>
                      <p>{card["properties"]["address"]}</p>
                    </div> */}

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

              ))}
          </div>
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
              <textarea disabled={true} type='text' className='about-filed' value={user["properties"]["form"]}></textarea>
            </div>
            <div className='about-filed-cont'>
              <h2 style={{textAlign:"left", fontWeight:"500"}}>Теги</h2>
              <div className='tags-filed'>
                <p style={{textAlign:"left"}}>Добавьте подходящие вам категории</p>
                <div className='profile-tags' style={{marginTop:"8px", backgroundColor:"#EBEBEB", padding:"10px", borderRadius:"12px"}}>
                          <img className={(isTagsOpen == true) ? 'tag-arrow-opened' : 'tag-arrow'}  src={arrowDown} onClick={() => setIsTagsOpen(!isTagsOpen)}></img>
                          {user["properties"]["tags"].map(tag => {
                            return (
                              <div className='tag' > <p style={{fontSize:"12px"}}>{tag}</p> <img src={greenClose}></img></div>
                            )
                          })}
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
