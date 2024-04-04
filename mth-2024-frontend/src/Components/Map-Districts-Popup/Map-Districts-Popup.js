import { useEffect, useMemo, useState } from "react";
import MapDistricts from "../Map-Districts/Map-Districts";
import MapDistrictsSidebar from "../Map-Districts-Sidebar/Map-Districts-Sidebar";
import './Map-Districts-Popup.scss'
import close from '../../assets/icons/close.svg'
import axios from "axios";

function MapDistrictsPopup({isOpen, setIsOpen, currDistrict, setCurrDistrict}) {

    const [districts, setDistricts] = useState([])

    useEffect(() => {
        axios.get('http://217.18.63.245:8080/district/by_city_id?id=1').then((res) => {
            setDistricts(res.data);
            console.log("hey", res.data)
        })
    }, [])

    const open = useMemo(() => {return districts.filter(district => district.id == currDistrict)[0] === undefined ? false : true}, [currDistrict]);
    // console.log(districts.filter(district => district.id == currDistrict)[0]);
    console.log(currDistrict, open);
    if (isOpen && districts.length > 0)
    return (
        <div className="overlay">
            <div className="popup">
                <MapDistricts districts={districts} currDistrict={currDistrict} setDistrict={setCurrDistrict} isOpen={isOpen}/>
                <MapDistrictsSidebar open={open} district={districts.filter(district => district.id == currDistrict)[0]} setOpen={setCurrDistrict} setPopupOpen={setIsOpen} />
                <div className="close" onClick={() => setIsOpen(false)}>
                    <img src={close}/>
                </div>
            </div>
        </div>
        
    )
}

export default MapDistrictsPopup;