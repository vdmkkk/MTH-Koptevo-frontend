import '../styles/filter.css';
import close from "../assets/icons/close.svg"
import { useState } from 'react';
import DropdownRoute from './reusable/dropdown-route';

const variety = [
  {
    "label":"Все",
    "id": 0
  },
  {
    "label":"Музеи",
    "id": 1
  },
  {
    "label":"Ресторан",
    "id": 2
  },
  {
    "label":"Архитектура",
    "id": 3
  },
  {
    "label":"Улица",
    "id": 4
  }
]


function Filter() {
  const [tagOption, setTagOption] = useState(variety[0]);
  return (
    <div className="filter-cont">
      <div className='filter'>
        <div className='filter-header'>
          <h1 style={{fontWeight:"500"}}>Фильтры</h1>
          <img scr={close}></img>
        </div>

        <div>
          <div style={{display:"flex", alignItems:"center"}}>
            <h2 style={{fontWeight:"500"}}>Тип</h2>
            <DropdownRoute id={1} label={""} labels={variety} selectedOption={tagOption} setSelectedOption={setTagOption} />

          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Filter;
