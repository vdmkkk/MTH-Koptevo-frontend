import { GoogleMap, LoadScript, Polyline, OverlayView, Marker } from '@react-google-maps/api';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useRef, useState, useEffect } from 'react';

// * DISTRICTS LABELS
import main0 from '../../Assets/Images/Districts/main0.png'
import main1 from '../../Assets/Images/Districts/main1.png'

const districtLabels = {
    0: main0,
    1: main1,

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

function MapDistricts({ districts, currDistrict, setDistrict }) {
    const [loaded, setLoaded] = useState(false);
    const mapRef = useRef(null);
    const districtRef = useRef([]);
    const markersRef = useRef([]);
    const markerClustererRef = useRef(null);
    const allowedBoundsRef = useRef(null);


    const center = {
        lat: 55.751576,
        lng: 37.618755
    };

    const containerStyle = {
        width: '100vw',
        height: '100vh',
    };

    const checkBounds = () => {
        if (mapRef.current) {
            const currentCenter = mapRef.current.getCenter();
            if (!allowedBoundsRef.current.contains(currentCenter)) {
                let newCenter = currentCenter;

                if (currentCenter.lat() > allowedBoundsRef.current.getNorthEast().lat()) {
                    newCenter = new window.google.maps.LatLng(allowedBoundsRef.current.getNorthEast().lat(), newCenter.lng());
                } else if (currentCenter.lat() < allowedBoundsRef.current.getSouthWest().lat()) {
                    newCenter = new window.google.maps.LatLng(allowedBoundsRef.current.getSouthWest().lat(), newCenter.lng());
                }

                if (currentCenter.lng() > allowedBoundsRef.current.getNorthEast().lng()) {
                    newCenter = new window.google.maps.LatLng(newCenter.lat(), allowedBoundsRef.current.getNorthEast().lng());
                } else if (currentCenter.lng() < allowedBoundsRef.current.getSouthWest().lng()) {
                    newCenter = new window.google.maps.LatLng(newCenter.lat(), allowedBoundsRef.current.getSouthWest().lng());
                }

                mapRef.current.panTo(newCenter);
            }
        }
    };

    const draw = async () => {
        districts.forEach(coordSet => {
            if (mapRef.current) {
                const polygon = new window.google.maps.Polygon({
                    path: coordSet["coords"],
                    geodesic: true,
                    strokeOpacity: 0,
                    fillOpacity: .65,
                    fillColor: coordSet["colorMain"],
                });
                polygon.addListener("click", (e) => {
                    e.stop(); // Prevent the event from propagating to the map
                    setDistrict(coordSet["id"]);
                    mapRef.current.panTo(coordSet["markerCoords"]);
                });
                addHoverListeners(polygon, coordSet["colorActive"], coordSet["colorMain"]);
                polygon.set("id", coordSet["id"]);
                polygon.set("colorMain", coordSet["colorMain"]);
                polygon.set("colorActive", coordSet["colorActive"])
                setLoaded(true); // ! EVIL SHIT
                polygon.setMap(mapRef.current);
                districtRef.current.push(polygon);
            }
        });
    }

    function addHoverListeners(polygon, colorActive, colorMain) {
        const mouseoverListener = polygon.addListener("mouseover", (e) => {e.stop(); polygon.setOptions({ fillColor: colorActive })});
        const mouseoutListener = polygon.addListener("mouseout", (e) => {e.stop(); polygon.setOptions({ fillColor: colorMain })});
        polygon.set("mouseoverListener", mouseoverListener);
        polygon.set("mouseoutListener", mouseoutListener);
    }

    function removeHoverListeners(polygon) {
        window.google.maps.event.removeListener(polygon.get("mouseoverListener"));
        window.google.maps.event.removeListener(polygon.get("mouseoutListener"));
    }

    useEffect(() => {
        districtRef.current.forEach(polygon => {
            if (polygon.get("id") === currDistrict) {
                polygon.setOptions({ fillColor: polygon.get("colorActive") });
                removeHoverListeners(polygon);
            } else {
                polygon.setOptions({ fillColor: polygon.get("colorMain") });
                removeHoverListeners(polygon); // Ensure no duplicate listeners
                addHoverListeners(polygon, polygon.get("colorActive"), polygon.get("colorMain"));
            }
        });
    }, [currDistrict]);


    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            const newMarkers = markersRef.current;

            const styles = [
                {
                    url: 'https://4x4photo.ru/wp-content/uploads/2023/05/4df0de19-e32a-491c-bcab-0d849f3cff9a.jpg',
                    height: 60,
                    width: 60,
                    textColor: '#ffffff',
                    textSize: 10,
                },
            ];

            if (markerClustererRef.current) {
                markerClustererRef.current.clearMarkers();
            }
            markerClustererRef.current = new MarkerClusterer({ map, newMarkers, styles });
            districts.forEach(marker => {
                const newMarker = new window.google.maps.Marker({
                    map: mapRef.current,
                    position: new window.google.maps.LatLng(marker["markerCoords"]["lat"], marker["markerCoords"]["lng"]),
                    icon: {
                        url: districtLabels[marker["id"]],
                        scaledSize: new window.google.maps.Size(140, 40),
                    }
                });
                newMarker.addListener("click", (e) => {
                    e.stop()
                    setDistrict(marker["id"])
                })
                markerClustererRef.current.addMarker(newMarker);
            })
            markerClustererRef.current.render();
        }
    }, [mapRef.current, loaded, currDistrict]);


    return (
        <LoadScriptOnlyIfNeeded
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    mapId: "7ec5d822bd262c80",
                    minZoom: 13,
                    maxZoom: 14
                }}
                onLoad={map => {
                    mapRef.current = map;
                    allowedBoundsRef.current = new window.google.maps.LatLngBounds(
                        new window.google.maps.LatLng(55.545410, 37.197701),
                        new window.google.maps.LatLng(56.004631, 38.004270)
                    );
                    map.addListener('center_changed', checkBounds);
                    draw();
                }}
                onClick={() => {
                    setDistrict(-1);
                    if (districts.filter(dist => dist["id"] == currDistrict)[0] !== undefined) mapRef.current.panTo(districts.filter(dist => dist["id"] == currDistrict)[0]["markerCoords"]);
                }}
            >
            </GoogleMap>
        </LoadScriptOnlyIfNeeded>
    )
}

export default MapDistricts;