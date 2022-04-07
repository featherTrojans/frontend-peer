import React, {useEffect, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'

const CustomWebViewSupport = () => {
    const webviewRef = useRef(null)    
    return (
        <WebView 
            ref={webviewRef} 
            source={{uri:"https://www.feather.africa/blog"}}
        />
    )
}

export default CustomWebViewSupport

const styles = StyleSheet.create({})
