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
  Getstarted: undefined;
  Verification: undefined;
  Security: undefined;
  Securepin: undefined;
  Setup: undefined;
  Login: undefined;
  Signup: undefined;
  Forgetpassword: undefined;
  Forgetpasswordotp: undefined;
  Setnewpassword: undefined;
  SecurepinAgain: undefined;
  Welcometochange: undefined;
  Welcome: undefined;

  Root: NavigatorScreenParams<RootTabParamList> | undefined;

  //Transactions
  Transactions: undefined;
  Newtransactions: undefined;
  Transactiondetails: { price: number };
  Transactiondispute: undefined;

//Settings
  Editprofile: undefined;
  Securityprivacy: undefined;
  Changepassword: undefined;
  Changepin: undefined;
  Biometrics: undefined;
  Walletmanagement: undefined;
  Addbvn: undefined;
  Verifybvn: undefined;
  BillContacts: undefined;

  //Withdraw
  Withdrawal: undefined;
  Withdrawlisting: undefined;
  Accountlevel: undefined;
  Verifyemail: undefined;
  Verifyemailcode: undefined;
  Verifypersonalinfo: undefined;
  Personalinfo: undefined;
  Changeappearance: undefined;
  Changememoji: undefined;
  Cardtopup: undefined;
  Cardwithdraw: undefined;
  Feathertransfer: undefined;
  Banktransfer: undefined;
  Paymerchant: undefined;
  Billsandutility: undefined;
  Walletlimits: undefined;
  Shareandearn: undefined;
Securityandprivacy: undefined;
Verifybvncode: undefined;


  //Notification
  Notifications: undefined;


  //Chats
  Chatshome: undefined;
  Chatsdm: {};
  Usersearch: undefined;
  CustomWebView: undefined;
  CustomWebViewSupport: undefined;
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
