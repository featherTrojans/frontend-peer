

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

import { StackScreenProps } from '@react-navigation/stack';
// import EachOnboarding from './components/EachOnboarding';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined,
  Signup: undefined,
  Personal: undefined,
  Deposit: undefined,
  Security: undefined,
  Securepin: undefined,
  Setup: undefined,
  Welcome: undefined,
  Verification: undefined
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  
};



export type RootTransactionScreen = {
  Verification: undefined;
}

export type RootAuthStackParamList ={
  Login: undefined,
  Signup: undefined,
  Verification: undefined
}

export type RootTabParamList = {
  Home: undefined;
  History: undefined;
  Transactions: undefined;
  Chats: undefined;
  Settings: undefined;
};

export type OnboardingScreenNavigationProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  StackScreenProps<RootStackParamList>
>;


