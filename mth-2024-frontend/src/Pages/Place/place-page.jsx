import './place-page.css';
import Layout from '../../Components/reusable/layout.jsx';
import Footer from '../../Components/reusable/footer.jsx';
import {useParams} from 'react-router-dom';
import bruh from "../../data/places.json"
import mapMarker from "../../assets/icons/marker-pin-01.svg"
import redHeart from "../../assets/icons/red-heart.svg"
import clock from "../../assets/icons/clock.svg"
import Spacer from "../../assets/icons/Spacer.svg"
import { useState } from 'react';
import Dropdown from '../../Components/reusable/dropdown.jsx';
import sort from "../../data/sort.json"
import {useNavigate} from "react-router"


function PlacePage() {
  const id  = useParams();
  
  const [place, setPlace] = useState(bruh[id.placeID]);
  console.log(place)

  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState(sort[0]);
  const [tagOption, setTagOption] = useState();
  const [isOpen, setIsOpen] = useState();

  return (
    <div className="App">
        <Layout>
        </Layout>
        <div className='main-part'>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:"25px", alignItems:"baseline"}}>
              <div className='place-info'>
                <h2 className='place-name'>{place.name}</h2>
                <div style={{display:"flex", gap:"15px", alignItems:"center"}}>
                  <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                    <img src={mapMarker} width={"20px"}></img>
                    <p>{place.address}</p>
                  </div>

                  <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                    <img src={clock} width={"20px"}></img>
                    <p>Сегодня: {place.work_hours["Понедельник"]}</p>
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
                <div className='button' style={{backgroundColor:"var(--gray-f5)"}}><p>Открыть заметки</p></div>
                <div className='button'><p>Перейти к билетам</p></div>
                <div className='button' style={{backgroundColor:"var(--gray-f5)", width:"20px"}}><img src={redHeart} style={{marginRight:"0px", width:"24px"}}></img></div>
                <div className='button' style={{backgroundColor:"var(--green)", color:"white"}}><p>8.8</p></div>
                <div><p>На основе 40 оценок</p></div>
              </div>
          </div>

          <div className='place-photos'>
            <div className='big-place-photo'> <img src={place.photos[place.photos.length - 4]}></img></div>
            <div className='big-place-photo'> <img src={place.photos[place.photos.length - 5]}></img></div>
            <div style={{display:"flex", gap:"10px", flexDirection:"column"}}>
                <div className='small-place-photo'> <img src={place.photos[place.photos.length - 6]}></img></div>
                <div className='small-place-photo' style={{backgroundImage:`url("${place.photos[place.photos.length - 7]}")`}}><div className='more-photo'>
                  <p style={{fontSize:"24px", fontWeight:"600", marginBottom:"0px"}}>{place.photos.length}</p>
                  <p>фото</p>
                  </div></div>
            </div>
          </div>
          <div style={{width:"100%", height:"1px", alignItems:"center"}}>
            <div style={{width:"100%", height:"1px", backgroundColor:"var(--gray-f5)"}}></div>
          </div>
          <div className='place-description'>
            <p className='text-descriptioin'>{place.description}</p>
          </div>

          <div style={{height:"25px"}}></div>
          <div className='place-address-cont'>

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
            <div className='recommended-cards'></div>
          </div>

        </div>
        <Footer/>
    </div>
  );
}

export default PlacePage;
