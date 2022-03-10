import { useRef } from "react"
import WebView from "react-native-webview"


const CustomWebView = ({navigation, route})=>{
    const webview = useRef()
    const {url,reference} = route.params
    const callback_url = `https://featherwebview.com/?trxref=${reference}&reference=${reference}`
    const onNavigationStateChange = (state:any)=>{
      console.log(state)
      const {url } = state;
      if(!url) return 
      if(url === callback_url){
        webview.current?.stopLoading()
        navigation.navigate("Home")
      }
    }
    return (
      <WebView  ref={webview} source={{uri:url}} style={{marginTop:40}} onNavigationStateChange={onNavigationStateChange} />
    )
  }
  
  export default CustomWebView