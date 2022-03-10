import React, {createContext, FC, useState} from "react";


const LocationContext = createContext({});


const LocationProvider:FC = ({children}) =>{
    const [coords, setCoords] = useState({})
    const [destinationCoords, setDestinationCoords] = useState({})
    return (
        <LocationContext.Provider value={{
            coords,
            setCoords,
            destinationCoords,
            setDestinationCoords,
        }}>         
            {children}
        </LocationContext.Provider>
    )
}

export {LocationContext, LocationProvider}
