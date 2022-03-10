import styled from "styled-components/native";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";

export const OnboardingComponentContainer = styled.View`
  width: ${SIZES.width}px;
  flex: 1;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 23px;
`;

export const ImageContainer = styled.View`
  width: 230px;
  height: 230px;
  background: ${COLORS.grey1};
  border-radius: 1000px;
  margin-bottom: 20px;
`;

export const HeaderText = styled.Text`
  ${{...fontsize.big, ...FONTS.bold}}
  text-align: center;
  margin-bottom: 34px;
  line-height: 35px;
`;

export const InformationText = styled.Text`
 ${{...fontsize.bsmall, ...FONTS.regular}}
  text-align: center;
  color: ${COLORS.grey5};
  line-height: 24px;
`;
