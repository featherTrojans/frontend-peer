import React, {useRef, useContext, useState, useEffect} from "react";
import {
  View,
  Animated,
  AppState
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "../utils/customNavigation";


import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  RootAuthStackParamList,
} from "../types";

import {
  Onboarding,

  // Auth Screens
  Login,
  Setup,
  Personal,
  Security,
  Securepin,
  Verification,
  Welcome,

  //Dashboard Screens
  Home,

  //Transactions
  Transactions,
  Newtransactions,
  Transactiondetails,
  Transactiondispute,
  Pendingrequest, //This screen has changed
  Accepetedrequest, //This screen has changed too


  History,


  Settings,
  Editprofile,
  Securityprivacy,
  Changepassword,
  Changepin,



  //Withdraw
  Requestnew,
  Availablelisting,
  Withdraw, ///Requests(pending and accepted)
  Withdrawpreview,
  Editmeetup,
  Pendingwithdraw,
  Acceptedwithdraw,
  Requestsummary,
  Cancelrequest,
  Summary,

  //Wallet funding
  Addcash,
  Choosewallet,

  //Transfer funds
  Transfercash,
  TransferInput,
  Getdetails, //If Feather
  Bankaccount, //If Bank accout
  Transferpin,

  //Notification
  Notifications,

  //Deposit
  Deposit, ///Requests(pending and accepted)
  Depositupdate, ///
  Pendingdeposit,
  Accepteddeposit,
  Depositpin,
  Canceldeposit,
 WalletPin,
  //Chats
  Chatshome,
  Chatsdm,
  Usersearch,

} from "../screens";
import { Loader, Tab } from "../components";
import { COLORS, icons, SIZES } from "../constants";
import WithdrawPin from "../screens/app/Withdraws/WithdrawPin/WithdrawPin";
import TransferpinBank from "../screens/app/Transferfunds/Transferpin/TransferPinBank";
import { AuthContext } from "../context/AuthContext";
import SecurepinAgain from "../screens/auth/signup/Securepin/SecurepinAgain";
import App from "../App";
import Map from "../screens/shared/map/Map";
import LockScreen from "../screens/shared/LockScreen/LockScreen";
import Depositinput from "../screens/app/Deposit/DepositInput/Depositinput";
import CustomWebView from "../screens/shared/CustomWebView";
// import Animated from "react-native-reanimated";
const AppStack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const AuthStack = createStackNavigator<RootAuthStackParamList>();

const { TabHome, Tabhistory, Tabtransactions, Tabchats, Tabsettings, Tabuser, Tabplusicon } = icons;


function getWidth(){
  let width = SIZES.width - 60

  return width/5
}



