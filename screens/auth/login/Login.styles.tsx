import styled from "styled-components/native";
import { COLORS, SIZES } from "../../../constants";

export const LoginContainer = styled.ScrollView`
  flex: 1;
  background: ${COLORS.blue6};
  paddinghorizontal: 25;
`;

export const LogoWrapper = styled.View`
  width: ${SIZES.width - 50};
  marginVertical: 140px;
  justifyContent: center;
  alignItems: center;
`;

// export const InputiconWrapper = styled.View`

// borderRightWidth: ${1},
// borderColor: ${COLORS.white},
// paddingRight: 12,
// `;

export const LoginText = styled.Text``;
