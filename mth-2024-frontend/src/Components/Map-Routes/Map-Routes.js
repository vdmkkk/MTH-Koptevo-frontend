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

function MapRoutes({ places }) {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const markerClustererRef = useRef(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [loaded, setLoaded] = useState(false)

    const containerStyle = {
        width: '100%',
        height: '440px',
        // borderRadius: "30px"
    };


    useEffect(() => {
        const func = async () => {
            if (mapRef.current) {
                await sleep(2000);
                const directionsService = new window.google.maps.DirectionsService();
                const directionsRenderer = new window.google.maps.DirectionsRenderer();
                directionsRenderer.setMap(mapRef.current)
    
                const waypoints = [
                    { location: { lat: 55.735583, lng: 37.576132 }, stopover: true, mode: 'DRIVING' },
                    { location: { lat: 55.760243, lng: 37.589239 }, stopover: true, mode: 'DRIVING' }, // Example waypoint
                    { location: { lat: 55.772318, lng: 37.636242 }, stopover: true, mode: 'DRIVING' }
                ];
                console.log('bruh', waypoints.slice(1, waypoints.length - 1).map(waypoint => ({ location: waypoint.location, stopover: waypoint.stopover })))
                directionsService.route(
                    {
                        origin: waypoints[0]["location"],
                        destination: waypoints[waypoints.length - 1]["location"],
                        travelMode: "DRIVING",
                        waypoints: waypoints.slice(1, waypoints.length - 1).map(waypoint => ({ location: waypoint.location, stopover: waypoint.stopover })),
                    },
                    function(result, status) {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            console.log("result", result.routes)
                            directionsRenderer.setDirections(result);
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    }
                );
            }
        }
        func();
    }, [mapRef.current, loaded]);

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
                    mapId: "7ec5d822bd262c80",
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