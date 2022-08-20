import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { walletmanangementstyles } from '../../screens/app/Settings/Walletmanagement/Walletmanagement.styles';
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
        <View style={walletmanangementstyles.tableoptionwrap}>
          <Text style={walletmanangementstyles.tableoptiontitle}>{title}</Text>
          <Text style={walletmanangementstyles.tableoptionvalue}>{value}</Text>
        </View>
        {mb && <Horizontaline marginV={20} />}
      </>
    );
  };

export default Tableoption

const styles = StyleSheet.create({})