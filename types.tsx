import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";

import { StackScreenProps } from "@react-navigation/stack";
// import EachOnboarding from './components/EachOnboarding';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;

export type RootStackParamList = {
  Onboarding: undefined;
  Personal: undefined;
  Verification: undefined;
  Security: undefined;
  Securepin: undefined;
  Setup: undefined;
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;

  //Transactions
  Transactions: undefined;
  Newtransactions: undefined;
  Transactiondetails: {price: number};
  Transactiondispute: undefined;

  //Withdraw
  Requestnew: undefined;
  Availablelisting: undefined;
  Withdraw: undefined; ///Requests(pending and accepted)
  Withdrawpreview: undefined;
  Editmeetup: undefined;
  Pendingwithdraw: undefined;
  Acceptedwithdraw: undefined;
  Requestsummary: undefined;
  Cancelrequest: undefined;
  Summary: undefined;

  //Wallet funding
  Addcash: undefined;
  Choosewallet: undefined;

  //Transfer funds
  Transfercash: undefined;
  TransferInput: undefined;
  Getdetails: undefined;
  Bankaccount: undefined;
  Transferpin: undefined;

  //Notification
  Notifications: undefined;

  //Deposit
  Deposit: undefined;
  Depositupdate: undefined;
  Pendingdeposit: undefined;
  Accepteddeposit: undefined;
  Depositpin: undefined;
  Canceldeposit: undefined;

  //Chats
  Chatshome: undefined;
  Chatsdm: undefined;
  Usersearch: undefined;
};

export type RootTransactionScreen = {
  Verification: undefined;
};

export type RootAuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Verification: undefined;
};

export type RootAddcashParamList = {
  Addcash: undefined;
  Choosewallet: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  History: undefined;
  Transactions: undefined;
  Chats: undefined;
  Settings: undefined;
};

export type OnboardingScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  "Onboarding"
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    StackScreenProps<RootStackParamList>
  >;