const Tabs = () => {

  const tabOffsetValue = useRef(new Animated.Value(0)).current;



  return(
    <>
    <BottomTab.Navigator 
    initialRouteName="Home" 
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle:{
        backgroundColor: 'white',
        height: 82, 
        // paddingHorizontal: 36.5,
        // paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }
    }}
    >
      <BottomTab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return(
              <View style={{
                // position: "absolute",
                // top: "50%"
              }}>
              <TabHome focused={focused}/>
            </View>
            )
          }
        }}
        listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true
              }).start();
            }
        })}
        />


      <BottomTab.Screen 
      name="History" 
      component={Transactions} 
      options={{
        tabBarIcon: ({focused, color, size}) => {
          return(
            <View style={{
              position: "absolute",
              // top: "50%"
            }}>
            <Tabhistory focused={focused}/>
          </View>
          )
        }
      }}
      listeners={({navigation, route}) => ({
        tabPress: e => {
          Animated.spring(tabOffsetValue, {
            toValue: getWidth(),
            useNativeDriver: true
          }).start();
        }
    })}
      />


      <BottomTab.Screen 
      name="Transactions" 
      component={Newtransactions} 
      options={{
        tabBarIcon: ({focused, color, size}) => {
          return(
            <View style={{
              // position: "absolute",
              // top: "50%"
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.blue6,
              padding: 13.4,
              borderRadius: 50,
              shadowColor: "#003AD6",
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.5,
              shadowRadius: 20
            }}>
            <Tabplusicon />
          </View>
          )
        }
      }}
      listeners={({navigation, route}) => ({
        tabPress: e => {
          Animated.spring(tabOffsetValue, {
            toValue: getWidth() * 2,
            useNativeDriver: true
          }).start();
        }
    })}
      />
      <BottomTab.Screen 
      name="Chats" 
      component={Chatshome} 
      options={{
        tabBarIcon: ({focused, color, size}) => {
          return(
            <View style={{
              position: "absolute",
              // top: "50%"
            }}>
            <Tabchats focused={focused}/>
          </View>
          )
        }
      }}
      listeners={({navigation, route}) => ({
        tabPress: e => {
          Animated.spring(tabOffsetValue, {
            toValue: getWidth() * 3,
            useNativeDriver: true
          }).start();
        }
    })}
  
      />
      <BottomTab.Screen 
      name="Settings" 
      component={Settings} 
      options={{
        tabBarIcon: ({focused, color, size}) => {
          return(
            <View style={{
              position: "absolute",
              // top: "50%"
            }}>
            <Tabuser focused={focused}/>
          </View>
          )
        }
      }}
      listeners={({navigation, route}) => ({
        tabPress: e => {
          Animated.spring(tabOffsetValue, {
            toValue: getWidth() * 4,
            useNativeDriver: true
          }).start()
        }
      })}
      />
  
      
    </BottomTab.Navigator>

    <Animated.View style={{
      width: getWidth() - 50,
      height: 1.5,
      backgroundColor: COLORS.blue6,
      position: 'absolute',
      bottom: 82,
      // left: 40,
      // borderRadius: '50%'
      left: 25,
      // right: 25,
      transform: [
        { translateX: tabOffsetValue}
      ]
    }}>

    </Animated.View>
    </>
  )
};



