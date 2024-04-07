import '../styles/filter.css';
import close from "../assets/icons/close.svg"
import { useState, useEffect } from 'react';
import DropdownRoute from './reusable/dropdown-route';
import arrowDown from "../assets/icons/arrow-down.svg"


const popular = [
  {
    "label":"C детьми",
    "id": 0
  },
  {
    "label":"Музеи",
    "id": 1
  },
  {
    "label":"Зоопарки",
    "id": 2
  }
]

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
  },
  {
    "label":"Cмотровые площадки",
    "id": 5
  },
  {
    "label":"Зоопарки",
    "id": 6
  },
  {
    "label":"Памятники",
    "id": 7
  },
  {
    "label":"Набережные",
    "id": 8
  },
  {
    "label":"Парки",
    "id": 9
  }
]

const rating = [
  {
    "label":"Превосходно: 9+",
    "id": 0
  },
  {
    "label":"Очень хорошо: 8+",
    "id": 1
  },
  {
    "label":"Хорошо: 7+",
    "id": 2
  },
  {
    "label":"Достаточно хорошо: 6+",
    "id": 3
  }
]

const extra = [
  {
    "label":"С детьми",
    "id": 0
  },
  {
    "label":"Рекомендовано",
    "id": 1
  },
  {
    "label":"Развлечения",
    "id": 2
  },
  {
    "label":"Архитектура",
    "id": 3
  },
  {
    "label":"Природа",
    "id": 4
  },
  {
    "label":"Магазины",
    "id": 5
  }
]



const project = [
  {
    "label":"Уличная классика",
    "id": 0
  }
]

