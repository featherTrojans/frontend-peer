import { View, Text, ActivityIndicator,StyleSheet } from 'react-native'
import React from 'react'
import WrongIcon from '../../assets/icons/WrongIcon'
import Check from '../../assets/icons/Check'
import { COLORS } from '../../constants'

const DebounceLoading = ({loadbounce, userinfo, username, error}) => {
  return (
    <View style={styles.namecont}>
        {loadbounce ? (
        <ActivityIndicator size={15} color={COLORS.blue6} />
        ) : userinfo?.fullName ? (
        <>
            <Check />
            <Text style={styles.name}>{userinfo?.fullName}</Text>
        </>
        ) : null}
        {error && (
        <>
            <WrongIcon />
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