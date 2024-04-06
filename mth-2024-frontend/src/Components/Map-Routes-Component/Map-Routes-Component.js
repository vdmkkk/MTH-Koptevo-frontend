import MapRoutes from "../Map-Routes/Map-Routes";
import "./Map-Routes-Component.scss"
import walkingIcon from "../../assets/icons/walking.svg"
import arrowDown from '../../assets/icons/arrow-down.svg'
import DropdownRoute from "../reusable/dropdown-route";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ticket from "../../assets/icons/ticket.svg"
import food from "../../assets/icons/food.svg"



function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
        return minutes > 0 ? `${hours} 'ч.' ${minutes} 'мин.'` : hours + ' ч.';
    } else if (minutes > 0) {
        return `${minutes} 'мин.'`;
    } else {
        return 'Меньше минуты.'
    }
}


function MapRoutesComponent({ places }) {

    const [ETATable, setETATable] = useState({})
    const translate = {
        "Пешком": "WALKING",
        "На машине": "DRIVING",
        "На велосипеде": "BICYCLING",
        "Общественным транспортом": "TRANSIT"
    }

    const [allLabels, setAllLabels] = useState(Array.from({ length: places.length - 1 }).reduce((acc, _, index) => {
        acc[index] =  [{ id: 1, label: "Пешком" }, { id: 2, label: "На машине" }, { id: 3, label: "На велосипеде" }, { id: 4, label: "Общественным транспортом" }]; // Customize the value as needed
        return acc;
    }, {}))
    const [allOptions, setAllOptions] = useState(Array.from({ length: places.length - 1 }).reduce((acc, _, index) => {
        acc[index] = { id: 1, label: "Пешком" }; // Customize the value as needed
        return acc;
    }, {}))




    useEffect(() => {
        const translate1 = {
            "Пешком": "WALK",
            "На машине": "DRIVE",
            "На велосипеде": "BICYCLE",
            "Общественным транспортом": "TRANSIT"
        }
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
                travelMode: translate1[travelMode],
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
                // console.error(e);
                
                var resObject = new Object;
                resObject[i] = { distance: -1, duration: -1, travelMode: travelMode };
                return resObject;
            }
        }

        async function fetchAllDistances() {
            const promises = [];
            for (let i = 0; i < places.length - 1; i++) {
                Object.keys(translate).forEach(mode => {
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
            // console.log('table', newResults)
            setETATable(newResults);
            var newLabels = {}
            var mockLabel = [{ id: 1, label: "Пешком" }, { id: 2, label: "На машине" }, { id: 3, label: "На велосипеде" }, { id: 4, label: "Общественным транспортом" }];
            Object.keys(newResults).forEach(res => {
                let newLabels1 = []
                mockLabel.forEach(label => {
                    if (newResults[res].filter(obj => obj["travelMode"] == label.label)[0]["distance"] != -1) newLabels1.push(label);
                })
                newLabels[res] = newLabels1;
            })
            setAllLabels(newLabels);
            
        }

        fetchAllDistances();
    }, []);

    const updateOption = (optionId, obj) => {
        setAllOptions(prevOptions => ({
          ...prevOptions,
          [optionId]: {
            ...prevOptions[optionId],
            id: obj.id,
            label: obj.label,
          },
        }));
      };

    if (Object.keys(ETATable).length > 0)
    return (
        <div className="container">
            <div className="details">
                {places.map(place => {
                    return (
                        <div>
                            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <div className="card">
                                <img src={place["place"]["properties"].photos[0]} />
                                <div className="info">
                                    <div className="features">
                                        <p>30 мин.</p>
                                        <p style={{fontSize:"32px", color:"var(--gray-a7)", marginBottom:"4px"}}>•</p>
                                        <p>{place["place"].variety}</p>
                                    </div>
                                    <h1>{place["place"].name}</h1>
                                    <h2>{place["place"]["properties"].address}</h2>
                                </div>
                            </div>
                            
                            {(place["place"]["variety"] == "Музеи" || place["place"]["variety"] == "Театры" || place["place"]["variety"] == "Развлечения" ) ?
                            <div className="ticket-button">
                                <img src={ticket}></img>
                            </div>
                            : (place["place"]["variety"] == "Ресторан") ? 
                            <div className="ticket-button">
                                <img style={{width:"20px"}} src={food}></img>
                            </div>
                        : <div/>
                }

                
                        </div>
                            {places.indexOf(place) != places.length - 1 ? <div className="transport">
                                <img src={walkingIcon} />
                                <div className="info">
                                    <p>{(ETATable[places.indexOf(place)].filter(obj => obj["travelMode"] == allOptions[places.indexOf(place)]["label"])[0]["distance"] / 1000).toFixed(2)} км</p>
                                    <p style={{fontSize:"18px", color:"var(--gray-a7)", marginBottom:"8px"}}>•</p>
                                    {console.log(formatTime(ETATable[places.indexOf(place)].filter(obj => obj["travelMode"] == allOptions[places.indexOf(place)]["label"])[0]["duration"].slice(0, -1))) }
                                    <p>{formatTime(ETATable[places.indexOf(place)].filter(obj => obj["travelMode"] == allOptions[places.indexOf(place)]["label"])[0]["duration"].slice(0, -1))}</p>
                                    
                                    <DropdownRoute id={places.indexOf(place)} label={""} labels={allLabels[places.indexOf(place)]} selectedOption={allOptions} setSelectedOption={updateOption} />
                                </div>
                            </div> : <></>}
                        </div>
                    )
                })}
            </div>
                

            <MapRoutes places={places} placesOptions={allOptions}/>

        </div>
    )
}

export default MapRoutesComponent;