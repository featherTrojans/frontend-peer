import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useDebounce from '../../utils/debounce';
import { COLORS, FONTS, fontsize , icons} from '../../constants';
import Input from '../Input/Input';
import DebounceLoading from '../../screens/shared/DebounceLoading';
import { useNavigation } from '@react-navigation/native';
import Custombutton from '../Custombutton/Custombutton';

const {Aticon, Searcontacticon,Ashicon} = icons
const TransferCash = ({ amount, closeTransfercashinfoModal,onpress}) => {
    const navigation = useNavigation()
    const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
    const [username, setUsername] = useState("");
    const [disable, setDisable] = useState(true)

    
    const handleUsernameChange = (text: string) => {
        console.log(text)
        setUsername(text);
    // and debound
         getuserinfo(text);
    };


    useEffect(() => {

      if((username.length > 1) && (error === false)){

        if((loadbounce === false && JSON.stringify(userinfo) !== '{}')){
          
            console.log("You can process",  userinfo);
            setDisable(false)
        }
        else{
          setDisable(true)
        }
      }
      else{
        setDisable(true)
      }
      
    }, [username, error, userinfo, loadbounce])

  return (
    <View>
    <Text style={{ marginBottom: 10, ...fontsize.smaller, ...FONTS.medium }}>
      Transfer Cash
    </Text>
    <View
      style={{
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...fontsize.xsmallest,
          ...FONTS.medium,
          color: COLORS.grey16,
        }}
      >
        Charges
      </Text>
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 10,
          backgroundColor: COLORS.trasparentBlue2,
          marginLeft: 10,
          borderRadius: 18,
        }}
      >
        <Text
          style={{
            ...fontsize.xsmallest,
            ...FONTS.bold,
            color: COLORS.blue6,
          }}
        >
          + N0.00
        </Text>
      </View>
    </View>

    <View style={{ marginTop: 25, marginBottom: 35 }}>



          {/* Formik start */}

      <Input
        icon={<Ashicon />}
        placeholder="Enter amount"
        name="plan"
        value={amount}
        inputbg={COLORS.inputBgColor}
      />
      <Input
        icon={<Aticon />}
        placeholder="Enter username of feather user"
        name="network"
        inputbg={COLORS.inputBgColor}
        onChangeText={handleUsernameChange}

      />
         

      {/* Search contact and debounce */}
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center"}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          closeTransfercashinfoModal();
          navigation.navigate("Sendcash", amount);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.trasparentPurple,
          alignSelf: "flex-start",
          paddingVertical: 9,
          paddingHorizontal: 14,
          borderRadius: 18,
          // marginTop:20
        }}
      >
        <Searcontacticon />
        <Text
          style={{
            ...fontsize.smallest,
            ...FONTS.regular,
            color: COLORS.purple2,
            marginLeft: 8,
          }}
        >
          Search Contacts
        </Text>
      </TouchableOpacity>
      <DebounceLoading loadbounce={loadbounce} error={error} userinfo={userinfo} username={username}  />
      </View>
      
    </View>
    <Custombutton
      disable={disable}
      btntext="Yeah, Continue"
      onpress={() => {onpress(userinfo)}}
    />


          {/* Formik Start */}



  </View>
  )
}

export default TransferCash