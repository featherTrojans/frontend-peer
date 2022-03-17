import styled from "styled-components/native";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";

export const OnboardingComponentContainer = styled.View`
  width: ${SIZES.width}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 35px;
  margin-top: -80px
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
  margin-bottom: 35px;
  line-height: 35px;
  padding: 0px 15px;
`;

export const InformationText = styled.Text`
 ${{...fontsize.bsmall, ...FONTS.regular}}
  text-align: center;
  color: ${COLORS.grey5};
  line-height: 24px;
  padding: 0px 25px;
`;
