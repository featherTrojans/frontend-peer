import Constants from "expo-constants"




const settings = {
    dev: {
        // apiUrl: "https://feather.com.ng:3300/api/v1/" 
        apiUrl: "https://featherafrica.co:3300/api/v1/" 


    },
    staging: {
        apiUrl: "https://featherafrica.co:3300/api/v1/" 
    },
    production: {
        
        apiUrl: "https://featherafrica.co:3300/api/v1/" 

    }
}


const getCurrentSettings = () => {
    if(__DEV__) return settings.dev;
    if(Constants.manifest?.releaseChannel === "staging") return settings.staging
    return settings.production
}

export default getCurrentSettings()
