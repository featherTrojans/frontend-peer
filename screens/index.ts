//  i will export all screens inside here

import Onboarding from "./onboarding/Onboarding";

// These are the auth screens
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
import Verification from "./auth/verification/Verification";
import Setup from "./auth/Setup/Setup";
import Welcome from "./auth/welcome/Welcome";

// These are the main app screens
import Home from "./app/Home/Home";
import History from "./app/History/History";
import Transactions from "./app/Transactions/Transactions";
// import Chats from "./app/Chats/Chats";
import Settings from "./app/Settings/Settings";
import Notifications from "./app/Notifications/Notifications";

// These are the transactions sub screens
import Withdraw from "./app/Transactions/Withdraw/Withdraw";
import Transfercash from "./app/Transactions/Transferfunds/Transferfunds/Transfercash";
import Availablelisting from "./app/Transactions/Availablelisting/Availablelisting";
import Addcash from "./app/Transactions/Addcash/Addcash";
import Amount from "./app/Transactions/Amount/Amount";
import Requestnew from "./app/Transactions/Requestnew/Requestnew";
import Getdetails from "./app/Transactions/Transferfunds/Getdetails/Getdetails";
import Bankaccount from "./app/Transactions/Transferfunds/Bankaccount/Bankaccount";
import Choosewallet from "./app/Transactions/Choosewallet/Choosewallet";
import Pendingrequest from "./app/Transactions/Pendingrequest/Pendingrequest";
import Summary from "./app/Transactions/Summary/Summary";
import Cancelrequest from "./app/Transactions/Cancelrequest/Cancelrequest";
import Accepetedrequest from "./app/Transactions/Acceptedrequest/Accepetedrequest";
import Personal from "./auth/signup/Personal/Personal";
import Security from "./auth/signup/Security/Security";
import Securepin from "./auth/signup/Securepin/Securepin";
import Newtransactions from "./app/Newtransactions/Newtransactions";
import TransferInput from "./app/TransferInput/TransferInput";

import Usersearch from "./app/Chats/Usersearch/Usersearch";
import Chatsdm from "./app/Chats/Chatsdm/Chatsdm";
import Chatshome from "./app/Chats/Chatshome/Chatshome";

export {
  Onboarding,
  Login,
  Signup,
  Verification,
  Setup,
  Welcome,
  Home,
  History,
  Transactions,
  Notifications,
  Settings,
  Withdraw,
  Transfercash,
  Addcash,
  Amount,
  Requestnew,
  Availablelisting,
  Getdetails,
  Bankaccount,
  Choosewallet,
  Pendingrequest,
  Summary,
  Cancelrequest,
  Accepetedrequest,
  Personal,
  Security,
  Securepin,
  Newtransactions,
  TransferInput,

  Chatsdm,
  Chatshome,
  Usersearch,
};
