import { GoogleMap, LoadScript, Polyline, OverlayView, Marker } from '@react-google-maps/api';
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

function MapPlace({coords}) {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const markerClustererRef = useRef(null);

    const containerStyle = {
        width: '100%',
        height: '440px',
        // borderRadius: "30px"
    };

    const draw = async () => {
        if (mapRef.current) {
            console.log("LOADED MAP")
        }
    }

    useEffect(() => {
        
        const func = async () => {
            await sleep(2000);
            if (mapRef.current) {
                const map = mapRef.current;
                const newMarkers = markersRef.current;
    
                // const styles = [
                //     {
                //         url: 'https://4x4photo.ru/wp-content/uploads/2023/05/4df0de19-e32a-491c-bcab-0d849f3cff9a.jpg',
                //         height: 60,
                //         width: 60,
                //         textColor: '#ffffff',
                //         textSize: 10,
                //     },
                // ];
    
                if (markerClustererRef.current) {
                    markerClustererRef.current.clearMarkers();
                }
                markerClustererRef.current = new MarkerClusterer({ map, newMarkers, });
                    const newMarker = new window.google.maps.Marker({
                        map: mapRef.current,
                        position: coords,
                        icon: {
                            url: marker,
                            scaledSize: new window.google.maps.Size(50, 50),
                        }
                    })
                    console.log("loaded", markerClustererRef)
                    markerClustererRef.current.addMarker(newMarker);
                markerClustererRef.current.render();
            }
        }

        func();
        return () => {
        };
        
    }, [mapRef.current]);
        console.log("API", process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    return(
        <LoadScriptOnlyIfNeeded
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                // mapContainerStyle={containerStyle}
                center={coords}
                zoom={15}
                options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    mapId: "fae79854d0939c40",
                    minZoom: 13,
                    maxZoom: 14,
                }}
                mapContainerStyle={containerStyle}
                
                onLoad={map => {
                    mapRef.current = map;
                    draw();
                }}
            >
            </GoogleMap>
        </LoadScriptOnlyIfNeeded>
    )
}

export default MapPlace;