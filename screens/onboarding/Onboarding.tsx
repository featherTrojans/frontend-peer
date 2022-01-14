import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";
import { OnboardingScreenNavigationProps } from "../../types";
import { COLORS, FONTS, SIZES } from "../../constants";
import onboardingdatas from "../../onboardingdatas";
import EachOnboarding from "../../components/EachOnboarding";

const Onboarding = ({ navigation }: OnboardingScreenNavigationProps) => {
  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const [viewIndex, setViewIndex] = useState<number>(0);

  // i removed changed from the params passed to this useRef below
  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          marginTop: 8,
          marginBottom: 32,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 27,
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ ...FONTS.bold, fontSize: 14 }}>Skip</Text>
      </TouchableOpacity>

      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewChangeRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        keyExtractor={(item) => item.header}
        data={onboardingdatas}
        renderItem={({ item, index }) => <EachOnboarding item={item} />}
      />

      {/* Footer--Dots and the nxet button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 32
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {onboardingdatas.map((item, index) => {
            const dotPosition = Animated.divide(scrollX, SIZES.width);

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.grey3, COLORS.blue6, COLORS.grey3],
              extrapolate: "clamp",
            });
            const dotOpacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.2, 1, 0.2],
              extrapolate: "clamp",
            });
            const dotWidth = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: dotColor, opacity: dotOpacity, width: dotWidth },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          activeOpacity={0.4}
          style={[styles.nextStart]}
          onPress={() => {
            let currentIndex = Math.ceil(Number(scrollX._value / SIZES.width));
            if (currentIndex < onboardingdatas.length - 1) {
              // Scroll to the next item
              flatListRef?.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
              });
            //   console.log("Right index", currentIndex);
            } else {
              navigation.replace("Login");
            }
          }}
        >
          {viewIndex < onboardingdatas.length - 1 ? (
            <Text style={{color: COLORS.black, ...FONTS.bold,paddingHorizontal: 41, paddingVertical: 21,  }}>Next</Text>
          ) : (
              <View style={{paddingHorizontal: 41, paddingVertical: 21, backgroundColor: COLORS.black, borderRadius: 10}}>

                  <Text style={{color: COLORS.white, ...FONTS.bold, }}>Get Started</Text>
              </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 27,
  },
  dot: {
    marginBottom: 10,
    height: 8,
    borderRadius: 1000,
    marginRight: 10,
  },
  nextStart: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 1000,
  },
});

export default Onboarding;
