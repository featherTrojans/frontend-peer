import * as SMS from "expo-sms"
import { Alert , Platform} from "react-native"
import * as Linking from "expo-linking"
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import call from "react-native-phone-call"
import { useToast } from "react-native-toast-notifications"



export const sendMessage = async (phoneNumber: string | string[], defaultMessage: string ) => {
    // I will be getting the number from the endpoint
    const status = await SMS.sendSMSAsync(phoneNumber, defaultMessage)
    console.log(status)
}


export const makePhoneCall = (phoneNumber: string) => {
    if(phoneNumber.length < 11){
        Alert("Please make sure you have a correct phone number")
    }
    const callData = {
        number: phoneNumber,
        prompt: true
    };

    //Make the phone call
    call(callData).catch(
        console.error
    )
}


export const chatOnWhatsapp = (phonenumber:string, text = "Hello") => {
    Linking.openURL(`whatsapp://send?text=${text}&phone=234${phonenumber}`)
}