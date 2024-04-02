import { useMemo, useState } from "react";
import MapDistricts from "../../Components/Map-Districts/Map-Districts";
import MapDistrictsSidebar from "../../Components/Map-Districts-Sidebar/Map-Districts-Sidebar";

function MapDistrictsPage() {

    const districts = [
        {id: 0, name: "Коптево", colorMain: "#F69E7B", colorActive: "#FC6832", description: "Исторический центр на минималках: уже не так людно, как рядом с Дворцовой и Невским, но всё так же близко к достопримечательностям. В этом районе много современных и креативных мест, которые неизменно притягивают модную тусовку.", tags: ["шоппинг", "культурный", "рестораны"], "localComment": {name: "Заман", time: "6 мес.", text: "Чтобы насладиться вайбом купеческой Москвы без толп, сверните с Малой Бронной в Трёхпрудный переулок или погуляйте по Спиридоновке."}, coords: [{lat: 55.819224, lng: 37.517778}, {lat: 55.831852, lng: 37.509491}, {lat: 55.848192, lng: 37.554631}, {lat: 55.845008, lng: 37.560492}, {lat: 55.833597, lng: 37.534352}], markerCoords: {lat: 55.831575, lng: 37.526178}}
    ]

    const [currDistrict, setCurrDistrict] = useState(-1);
    const open = useMemo(() => {return districts.filter(district => district.id == currDistrict)[0] === undefined ? false : true}, [currDistrict]);
    // console.log(districts.filter(district => district.id == currDistrict)[0]);
    console.log(currDistrict, open);
    return (
        <div>
            <MapDistricts districts={districts} currDistrict={currDistrict} setDistrict={setCurrDistrict}/>
            <MapDistrictsSidebar open={open} district={districts.filter(district => district.id == currDistrict)[0]} />
        </div>
        
    )
}

export default MapDistrictsPage;