function Filter({selectedOption, setSelectedOption, getPlaces}) {
  const [tagOption, setTagOption] = useState(variety[0]);

  const [popularOpen, setPopularOpen] = useState(false);
  const [varietyOpen, setVarietyOpen] = useState(false);
  const [metroOpen, setMetroOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const [chosenTags, setChosenTags] = useState([]);

  function handleTags() {
    setSelectedOption([...selectedOption, ...chosenTags]);
    getPlaces();
    console.log("tags yes", selectedOption)
  }

  useEffect(() => {
    // Здесь можно выполнить действия, зависящие от текущего состояния тегов, например, обновить отображаемые данные
    console.log(chosenTags);
  }, [chosenTags]);

  useEffect(() => {
    getPlaces();
  }, [selectedOption]);

  function handleClear() {
    setSelectedOption([]);
    setTagOption([])
  }

  return (
    <div className="filter-cont">
      <div className='filter'>
        <div className='filter-header'>
          <h1 style={{fontWeight:"500"}}>Фильтры</h1>
         
          {/* <img src={close}></img> */}
        </div>
        {([...selectedOption, chosenTags].length > 0) ? 
          <div className='choosen-tags'>
              {Array.from(new Set([...selectedOption, chosenTags])).map((tag, index) => (

                index != Array.from(new Set([...selectedOption, chosenTags])).length - 1  ? <div className='tag'><p>{tag}</p></div> : <div></div> 

              ))}
          </div> 

          : <div></div>
            
          
          }

        <div>
        <div>
            <div className='filter-topic'>
                <h2 style={{fontWeight:"500"}}>Популярное</h2>
                <img style={(popularOpen) ? {transform:"rotate(180deg)"} : {transform:"rotate(0deg)"}} src={arrowDown} onClick={() => setPopularOpen(!popularOpen)}></img>
            </div>
            {popularOpen &&
            <div className='topic-tags'>
            { popular.map(item => (
                  <div className='tag'><p>{item.label}</p></div>
            ))}
            </div>
            }
            {/* <DropdownRoute id={1} label={""} labels={popular} selectedOption={tagOption} setSelectedOption={setTagOption} /> */}
          </div>

          <div>
            <div className='filter-topic'>
                <h2 style={{fontWeight:"500"}}>Тип</h2>
                <img style={(varietyOpen) ? {transform:"rotate(180deg)"} : {transform:"rotate(0deg)"}} src={arrowDown} onClick={() => setVarietyOpen(!varietyOpen)}></img>
            </div>
            {varietyOpen &&
            <div className='topic-tags'>
            { variety.map(item => (
                <div className='tag' onClick={() => setChosenTags([...chosenTags, item.label])}><p>{item.label}</p></div>
            ))}
            </div>
            }
            {/* <DropdownRoute id={1} label={""} labels={popular} selectedOption={tagOption} setSelectedOption={setTagOption} /> */}
          </div>

          <div>
            <div className='filter-topic'>
                <h2 style={{fontWeight:"500"}}>Ближайшее метро</h2>
                <img style={(metroOpen) ? {transform:"rotate(180deg)"} : {transform:"rotate(0deg)"}} src={arrowDown} onClick={() => setMetroOpen(!metroOpen)}></img>
            </div>
            {metroOpen &&
            <div className='topic-tags'>
              <input></input>
            </div>
            }
            {/* <DropdownRoute id={1} label={""} labels={popular} selectedOption={tagOption} setSelectedOption={setTagOption} /> */}
          </div>

          <div>
            <div className='filter-topic'>
                <h2 style={{fontWeight:"500"}}>Дополнительно</h2>
                <img style={(extraOpen) ? {transform:"rotate(180deg)"} : {transform:"rotate(0deg)"}} src={arrowDown} onClick={() => setExtraOpen(!extraOpen)}></img>
            </div>
            {extraOpen &&
            <div className='topic-tags'>
            { extra.map(item => (
                  <div className='tag'><p>{item.label}</p></div>
            ))}
            </div>
            }
            {/* <DropdownRoute id={1} label={""} labels={popular} selectedOption={tagOption} setSelectedOption={setTagOption} /> */}
          </div>


          <div className='filter-topic'>
            <h2 style={{fontWeight:"500"}}>Бюджет</h2>
            <img style={(budgetOpen) ? {transform:"rotate(180deg)"} : {transform:"rotate(0deg)"}} src={arrowDown} onClick={() => setBudgetOpen(!budgetOpen)}></img>
            {/* <DropdownRoute id={5} label={""} labels={variety} selectedOption={tagOption} setSelectedOption={setTagOption} /> */}
          </div>

          <div>
            <div className='filter-topic'>
                <h2 style={{fontWeight:"500"}}>Рейтинг</h2>
                <img style={(ratingOpen) ? {transform:"rotate(180deg)"} : {transform:"rotate(0deg)"}} src={arrowDown} onClick={() => setRatingOpen(!ratingOpen)}></img>
            </div>
            {ratingOpen &&
            <div className='topic-tags'>
            { rating.map(item => (
                  <div className='tag'><p>{item.label}</p></div>
            ))}
            </div>
            }
            {/* <DropdownRoute id={1} label={""} labels={popular} selectedOption={tagOption} setSelectedOption={setTagOption} /> */}
          </div>

          <div>
            <div className='filter-topic'>
                <h2 style={{fontWeight:"500"}}>Проект</h2>
                <img style={(projectOpen) ? {transform:"rotate(180deg)"} : {transform:"rotate(0deg)"}} src={arrowDown} onClick={() => setProjectOpen(!projectOpen)}></img>
            </div>
            {projectOpen &&
            <div className='topic-tags'>
            { project.map(item => (
                  <div className='tag'><p>{item.label}</p></div>
            ))}
            </div>
            }
            {/* <DropdownRoute id={1} label={""} labels={popular} selectedOption={tagOption} setSelectedOption={setTagOption} /> */}
          </div>

          <div className='buttons-cont' style={{gap:"5px"}}>
            <div className='gray-button' onClick={() => handleClear()} ><p>Сбросить все</p></div>
            <div className='button' onClick={() => handleTags()}><p>Применить</p></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Filter;
