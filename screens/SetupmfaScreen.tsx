import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SetupmfaScreenStyles } from '../assets/styles/screens'
import { FTHeaderandsubheader, FTInput, FTTitlepagewrapper } from '../components'



const {} = SetupmfaScreenStyles



const SetupmfaScreen = () => {
  return (
    <FTTitlepagewrapper title="Setup MFA">
      <FTHeaderandsubheader 
      header="Setup your Security Questions and Answers"
      subHeader="Kindly choose from the questions above and provide appropriate answers to fully enable your MFA"
      />


    {/* <FTInput 
    label='Question 1'
    placeholderText='Select preffered question 1'
    />
    <FTInput 
    label='Answer 1'
    placeholderText='Select preffered answer 1'
    /> */}



    </FTTitlepagewrapper>
  )
}

export default SetupmfaScreen

const styles = StyleSheet.create({})