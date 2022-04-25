import React, {useEffect, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { COLORS } from '../../constants'

const CustomWebViewSupport = () => {
    const webviewRef = useRef(null)    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <WebView 
            ref={webviewRef} 
            source={{uri:"https://www.feather.africa/blog"}}
        />
        </SafeAreaView>
    )
}

export default CustomWebViewSupport

const styles = StyleSheet.create({})
