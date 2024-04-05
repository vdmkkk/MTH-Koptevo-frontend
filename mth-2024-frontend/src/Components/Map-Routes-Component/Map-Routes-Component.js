import MapRoutes from "../Map-Routes/Map-Routes";
import "./Map-Routes-Component.scss"
import walkingIcon from "../../assets/icons/walking.svg"
import arrowDown from '../../assets/icons/arrow-down.svg'
import DropdownRoute from "../reusable/dropdown-route";
import { useState, useEffect, useRef } from "react";
import axios from "axios";




function MapRoutesComponent({ places }) {

    const [bruh, setBruh] = useState()

    const translate = {
        "Пешком": "WALKING",
        "На машине": "DRIVING",
        "На велосипеде": "BICYCLING",
        "Общественным транспортом": "TRANSIT"
    }

    const labels = [{ id: 1, label: "Пешком" }, { id: 2, label: "На машине" }, { id: 3, label: "На велосипеде" }, { id: 4, label: "Общественным транспортом" }]

    const [allOptions, setAllOptions] = useState(Array.from({ length: places.length - 1 }).reduce((acc, _, index) => {
        acc[index] = { id: 1, label: "Пешком" }; // Customize the value as needed
        return acc;
    }, {}))

    const [ETA, setETA] = useState(Array.from({ length: places.length - 1 }).reduce((acc, _, index) => {
        acc[index] = { "mode": "WALKING", "time": 0, "distance": 0 }; // Customize the value as needed
        return acc;
    }, {}));

    useEffect(() => {
        async function getDistanceAndTime(i, origin, destination, travelMode) {
            const data = {
                origin: {
                    location: {
                        latLng: {
                            latitude: origin.lat,
                            longitude: origin.lng,
                        },
                    },
                },
                destination: {
                    location: {
                        latLng: {
                            latitude: destination.lat,
                            longitude: destination.lng,
                        },
                    },
                },
                travelMode: "WALK",
                computeAlternativeRoutes: false,
                routeModifiers: {
                    avoidTolls: false,
                    avoidHighways: false,
                    avoidFerries: false,
                },
                languageCode: "ru-RU",
                units: "METRIC",
            };
            const headers = {
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            };

            try {
                const res = await axios.post(`https://routes.googleapis.com/directions/v2:computeRoutes`, data, { headers: headers });
                if (res.status === 200 && res.data.routes.length > 0) {
                    const { distanceMeters, duration } = res.data.routes[0];
                    var resObject = new Object;
                    resObject[i] = { distance: distanceMeters, duration, travelMode: travelMode };
                    return resObject;
                } else {
                    throw new Error('Failed to fetch directions or no routes found');
                }
            } catch (e) {
                console.error(e);
                return { distance: -1, duration: -1 };
            }
        }

        async function fetchAllDistances() {
            const promises = [];
            for (let i = 0; i < places.length - 1; i++) {
                Object.values(translate).forEach(mode => {
                    const promise = getDistanceAndTime(i, places[i]["place"]["properties"]["coords"], places[i + 1]["place"]["properties"]["coords"], mode);
                    promises.push(promise);
                });
            }

            var results = await Promise.all(promises);
            var newResults = {};
            results.forEach(res => {
                if (!Object.keys(newResults).includes(Object.keys(res)[0])) newResults[Object.keys(res)[0]] = [Object.values(res)[0]];
                else newResults[Object.keys(res)[0]].push(Object.values(res)[0]);
            })
            setBruh(newResults); // Assuming you want to store all results in the state
        }

        fetchAllDistances();
    }, []); // Make sure to include all external variables in the dependency array

    useEffect(() => { console.log(bruh) }, [bruh])

    useEffect(() => {
        var newETA = ETA;
        for (let i = 0; i < places.length - 1; i++) {
            newETA[i]["mode"] = translate[allOptions[i]["label"]];

        }
        setETA(newETA);

    }, [...Object.values(allOptions).map(obj => { return obj["id"] })]) // ! Я НЕНАВИЖУ ДЖАВАСКРИПТ DDDDDDDD;

    return (
        <div className="container">
            <div className="details">
                {places.map(place => {
                    return (
                        <div>
                            <div className="card">
                                <img src={place["place"]["properties"].photos[0]} />
                                <div className="info">
                                    <div className="features">
                                        <p>30 мин.</p>
                                        •
                                        <p>{place["place"].variety}</p>
                                    </div>
                                    <h1>{place["place"].name}</h1>
                                    <h2>{place["place"]["properties"].address}</h2>
                                </div>
                            </div>
                            {places.indexOf(place) != places.length - 1 ? <div className="transport">
                                <img src={walkingIcon} />
                                <div className="info">
                                    <p>1 км</p>
                                    •
                                    <p>10 мин</p>
                                    <DropdownRoute id={places.indexOf(place)} label={""} labels={labels} selectedOption={allOptions} setSelectedOption={setAllOptions} />
                                </div>
                            </div> : <></>}
                        </div>
                    )
                })}
            </div>

            <MapRoutes places={places} />
        </div>
    )
}

export default MapRoutesComponent;