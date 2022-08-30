//  i will export all screens inside here

import Onboarding from "./onboarding/Onboarding";

// These are the auth screens
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
import Verification from "./auth/verification/Verification";
import Setup from "./auth/Setup/Setup";
import Welcome from "./auth/welcome/Welcome";
import Welcometochange from "./auth/Welcometochange/Welcometochange";

// These are the main app screens
import Home from "./app/Home/Home";
import Getstarted from "./app/Getstarted/Getstarted";
import History from "./app/History/History";
// import Transactions from "./app/Transactions/Transactions";
import Transactions from "./app/Transactions/Transaction/Transaction";
// import Chats from "./app/Chats/Chats";
import Settings from "./app/Settings/Settings";
import Editprofile from "./app/Settings/Editprofile/Editprofile";
// import Security from "./app/Settings/Securityandprivacy/Securityprivacy";
import Securityprivacy from "./app/Settings/Securityandprivacy/Securityprivacy";
import Changepassword from "./app/Settings/Securityandprivacy/Changepassword/Changepassword";
import Changepin from "./app/Settings/Securityandprivacy/Changepin/Changepin";
import Forgetpassword from "./auth/forgetpassword/Forgetpassword";
import Biometrics from "./app/Settings/Securityandprivacy/Biometrics/Biometrics";
import Forgetpasswordotp from "./auth/forgetpassword/Forgetpasswordotp/Forgetpasswordotp";
import Setnewpassword from "./auth/forgetpassword/Setnewpassword/Setnewpassword";

import Notifications from "./app/Notifications/Notifications";
// These are the transactions sub screens

import Availablelisting from "./app/Withdraws/Availablelisting/Availablelisting";
import Addcash from "./app/Walletfunding/Addcash/Addcash";

import Requestnew from "./app/Withdraws/Requestnew/Requestnew";
import Bankaccount from "./app/Transferfunds/Bankaccount/Bankaccount";
// import Pendingrequest from "../NO/Pendingrequest/Pendingrequest";
// import Accepetedrequest from "../NO/Acceptedrequest/Accepetedrequest";

import Summary from "./app/Withdraws/Summary/Summary";
import Cancelrequest from "./app/Withdraws/Cancelrequest/Cancelrequest";
import Personal from "./auth/signup/Personal/Personal";
import Security from "./auth/signup/Security/Security";
import Securepin from "./auth/signup/Securepin/Securepin";
import Newtransactions from "./app/Transactions/Newtransactions/Newtransactions";
import TransferInput from "./app/Transferfunds/TransferInput/TransferInput";
import Usersearch from "./app/Chats/Usersearch/Usersearch";
import Chatsdm from "./app/Chats/Chatsdm/Chatsdm";
import Chatshome from "./app/Chats/Chatshome/Chatshome";
import Chatsoon from "./app/Chats/Chatsoon/Chatsoon";
import Withdraw from "./app/Withdraws/Withdraw/Withdraw";
import Transfercash from "./app/Transferfunds/Transfercash/Transfercash";
import Getdetails from "./app/Transferfunds/Getdetails/Getdetails";
import Choosewallet from "./app/Walletfunding/Choosewallet/Choosewallet";
import Transactiondetails from "./app/Transactions/Transactiondetails/Transactiondetails";
import Transactiondispute from "./app/Transactions/Transactiondispute/Transactiondispute";
import Transactionsrating from "./app/Transactions/Transacrionsrating/Transactionsrating";
import Deposit from "./app/Deposit/Deposit";
import Withdrawpreview from "./app/Withdraws/Withdrawpreview/Withdrawpreview";
import Editmeetup from "./app/Withdraws/Editmeetup/Editmeetup";
import Pendingwithdraw from "./app/Withdraws/Pendingwithdraw/Pendingwithdraw";
import Acceptedwithdraw from "./app/Withdraws/Acceptedwithdraw/Acceptedwithdraw";
import Requestsummary from "./app/Withdraws/Requestsummary/Requestsummary";
import Transferpin from "./app/Transferfunds/Transferpin/Transferpin";
import Selectbank from "./app/Transferfunds/Selectbank/Selectbank";
import Canceldeposit from "./app/Deposit/Canceldeposit/Canceldeposit";
import Pendingdeposit from "./app/Deposit/Pendingdeposit/Pendingdeposit";
import Accepteddeposit from "./app/Deposit/Accepteddeposit/Accepteddeposit";
import Depositpin from "./app/Deposit/Depositpin/Depositpin";
import Depositupdate from "./app/Deposit/Depositupdate/Depositupdate";
import DepositSummary from "./app/Deposit/DepositSummary/DepositSummary";
import Updatedeposit from "./app/Deposit/Updatedeposit/Updatedeposit";
import WalletPin from "./app/Walletfunding/WalletPin/WalletPin";
import Walletmanagement from "./app/Settings/Walletmanagement/Walletmanagement";
import Addbvn from "./app/Settings/Addbvn/Addbvn";
import Verifybvn from "./app/Settings/Verifybvn/Verifybvn";

