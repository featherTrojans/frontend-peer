import styled from "styled-components/native";
import { COLORS, SIZES } from "../../constants";

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
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 34px;
`;

export const InformationText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #8d8d8d;
`;
