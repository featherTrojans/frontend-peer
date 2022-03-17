import styled from "styled-components/native";
import { COLORS, FONTS, fontsize } from "../../constants";


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
${{...fontsize.small, ...FONTS.bold}}
`;

export const OnboardingFlatlist = styled.FlatList``;

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 32px;
`;

export const DotFlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DotContainer = styled.View``;

export const GetStartedText = styled.Text`
  color: ${COLORS.white};
  ${{...fontsize.small, ...FONTS.bold}}

`;

export const GetStartedContainer = styled.View`
  padding-horizontal: 41px;
  padding-vertical: 21px;
  background-color: ${COLORS.black};
  border-radius: 10px;
`;

export const NextText = styled.Text`
  padding-vertical: 21px;
${{...fontsize.small, ...FONTS.bold}}

`;

export const GetStartedBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1000px;
`;