import Paybills from "./app/Billpayments/Paybills/Paybills";
import Airtimeamount from "./app/Billpayments/Airtime/Airtimeamount/Airtimeamount";
import Airtimeanddata from "./app/Billpayments/Airtime/Airtimeanddata/Airtimeanddata";
import Airtimedetails from "./app/Billpayments/Airtime/Airtimedetails/Airtimedetails";

import Airtimepurchasepin from "./app/Billpayments/Airtime/Airtimepurchasepin/Airtimepurchasepin";
import Electricityamount from "./app/Billpayments/Electricity/Electricityamount/Electricityamount";
import Electricitydetails from "./app/Billpayments/Electricity/Electricitydetails/Electricitydetails";
import Electricitytype from "./app/Billpayments/Electricity/Electricitytype/Electricitytype";
import Electricitymetertype from "./app/Billpayments/Electricity/Electricitymetertype/Electricitymetertype";
import Dataprovider from "./app/Billpayments/Airtime/Dataprovider/Dataprovider";
import Dataplan from "./app/Billpayments/Airtime/Dataplan/Dataplan";
import Airtimeprovider from "./app/Billpayments/Airtime/Airtimeprovider/Airtimeprovider";
import Becomeanagent from "./app/Becomeanagent/Becomeanagent";
import Sendcash from "./app/Transferfunds/Sendcash/Sendcash";
import Meetuppoint from "./app/Meetuppoint/Meetuppoint";
import Safetycautions from "./app/Safetycautions/Safetycautions";
import Requesterinfo from "./app/Requesterinfo/Requesterinfo";
import Depositstart from "./app/Deposit/Depositstart/Depositstart";
//This screen is for testing somne functionalities
 
import Testings from "./Testings";
import TransferpinBank from "./app/Transferfunds/Transferpin/TransferPinBank";
import WithdrawPin from "./app/Withdraws/WithdrawPin/WithdrawPin";
import SecurepinAgain from "./auth/signup/Securepin/SecurepinAgain";
import CustomWebView from "./shared/CustomWebView";
import Depositinput from "./app/Deposit/DepositInput/Depositinput";
import LockScreen from "./shared/LockScreen/LockScreen";
import RequesterinfoScreen from "./shared/RequesterinfoScreen";

export {
  Onboarding,
  Login,
  Signup,
  Verification,
  Setup,
  Personal,
  Security,
  Securepin,
  Forgetpassword,
  Forgetpasswordotp,
  Setnewpassword,
  Biometrics,
  Welcome,
  Welcometochange,
  Home,
  Transactions,
  Newtransactions,
  Transactiondetails,
  Transactiondispute,
  Selectbank,
  Transactionsrating,
  History,
  Getstarted,
  Settings,
  Editprofile,
  Securityprivacy,
  Changepassword,
  Depositstart,
  Changepin,
  Requesterinfo,
  Addcash,
  Choosewallet,
  Transfercash,
  TransferInput,
  Getdetails,
  Bankaccount,
  Transferpin,
  Notifications,
  Deposit,
  Depositupdate,
  Updatedeposit,
  Sendcash,
  Pendingdeposit,
  Accepteddeposit,
  Depositpin,
  Canceldeposit,
  Requestnew,
  Availablelisting,
  Withdraw,
  Withdrawpreview,
  Editmeetup,
  Walletmanagement,
  Addbvn,
  Pendingwithdraw,
  Acceptedwithdraw,
  Requestsummary,
  Summary,
  Cancelrequest,
  Chatsdm,
  Verifybvn,
  Chatshome,
  Becomeanagent,
  Chatsoon,
  Usersearch,
  Safetycautions,
  // Pendingrequest,
  // Accepetedrequest,
  WalletPin,
  Testings,
  TransferpinBank,
  WithdrawPin,
  SecurepinAgain,
  CustomWebView,
  Depositinput,
  LockScreen,
  Paybills,
  Airtimeamount,
  Airtimeanddata,
  Airtimedetails,
  Meetuppoint,
  Airtimepurchasepin,
  Airtimeprovider,
  Electricityamount,
  Electricitydetails,
  Electricitytype,
  Electricitymetertype,
  Dataprovider,
  Dataplan,
  DepositSummary,
  RequesterinfoScreen
};
