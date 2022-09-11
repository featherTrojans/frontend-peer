import { StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from 'react'
import { Backheader, Custombutton, Horizontaline, Mainwrapper } from '../../../components'
import { COLORS, FONTS, fontsize } from '../../../constants'





const Agentform = () => {
  return (
    <Mainwrapper>
        <Backheader title="Become an agent"/>
        
        <KeyboardAwareScrollView style={{flex: 1}}  >
        <View style={{paddingHorizontal: 15,  flex: 1}}>



                <View style={{marginBottom: 30}}>
                    <Text style={{marginBottom: 15, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>1. Preferred Business Name</Text>
                    <TextInput 
                    style={{height: 53, backgroundColor: COLORS.white, paddingHorizontal: 16, }}
                    placeholder="Enter Business Name…"
                    placeholderTextColor={COLORS.grey15}
                    />
                </View>


                <View style={{marginBottom: 30}}>
                    <Text style={{marginBottom: 15, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>2. Projected cash transaction (How much do you think you will be capable of transacting daily)</Text>
                    <TextInput 
                    style={{height: 53, backgroundColor: COLORS.white, paddingHorizontal: 16, }}
                    placeholder="Enter Business Name…"
                    placeholderTextColor={COLORS.grey15}
                    />

                    <View style={{width: 360,  backgroundColor: COLORS.white, position: "absolute", top: -50, paddingHorizontal: 16, borderRadius: 5, borderColor: COLORS.grey15}}>
                    <Pressable
                    onPress={() => console.log("Hellow")}
                    style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                        ? COLORS.lightBlue
                        : COLORS.white
                    },
                    ]}>
                            <Text style={{paddingVertical: 20, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Below N50,000</Text>
                        </Pressable>



                        <Horizontaline marginV={0}/>
                        <Text style={{paddingVertical: 20, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>N50,000 - N200,000</Text>
                        <Horizontaline marginV={0}/>
                        <Text style={{paddingVertical: 20, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Above N200,000</Text>
                    </View>
                </View>




                <View style={{marginBottom: 30}}>
                    <Text style={{marginBottom: 15, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>3. Operating State (only available in the states below)</Text>
                    <TextInput 
                    style={{height: 53, backgroundColor: COLORS.white, paddingHorizontal: 16, }}
                    placeholder="--- Select State ---"
                    placeholderTextColor={COLORS.grey15}
                    />
                </View>

                <View style={{marginBottom: 30}}>
                    <Text style={{marginBottom: 15, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>4. Full Address</Text>
                    <TextInput 
                    style={{height: 106, backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 20}}
                    multiline
                    textAlignVertical="top"
                    placeholder="Enter Full Address"
                    placeholderTextColor={COLORS.grey15}
                    />
                </View>




                <View style={{marginBottom: 30}}>
                    <Text style={{marginBottom: 15, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>5. Active Phone Number</Text>
                    <TextInput 
                    style={{height: 53, backgroundColor: COLORS.white, paddingHorizontal: 16, }}
                    placeholder="Enter Active Phone Number"
                    placeholderTextColor={COLORS.grey15}
                    />
                </View>


                <Custombutton btntext='Submit Application' onpress={() => console.log("Application submitted")}/>


        </View>
        </KeyboardAwareScrollView>
    </Mainwrapper>
  )
}

export default Agentform

const styles = StyleSheet.create({})