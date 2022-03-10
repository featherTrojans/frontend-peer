import * as SMS from "expo-sms"


const sendMessage = async () => {
    // I will be getting the number from the endpoint
    const status = await SMS.sendSMSAsync('08167569588', "Hello")
    console.log(status)
}


export default sendMessage;