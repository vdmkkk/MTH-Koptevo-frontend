import '../../styles/dropdown-route.css';
import arrowDown from "../../assets/icons/arrow-down.svg"
import { useState } from 'react';
import checkbox from "../../assets/icons/checkbox.svg"
import checkboxActive from "../../assets/icons/checkbox-active.svg"




function DropdownRoute({id, label, selectedOption, setSelectedOption, labels}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  var options = labels;


  
  const handleSelectOption = (option) => {
    setSelectedOption(id, option);
    setIsOpenMenu(false);
};


  return (
    <div className='dropdown-cont'>
      <div className='dropdown' onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <img src={arrowDown} className={(isOpenMenu == true) ? "opened-img" : "closed-img"} ></img>

      </div>

    {isOpenMenu &&(
        <div className='menu'>
          {options.map((option) => (
            <div className='option' onClick={() => handleSelectOption(option)}>
                <img src={(option.id == ((selectedOption[id] == undefined ? -1 : selectedOption[id].id))) ? checkboxActive : checkbox}></img>
                <p className='option-text'>{option.label}</p>
            </div>
          ))}
        </div>

    )}
    </div>
  );
}

export default DropdownRoute;
