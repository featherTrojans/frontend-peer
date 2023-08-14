import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CableiucnumberScreenStyles } from '../assets/styles/screens'
import { FTCustombutton, FTInput, FTTitlepagewrapper } from '../components'
import { useForm } from 'react-hook-form'


const {} = CableiucnumberScreenStyles

const CableiucnumberScreen = () => {

  const { control, handleSubmit } = useForm({mode: 'all'});

  return (
    <FTTitlepagewrapper title='IUC Number'>
      <FTInput 
      label='Enter IUC Number'
      placeholderText='Enter Number'
      name="iucnumber"
      control={control}
      mB={20}
      mT={20}
      />
      <FTCustombutton 
      btntext='Continue'
      onpress={() => console.log("Lot ges")}
      />
    </FTTitlepagewrapper>
  )
}

export default CableiucnumberScreen

const styles = StyleSheet.create({})