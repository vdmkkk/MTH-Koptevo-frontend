import '../styles/popup.css';

import checkin from "../assets/icons/ph_seal-check-bold.svg"


function PopUp() {
  return (
    <div className="popup">
      <img src={checkin}></img>
      <p>Вы получили 20 бонусов</p>
      <p>за посещение</p>
    </div>
  );
}

export default PopUp;
