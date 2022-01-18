import styled from "styled-components/native";
import { COLORS, FONTS } from "../constants";

export const InputContainer = styled.View`
  height: 62;
  flexdirection: row;
  alignitems: center;
  borderwidth: 0.5;
  paddinghorizontal: 20;
  borderradius: 10;
  bordercolor: ${COLORS.inputBorderColor};
  backgroundcolor: ${COLORS.blue6};
`
export const Textinput = styled.TextInput`
  flex: 1;
  bordercolor: ${COLORS.white};
  color: ${COLORS.white};
  fontsize: 14;
  paddingleft: 12;
  borderleftwidth: 1;
  borderrightcolor: ${COLORS.white};
`


export const JustifyBetween = styled.View`

flexDirection: row;
justifyContent: space-between;
alignItems: center;
`