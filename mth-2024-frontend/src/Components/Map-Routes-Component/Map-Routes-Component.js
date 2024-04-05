import MapRoutes from "../Map-Routes/Map-Routes";

function MapRoutesComponent({places}) {
    console.log(places)
    return(
        <div className="container">
            {places.map(place => {
                return(
                    <div>
                        <p>{place["place"].name}</p>
                    </div>
                )
            })}
            <MapRoutes places={places}/>
        </div>
    )
}

export default MapRoutesComponent;