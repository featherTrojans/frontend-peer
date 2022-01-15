import styled from "styled-components/native";
import { COLORS, FONTS } from "../../constants";

export const OnboardingContainer = styled.View`
  display: flex;
  flex: 1;
  background: ${COLORS.white};
  padding: 27px 0px;
`;

export const LoginBtn = styled.TouchableOpacity`
  margin-top: 8px;
  margin-bottom: 32px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 27px;
`;

export const SkipText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const OnboardingFlatlist = styled.FlatList`

`