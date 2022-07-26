import React, {useRef, useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList, Animated } from "react-native";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { JustifyBetween } from "../../../global/styles";
// import { Input, Personal, Securepin, Security, } from "../../../components";


const { Usericondark, Phoneicon, Envelopeicon } = icons;

const Signup = ({navigation}: any) => {

  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  
useEffect(() => {

}, [scrollX])


  const [viewIndex, setViewIndex] = useState<number>(0);


  // i removed changed from the params passed to this useRef below
  const onViewChangeRef = useRef<({ viewableItems, changed }: {
    viewableItems: any;
    changed: any;
}) => void>(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });




  return (
    
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{flexGrow: 1}}
        // onViewableItemsChanged={onViewChangeRef.current}
        onScroll={
          Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        
    >
      {/* <Personal navigation={navigation}/>
      <Security />
      <Securepin /> */}
  
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
