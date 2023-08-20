import call from "react-native-phone-call";
export const makePhoneCall = (phoneNumber: string) => {
  if (phoneNumber.length < 11) {
    // Alert("Please make sure you have a correct phone number")
    return;
  }
  const callData = {
    number: phoneNumber,
    prompt: true,
  };

  //Make the phone call
  call(callData).catch(console.error);
};
