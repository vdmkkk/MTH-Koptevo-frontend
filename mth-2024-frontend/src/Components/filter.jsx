import '../styles/filter.css';
import close from "../assets/icons/close.svg"


function Filter() {
  return (
    <div className="filter-cont">
      <div className='filter'>
        <div className='filter-header'>
          <h1>Фильтры</h1>
          <img scr={close}></img>
        </div>

        <div>
          <div></div>
        </div>
      </div>
      
    </div>
  );
}

export default Filter;
