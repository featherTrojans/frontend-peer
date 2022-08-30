import { View, Text } from 'react-native'
import React from 'react'
import { Requesterinfo } from '../../components'
import Map from './map/Map'

const RequesterinfoScreen = () => {
  return (
    <View>
      <Map />
      <Requesterinfo />
    </View>
  )
}

export default RequesterinfoScreen