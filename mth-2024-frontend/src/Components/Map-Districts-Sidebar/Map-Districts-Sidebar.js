import './Map-Districts-Sidebar.scss'

function MapDistrictsSidebar({district, open}) {

    if (district !== undefined)
    return(
        <div className={open ? "main-sidebar sidebar-open" : "main-sidebar sidebar-closed"}>
            <h1>{district["name"]}</h1>
            <div className='tag-container'>{district["tags"].map(tag => {
                return <div className='tag'><p>{tag}</p></div>
            })}</div>
            <h2>{district["description"]}</h2>
            <h3>Совет местного</h3>
            <div className='localComment'>
                <div className='top'>
                    <img src={"https://sun9-56.userapi.com/impg/A9hjhHDaEecs5meDOEk5FnL1wHKTFQC3ZNSdkQ/f1ZskUqwzS8.jpg?size=972x2160&quality=95&sign=031dae7aa9fa7da6da72abef63221b6a&type=album"}></img>
                    <div>
                        <h1>{district["localComment"]["name"]}</h1>
                        <h2>Гид</h2>
                    </div>
                </div>
                <h2>{district["localComment"]["text"]}</h2>
                <div className='line'/>
            </div>
            <div className='button'>
                <p>Выбрать район</p>
            </div>
        </div>
    ) 
    else return(
        <div className={open ? "main-sidebar sidebar-open" : "main-sidebar sidebar-closed"}>
        </div>
    )
}

export default MapDistrictsSidebar;