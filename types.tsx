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

  //Withdraw
  Requestnew: undefined;
  Availablelisting: undefined;
  Withdraw: undefined; ///Requests(pending and accepted)
  Withdrawpreview: undefined;
  Editmeetup: undefined;
  Pendingwithdraw: undefined;
  Acceptedwithdraw: undefined;
  Requesterinfo: undefined;

  Requestsummary: undefined;
  Cancelrequest: undefined;
  Summary: undefined;
  Negotiate: undefined;
  WithdrawPin: undefined;
  Transactionsrating: undefined;

  //Wallet funding
  Addcash: undefined;
  Choosewallet: undefined;
  WalletPin: undefined;

  //Transfer funds
  Transfercash: undefined;
  TransferInput: undefined;
  Getdetails: undefined;
  Bankaccount: undefined;
  Transferpin: undefined;
  TransferpinBank: undefined;

  //Notification
  Notifications: undefined;

  //Paybills
  Paybills: undefined;
  Airtimeamount: undefined;
  Airtimeanddata: undefined;
  Airtimedetails: undefined;
  Airtimepurchasepin: undefined;
  Electricityamount: undefined;
  Electricitydetails: undefined;
  Electricitytype: undefined;
  Becomeanagent: undefined;
  Electricitymetertype: undefined;
  Dataprovider: undefined;
  Airtimeprovider: undefined;
  Sendcash: undefined;
  Selectbank: undefined;
  Dataplan: undefined;
  Meetuppoint: undefined;
  Safetycautions: undefined;
  //Deposit
  Deposit: undefined;
  Depositupdate: undefined;
  Depositinput: undefined;
  Updatedeposit: undefined;
  Pendingdeposit: undefined;
  Accepteddeposit: undefined;
  Depositpin: undefined;
  Canceldeposit: undefined;

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
