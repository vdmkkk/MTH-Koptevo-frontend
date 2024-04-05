import { GoogleMap, LoadScript, Polyline, OverlayView, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useRef, useState, useEffect } from 'react';
import marker from '../../assets/Images/marker.png'


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


class LoadScriptOnlyIfNeeded extends LoadScript {
    componentDidMount() {
        const cleaningUp = true
        const isBrowser = typeof document !== "undefined" // require('@react-google-maps/api/src/utils/isbrowser')
        const isAlreadyLoaded = window.google && window.google.maps && document.querySelector('body.first-hit-completed') // AJAX page loading system is adding this class the first time the app is loaded
        if (!isAlreadyLoaded && isBrowser) {
            // @ts-ignore
            if (window.google && !cleaningUp) {
                console.error("google api is already presented")
                return
            }

            this.isCleaningUp().then(this.injectScript)
        }

        if (isAlreadyLoaded) {
            this.setState({ loaded: true })
        }
    }
}

function MapRoutes({ places, placesOptions }) {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const serviceRef = useRef([]);
    const rendererRef = useRef([]);
    const markerClustererRef = useRef(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [loaded, setLoaded] = useState(false)
    console.log(placesOptions)
    const containerStyle = {
        width: '40%',
        // height: '100vh',
        // borderRadius: "30px"
    };

    const translate = {
        "Пешком": "WALKING",
        "На машине": "DRIVING",
        "На велосипеде": "BICYCLING",
        "Общественным транспортом": "TRANSIT"
    }


    useEffect(() => {
        const func = async () => {
            const lineSymbol = {
                path: "M 0,-1 0,1",
                strokeOpacity: 1,
                scale: 4,
            };
            if (mapRef.current) {
                await sleep(2000);
                for (let j = 0; j < rendererRef.current.length; j++) {
                    if (rendererRef.current[j]) {
                        rendererRef.current[j].setMap(null);
                    }
                }
                for (let k = 0; k < Object.keys(placesOptions).length; k++) {
                    const directionsService = new window.google.maps.DirectionsService();
                    const directionsRenderer = new window.google.maps.DirectionsRenderer({
                        polylineOptions: {
                            strokeColor: '#00ff00',
                            strokeOpacity: 1,
                            strokeWeight: 2,
                            zIndex: 1,
                            idcons: [{
                                icon: lineSymbol,
                                offset: '0',
                                repeat: '20px'
                            }],
                        },
                    });
                    directionsRenderer.setMap(mapRef.current)
                    directionsService.route(
                        {
                            origin: places[k]["place"]["properties"]["coords"],
                            destination: places[k + 1]["place"]["properties"]["coords"],
                            travelMode: translate[placesOptions[k]["label"]],
                        },
                        function (result, status) {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                directionsRenderer.setDirections(result);
                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        }
                    );
                    rendererRef.current.push(directionsRenderer);
                }
                
            }
        }
        func();
    }, [mapRef.current, loaded, placesOptions]);

    return (
        <LoadScriptOnlyIfNeeded
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                // mapContainerStyle={containerStyle}
                center={places[0]["place"]["properties"]["coords"]}
                zoom={15}
                options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    mapId: "fae79854d0939c40",
                }}
                mapContainerStyle={containerStyle}

                onLoad={map => {
                    mapRef.current = map;
                    setLoaded(true);
                }}
            >
            </GoogleMap>
        </LoadScriptOnlyIfNeeded>
    )
}

export default MapRoutes;