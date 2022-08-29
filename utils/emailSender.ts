
import * as MailComposer from "expo-mail-composer";



export  const sendEmail = (email: string) => {
    try {
      MailComposer.composeAsync({
        recipients: [email],
        subject: "Feather Africa",
        body: "",
      });
    } catch (error) {
    //   errorAlert("Error sending email, Please try again.");
    }
  };