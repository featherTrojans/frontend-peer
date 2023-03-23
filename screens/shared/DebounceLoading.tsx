import { View, Text, ActivityIndicator,StyleSheet } from 'react-native'
import React from 'react'

import { COLORS, icons } from '../../constants'


// const {Wrong, Check} = icons
const { Transfericon } = icons

const DebounceLoading = ({loadbounce, userinfo, username, error}) => {
  return (
    <View style={styles.namecont}>
        {loadbounce ? (
        <ActivityIndicator size={15} color={COLORS.blue6} />
        ) : userinfo?.fullName ? (
        <>
            <Transfericon />
            <Text style={styles.name}>{userinfo?.fullName}</Text>
        </>
        ) : null}
        {error && (
        <>
            <Transfericon />
            <Text style={styles.name}>{username} does not exist</Text>
        </>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
      namecont:{
        flexDirection: "row",
        marginLeft: 20,
        alignItems:"center",
        marginTop: -10
      },
      name:{
        color: "#0034CB",
        marginLeft: 10
      }
})

export default DebounceLoading