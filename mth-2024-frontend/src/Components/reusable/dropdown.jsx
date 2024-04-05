import '../../styles/dropdown.css';
import arrowDown from "../../assets/icons/arrow-down.svg"
import burgerDD from "../../assets/icons/burger-dd.svg"
import { useState } from 'react';
import checkbox from "../../assets/icons/checkbox.svg"
import checkboxActive from "../../assets/icons/checkbox-active.svg"




function Dropdown({id, label, selectedOption, setSelectedOption, labels}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  var options = labels;


  
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpenMenu(false);
};

  console.log("selectedOption", selectedOption)

  return (
    <div style={{width:"100%"}} className='dropdown-cont'>
      <div className='dropdown' onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <img src={burgerDD} style={{left:"15px"}}></img>
              <p>{(selectedOption == undefined ? label :selectedOption.label)}</p>
              <img src={arrowDown} className={(isOpenMenu == true) ? "opened-img" : "closed-img"} ></img>

      </div>

    {isOpenMenu &&(
        <div className='menu'>
          {options.map((option) => (
            <div className='option' onClick={() => handleSelectOption(option)}>
                <img src={(option.id == ((selectedOption == undefined ? -1 : selectedOption.id))) ? checkboxActive : checkbox}></img>
                <p className='option-text'>{option.label}</p>
            </div>
          ))}
        </div>

    )}
    </div>
  );
}

export default Dropdown;
