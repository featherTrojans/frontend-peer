import {
  HeaderText,
  ImageContainer,
  InformationText,
  OnboardingComponentContainer,
} from "./OnBoardingComponent.styles";

export type EachOnboardingTypes = {
  item: {
    icon: JSX.Element;
    header: string;
    information: string;
  };
};

const OnboardingComponent = ({ item }: EachOnboardingTypes) => {
  const { header, information, icon } = item;
  return (
    <OnboardingComponentContainer>
      {/* <ImageContainer /> */}
      {icon}
      <>
        <HeaderText>{header}</HeaderText>
        <InformationText>{information}</InformationText>
      </>
    </OnboardingComponentContainer>
  );
};

export default OnboardingComponent;
