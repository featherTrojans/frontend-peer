import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MeternumberScreenStyles } from '../assets/styles/screens'
import { FTCustombutton, FTInput, FTTitlepagewrapper } from '../components'
import { useForm } from 'react-hook-form'


const {} = MeternumberScreenStyles

const MeternumberScreen = () => {

  const { control, handleSubmit } = useForm({mode: 'all'});

  
  return (
    <FTTitlepagewrapper title='Meter Number'>
      <FTInput 
      label='Enter Meter Number'
      placeholderText='Enter Number'
      name="meternumber"
      control={control}
      mB={20}
      />
      <FTCustombutton 
      btntext='Continue'
      onpress={() => console.log("Lot ges")}
      
      
      
      />
    </FTTitlepagewrapper>
  )
}

export default MeternumberScreen

const styles = StyleSheet.create({})