import './Map-Districts-Sidebar.scss'

function MapDistrictsSidebar({district, open}) {

    if (district !== undefined)
    return(
        <div className={open ? "main-sidebar sidebar-open" : "main-sidebar sidebar-closed"}>
            {district["name"]}
        </div>
    ) 
    else return(
        <div className={open ? "main-sidebar sidebar-open" : "main-sidebar sidebar-closed"}>
        </div>
    )
}

export default MapDistrictsSidebar;