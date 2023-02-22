import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Horizontaline from '../Horizontaline/Horizontaline';


const Tableoption = ({
    title,
    value,
    mb = true,
  }: {
    title: string;
    value: string;
    mb?: boolean;
  }) => {
    return (
      <>
        <View >
          <Text >{title}</Text>
          <Text >{value}</Text>
        </View>
        {mb && <Horizontaline marginV={20} />}
      </>
    );
  };

export default Tableoption

const styles = StyleSheet.create({})