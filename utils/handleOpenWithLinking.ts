import * as Linking from "expo-linking";
import * as WebBrowser from 'expo-web-browser';


export const handleOpenWithLinking = (url: string)=> {
    Linking.openURL(url);
}

export const handleOpenInBrowser = async (linkToDirect) => {
    let result = await WebBrowser.openBrowserAsync("feather.africa");
}