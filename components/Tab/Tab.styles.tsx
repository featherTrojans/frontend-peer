import { StyleSheet } from "react-native";
import { Transitioning } from "react-native-reanimated";
import styled from "styled-components/native";
import { COLORS, fontsize, FONTS } from "../../constants";

export const Background = styled(Transitioning.View)`
  flex: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props: any) => (props.focused ? COLORS.blue6 : COLORS.white)};
  border-radius: 100px;
  height: 51px;
`;

export const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    ...fontsize.small,
    color: COLORS.white,
    ...FONTS.medium,
    marginLeft: 8,
  },
});
