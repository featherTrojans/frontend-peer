//  i will export all screens inside here

import Onboarding from "./onboarding/Onboarding";

// These are the auth screens
import Login from "./auth/login/Login";

import Verification from "./auth/verification/Verification";
import Welcome from "./auth/welcome/Welcome";

// These are the main app screens
import Home from "./app/Home/Home";
import Getstarted from "./app/Getstarted/Getstarted";
import Transactions from "./app/Transactions/Transaction/Transaction";
import Transactiondetails from "./app/Transactions/Transactiondetails/Transactiondetails";

import Forgetpassword from "./auth/forgetpassword/Forgetpassword";
import Forgetpasswordotp from "./auth/forgetpassword/Forgetpasswordotp/Forgetpasswordotp";
import Setnewpassword from "./auth/forgetpassword/Setnewpassword/Setnewpassword";
import Notifications from "./app/Notifications/Notifications";
// These are the transactions sub screens

import Personal from "./auth/signup/Personal/Personal";
import Security from "./auth/signup/Security/Security";
import Securepin from "./auth/signup/Securepin/Securepin";
import Usersearch from "./app/Chats/Usersearch/Usersearch";
import Chatsdm from "./app/Chats/Chatsdm/Chatsdm";
import Chatshome from "./app/Chats/Chatshome/Chatshome";



//This screen is for testing somne functionalities
 
import Testings from "./Testings";
import SecurepinAgain from "./auth/signup/Securepin/SecurepinAgain";
import CustomWebView from "./shared/CustomWebView";
import LockScreen from "./shared/LockScreen/LockScreen";
import RequesterinfoScreen from "./shared/RequesterinfoScreen";
import Profile from "./app/Profile/Profile";
import Cards from "./app/Cards/Cards";
import Withdrawal from "./app/Withdrawal/Withdrawal";
import Withdrawlisting from "./app/Withdrawal/Withdrawlisting";



export {
  Onboarding,
  Login,
  Verification,
  Personal,
  Security,
  Securepin,
  Forgetpassword,
  Forgetpasswordotp,
  Setnewpassword,
  Welcome,
  Home,
  Withdrawal,
  Withdrawlisting,
  Profile,
  Cards,
  Transactions,
  Getstarted,
  Notifications,
  Chatsdm,
  Chatshome,
  Usersearch,
  Testings,
  SecurepinAgain,
  CustomWebView,
  LockScreen,
  Transactiondetails,
  RequesterinfoScreen
};