const RootNavigator = () => {
  const {token} = useContext(AuthContext);
  
  return (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    // initialRouteName="Onboarding"
    >
      {/* <AppStack.Screen name="map" component={Map} /> */}
    {/* SCREEN FOR AUTH */}
    {!token?
    (<AppStack.Group screenOptions={{ presentation: 'modal' }}>
      <AppStack.Screen name="Onboarding" component={Onboarding} />
      <AppStack.Screen name="Personal" component={Personal} />
      <AppStack.Screen name="Verification" component={Verification} />
      <AppStack.Screen name="Security" component={Security} />
      <AppStack.Screen name="Securepin" component={Securepin} />
      <AppStack.Screen name="SecurepinAgain" component={SecurepinAgain} />
      <AppStack.Screen name="Setup" component={Setup} />
      <AppStack.Screen name="Login" component={Login} />
    </AppStack.Group>):
    (<>
    {/* Transaction Screens*/}
    <AppStack.Group>
      <AppStack.Screen name="Welcome" component={Welcome} />
      <AppStack.Screen name="Root" component={Tabs} />
      <AppStack.Screen name="Transactions" component={Transactions} />
      <AppStack.Screen name="Newtransactions" component={Newtransactions} />
      <AppStack.Screen
        name="Transactiondetails"
        component={Transactiondetails}
      />
      <AppStack.Screen
        name="Transactiondispute"
        component={Transactiondispute}
      />
    </AppStack.Group>


    {/* Settings,
  Editprofile,
  Securityprivacy,
  Changepassword,
  Changepin, */}



  {/* Settings Screens */}
  <AppStack.Group>
    <AppStack.Screen name="Editprofile" component={Editprofile}/>
    <AppStack.Screen name="Securityprivacy" component={Securityprivacy}/>
    <AppStack.Screen name="Changepassword" component={Changepassword}/>
    <AppStack.Screen name="Changepin" component={Changepin}/>


  </AppStack.Group>




    {/* Withdraw Screens */}
    <AppStack.Group>
      <AppStack.Screen name="Withdraw" component={Withdraw} />
      <AppStack.Screen name="Requestnew" component={Requestnew} />
      <AppStack.Screen name="Availablelisting" component={Availablelisting} />
      <AppStack.Screen name="Withdrawpreview" component={Withdrawpreview} />
      <AppStack.Screen name="Editmeetup" component={Editmeetup} />
      {/* To Cancel */}
      {/* cancel requests */}
      <AppStack.Screen name="Pendingwithdraw" component={Pendingwithdraw} />
      <AppStack.Screen name="Cancelrequest" component={Cancelrequest} />
      {/* TO MaKE AFTER ACCEPTING */}
      <AppStack.Screen name="Acceptedwithdraw" component={Acceptedwithdraw} />
      <AppStack.Screen name="Requestsummary" component={Requestsummary} />
      <AppStack.Screen name="Summary" component={Summary} />
      <AppStack.Screen name="WithdrawPin" component={WithdrawPin} />
    </AppStack.Group>

    {/* Wallet Funding */}
    <AppStack.Group>
      <AppStack.Screen name="Addcash" component={Addcash} />
      <AppStack.Screen name="Choosewallet" component={Choosewallet} />
      <AppStack.Screen name="WalletPin" component={WalletPin} />
    </AppStack.Group>

    {/* Transfer funds screens */}
    <AppStack.Group>
      <AppStack.Screen name="Transfercash" component={Transfercash} />
      <AppStack.Screen name="TransferInput" component={TransferInput} />
      <AppStack.Screen name="Getdetails" component={Getdetails} />
      <AppStack.Screen name="Bankaccount" component={Bankaccount} />
      <AppStack.Screen name="Transferpin" component={Transferpin} />
      <AppStack.Screen name="TransferpinBank" component={TransferpinBank} />
    </AppStack.Group>

    {/* Notification Screen */}
    <AppStack.Screen name="Notifications" component={Notifications} />

    {/* Deposit Screens */}
    <AppStack.Group>
      <AppStack.Screen name="Depositupdate" component={Depositupdate} />
      <AppStack.Screen name="Depositinput" component={Depositinput} />
      <AppStack.Screen name="Deposit" component={Deposit} />
      <AppStack.Screen name="Pendingdeposit" component={Pendingdeposit} />
      <AppStack.Screen name="Accepteddeposit" component={Accepteddeposit} />
      <AppStack.Screen name="Depositpin" component={Depositpin} />
      <AppStack.Screen name="Canceldeposit" component={Canceldeposit} />
    </AppStack.Group>
    {/* Chats Screens */}
    <AppStack.Group>
      <AppStack.Screen name="Chatshome" component={Chatshome} />
      <AppStack.Screen name="Chatsdm" component={Chatsdm} />
      <AppStack.Screen name="Usersearch" component={Usersearch} />
    </AppStack.Group>
       <AppStack.Screen name="CustomWebView" component={CustomWebView} />

  </>)}
  </AppStack.Navigator>
);

}

export default function MainNavigation() {
  const [modal, setModal] = useState(false);
  const timer = useRef<number>(Date.now())
  const {token} = useContext(AuthContext);
  const appState = useRef(AppState.currentState);
  
  useEffect(() => {
    const subscription:any = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) &&nextAppState === "active") {
        if ((Date.now() - timer.current) > 300000) {
            setModal(true) 
        }
      }else{
        appState.current = nextAppState;
        if(!modal || !token){
          timer.current = Date.now();
        }
      }
    });

    return () => {
      // subscription.remove();
    };
  }, []);
 
  return (
    <NavigationContainer ref={navigationRef}>
      {token? <LockScreen modal={modal} setModal={setModal}/> : null}
      <RootNavigator />

    
    </NavigationContainer>
  );
}
