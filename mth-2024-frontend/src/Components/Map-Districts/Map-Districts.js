import { GoogleMap, LoadScript, Polyline, OverlayView, Marker } from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';


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

function MapDistricts({ districts, currDistrict, setDistrict}) {

    const mapRef = useRef(null);


    const center = {
        lat: 55.751576, 
        lng: 37.618755
    };

    return (
        <LoadScriptOnlyIfNeeded
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                // mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    mapId: "7ec5d822bd262c80"
                }}
                onLoad={map => {
                    mapRef.current = map;
                    // draw();
                }}
                onClick={() => setDistrict(-1)}
            >
            </GoogleMap>
        </LoadScriptOnlyIfNeeded>
    )
}

export default MapDistricts;