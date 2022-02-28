import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './Requesterdetails.styles'
import { COLORS } from '../../constants'


type RequesterdetailsProps ={
  image?: string,
  name: string,
  distance: string,
  duration: number
}

const Requesterdetails = ({image, name, distance, duration}: RequesterdetailsProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
    {/* Details */}
    <View style={styles.imageBorder}>
      {/* To replace this with the user image */}
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.grey4,
          borderRadius: 30,
        }}
      />
    </View>

    <View style={{ marginLeft: 15 }}>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.distanceDuration}>
        {distance} away | {duration} mins
      </Text>
    </View>
  </View>
  )
}

export default Requesterdetails

