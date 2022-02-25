import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { AuthProvider } from './context/AuthContext';
import MainNavigation from './navigation';

export default function App() {
  let [fontsLoaded] = useFonts({
    GTlight: require("./assets/fonts/GTWalsheimPro-Light.ttf"),
    GTregular: require("./assets/fonts/GTWalsheimPro-Regular.ttf"),
    GTmedium: require("./assets/fonts/GTWalsheimPro-Medium.ttf"),
    GTbold: require("./assets/fonts/GTWalsheimPro-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ToastProvider>
        <AuthProvider>
        <MainNavigation />
        </AuthProvider>
      </ToastProvider>
    );
  }
}