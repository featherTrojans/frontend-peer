import * as Linking from "expo-linking";



export const handleOpenWithLinking = (url: string)=> {
    Linking.openURL(url);
}