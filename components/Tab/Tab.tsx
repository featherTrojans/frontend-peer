import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import { COLORS, FONTS, fontsize } from "../../constants";
import { Background, styles } from "./Tab.styles";
const Tab = ({
  label,
  accessibilityState,
  icon,
  onPress,
}: {
  label: string;
  accessibilityState?: any;
  icon: Element;
  onPress?: GestureResponderEvent;
}) => {
  const focused = accessibilityState.selected;

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={50} />
      <Transition.In type="fade" durationMs={5} />
    </Transition.Sequence>
  );

  const ref = useRef();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}
    >
      <Background focused={focused} ref={ref} transition={transition}>
        <View style={styles.iconContainer}>{icon}</View>
        {focused && <Text style={styles.iconText}>{label}</Text>}
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default Tab;
