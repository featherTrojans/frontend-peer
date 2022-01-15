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
  const { header, information } = item;
  return (
    <OnboardingComponentContainer>
      <ImageContainer />
      <>
        <HeaderText>{header}</HeaderText>
        <InformationText>{information}</InformationText>
      </>
    </OnboardingComponentContainer>
  );
};

export default OnboardingComponent;
