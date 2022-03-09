import React,{useState, useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Input, Loader } from "../../../components";
import { icons } from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Setup.styles";
import axiosCustom from "../../../httpRequests/axiosCustom";
import useDebounce from "../../../utils/debounce";
import { AuthContext } from "../../../context/AuthContext";
import showerror from "../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";

const { At, Check, WrongIcon } = icons;


const setAuthorizationToken = (token:string)=>{
  if (token){
    axiosCustom.defaults.headers.common["token"] = token
  }
}

const Setup = ({route, navigation }) => {
  const {token,defaultUsername} = route.params;
  const toast = useToast()
  const [username, setUsername] = useState(defaultUsername);
  const [userinfo, getuserinfo, loadbounce,error] = useDebounce(token)
  const [loading, setLoading] = useState(false)
  const {setToken} = useContext(AuthContext)

  const handleUsernameChange = (text:string)=>{
    const textsmall = text.toLowerCase()
    setUsername(textsmall)
    // and debound
    if(textsmall.length > 3){
      getuserinfo(textsmall)
    }
  }

  const onSubmit= async () => {
    setLoading(true)
    try{
      const response = await axiosCustom.put("/auth/username/set",{newUsername:username},{headers:{token:token}})
      console.log(response)
      setAuthorizationToken(response.data.data.token)
      setToken(response.data.data.token)
      navigation.navigate("Welcome")
    }catch(err){
      showerror(toast,err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <StatusBar />
        {/* Header */}
        <View style={{ marginBottom: 31 }}>
          <Text style={styles.headerText}>Set up your unique</Text>
          <Text style={styles.headerText}>feather username.</Text>
        </View>

        {/* Informations */}
        <View style={{ marginBottom: 35 }}>
          <Text style={styles.setupText}>
            We set up a default username for you already, its advisable to
            customise it to your preference.
          </Text>
        </View>      
    
                {loading && <Loader />}
                <Input
                  placeholder="feather2923"
                  onChangeText={(text) => handleUsernameChange(text)}
                  value={username}
                  name="username"
                  icon={<At />}
                />
                <View style={styles.namecont}>
                  {
                    loadbounce?<Text>...</Text>:userinfo.fullName?<>
                  <WrongIcon />
                  <Text style={styles.name}>{username} is not available</Text>
                    </>:null} 
                    {error && <><Check /><Text style={styles.name}>{username} is available</Text></>}
                </View>


                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  {/* Setup later btn */}
                  <View style={{ marginBottom: 40 }}>
                    <Text style={styles.laterBtn}>SETUP LATER</Text>
                  </View>
                  {/* Continue btn */}
                  <TouchableOpacity
                    style={styles.continueBtn}
                    activeOpacity={0.8}
                    onPress={onSubmit}
                  >
                    <Text style={styles.continueText}>CONTINUE</Text>
                  </TouchableOpacity>
                </View>
          
          
        
        {/* Input box */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Setup;
