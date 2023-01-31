import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import {
  Emptycomponent,
  Transactionhistory,
  Viewbalance,
} from "../../../components";
import { COLORS, icons } from "../../../constants";

import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";

import { styles } from "./Home.styles";




import Customstatusbar from "../../shared/Customstatusbar";
import DoubleTapToClose from "../../shared/DoubleBack";


import formatData from "../../../utils/fomatTrans";
import { nameToShow } from "../../../utils/nameToShow";
import { getPeriod } from "../../../utils/getDayPeriod";
import useAlert from "../../../utils/useAlerts";




const {
  Bell,
  Featherdefault,
} = icons;





const Home = ({ navigation, route }: { navigation: any; route: any }) => {
  const { setAuthData, authdata } = useContext(AuthContext);
  const histories = formatData(authdata?.transactions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extractedToken, setExtractedToken] = useState();
  const scrollViewRef = useRef<any>();

  const { updateAlert } = useAlert();





  const getDashboardData = async () => {

    setLoading(true);
    try {
      const response = await axiosCustom.get("/dashboard");
      setAuthData(response?.data?.data);

      
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  const onRefreshFunc = useCallback(() => {
    setRefreshing(true);
    getDashboardData();
  }, []);



  return (
    <View style={[styles.container, { paddingTop: getStatusBarHeight(true) }]}>
      <Customstatusbar />
        <View style={styles.headerContainer}>

          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              activeOpacity={0.8}
            >
              {authdata?.userDetails?.imageUrl !== null ? (
                <Image
                  style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
                  source={{
                    uri: authdata?.userDetails?.imageUrl,
                  }}
                />
              ) : (
                <Featherdefault />
              )}
            </TouchableOpacity>


            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>
                Hi,{nameToShow(authdata?.userDetails?.fullName)}✌🏽
              </Text>
              <Text style={styles.profileUsername}>
                @{authdata?.userDetails?.username}
              </Text>
            </View>
          </View>


          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Notifications")}
            style={{ padding: 8, borderRadius: 20 }}
          >
            <Bell />
          </TouchableOpacity>
        </View>


      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshFunc}
            progressBackgroundColor={COLORS.white}
            colors={[COLORS.blue6]}
            tintColor={COLORS.blue6}
            title="Refreshing"
            titleColor={COLORS.blue6}
          />
        }
      >

        
        
      <Viewbalance />
        <View style={{ flex: 1 }}>
          {histories.length === 0 ? (
            <Emptycomponent size={110} msg="Padi, you have not performed any 
            transactions yet. Transact Now" />
          ) : (
            histories.map((history: { time: string; data: any }, index) => (
              <Transactionhistory
                index={index}
                date={history.time}
                datas={history.data}
                key={history.time}
              />
            ))
          )}
        </View>
        <DoubleTapToClose />
      </ScrollView>
    </View>
  );
};

export default Home;
