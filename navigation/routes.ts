import {
  AccountverificationScreen,
  AirtimeordataScreen,
  BankaccountinformationScreen,
  BillerstateScreen,
  BlankScreen,
  CableiucnumberScreen,
  CardScreen,
  CarddisclosureScreen,
  CardpendingverificationScreen,
  CardtopupScreen,
  ChangeappearanceScreen,
  ChatsScreen,
  ChatsdmScreen,
  ChatsprofileScreen,
  ChoosebankScreen,
  ChoosebillerScreen,
  ChoosecableScreen,
  ChoosecableamountScreen,
  ChoosecablereceiverScreen,
  ChoosefeatheruserScreen,
  ChoosememojiScreen,
  ChoosenetworkScreen,
  EditprofileScreen,
  FindmerchantScreen,
  HomeScreen,
  LoginScreen,
  MeternumberScreen,
  MywalletScreen,
  NetworkreceiverScreen,
  NotificationsScreen,
  OnboardingScreen,
  PersonalRegisterScreen,
  ProfileScreen,
  SearchcontactScreen,
  SearchmerchantidScreen,
  SecurityandprivacyScreen,
  SendtobankScreen,
  SetupmfaScreen,
  StartnewchatScreen,
  TransactionDetailsScreen,
  TransactionsScreen,
  TransactionsummaryScreen,
  VerifybvnScreen,
  WelcomeScreen,
  PhoneVerificationScreen,
  BVNScreen,
  FeatherTagScreen,
  BvnErrorScreen,
  BVNSuccessScreen,
  UploadDocScreen,
  PinScreen,
  CardCreateSuccessScreen,
  AmounttosendScreen,
  PhoneRegisterScreen,
  TransactionpinScreen,
  CustomWebScreen,
  WithdrawcashScreen,
  TransactionSuccessScreen,
  WalletfundingScreen,
  MemojisuccessScreen,
  ChoosememojibgScreen,
  CreatecardScreen,
  JoinwaitlistScreen,
  AirtimeordatanumberScreen,
} from "../screens";
import NegotiationChargeScreen from "../screens/NegotiationChargeScreen";

// BVNSuccessScreen
// BvnErrorScreen

//The screens in the auth route are the screen that you can onlu see if you havent logged in

export const authRoutes = [
  {
    screen: OnboardingScreen,
    route: "onboarding_screen",
  },
  {
    screen: LoginScreen,

    route: "login_screen",
  },
  {
    screen: WelcomeScreen,

    route: "welcome_screen",
  },
  {
    screen: PersonalRegisterScreen,

    route: "personalregister_screen",
  },
  {
    title: "",
    screen: PhoneRegisterScreen,
    showHeader: false,
    hideHiderTitle: false,
    route: "phone_screen",
  },
  {
    title: "",
    screen: PhoneVerificationScreen,
    showHeader: false,
    hideHiderTitle: false,
    route: "phone-verify_screen",
  },
  {
    screen: BVNScreen,

    route: "bvn_screen",
  },
  {
    screen: BvnErrorScreen,

    route: "bvn-error_screen",
  },
  {
    screen: BVNSuccessScreen,

    route: "bvn-success_screen",
  },
  {
    title: "",
    screen: VerifybvnScreen,
    showHeader: false,
    hideHiderTitle: false,
    route: "bvn-verify_screen",
  },
  {
    screen: FeatherTagScreen,

    route: "feathertag_screen",
  },
];

export const dashboardRoutes = [
  {
    screen: BlankScreen,

    route: "dashboard_screen",
  },
  {
    screen: BlankScreen,

    route: "notifications_screen",
  },
];

export const transactRoutes = [
  {
    screen: TransactionsScreen,

    route: "transact_screen",
  },
  // {
  //   screen: BvnErrorScreen,

  //   route: "bvn-error_screen",
  // },
  // {
  //   screen: BVNSuccessScreen,

  //   route: "bvn-success_screen",
  // },
  {
    title: "",
    screen: VerifybvnScreen,
    showHeader: false,
    hideHiderTitle: false,
    route: "bvn-verify_screen",
  },
  {
    screen: TransactionDetailsScreen,

    route: "transacttiondetails_screen",
  },
  {
    screen: FindmerchantScreen,

    route: "findmerchant_screen",
  },
  {
    screen: WithdrawcashScreen,

    route: "withdrawcash_screen",
  },
  {
    screen: SearchmerchantidScreen,

    route: "searchmerchantid_screen",
  },

  {
    screen: ChoosenetworkScreen,

    route: "choosenetwork_screen",
  },
  {
    screen: NetworkreceiverScreen,

    route: "networkreceiver_screen",
  },
  {
    screen: AirtimeordataScreen,

    route: "airtimeordata_screen",
  },
  {
    screen: AirtimeordatanumberScreen,

    route: "airtimeordatanumber_screen",
  },

  {
    screen: SendtobankScreen,

    route: "sendtobank_screen",
  },
  {
    screen: BankaccountinformationScreen,

    route: "bankaccountinformation_screen",
  },

  {
    screen: ChoosebankScreen,

    route: "choosebank_screen",
  },

  {
    screen: ChoosebillerScreen,

    route: "choosebiller_screen",
  },
  {
    screen: BillerstateScreen,

    route: "billerstate_screen",
  },
  {
    screen: MeternumberScreen,

    route: "meternumber_screen",
  },

  {
    screen: ChoosecableScreen,

    route: "choosecable_screen",
  },
  {
    screen: ChoosecableamountScreen,

    route: "choosecableamount_screen",
  },
  {
    screen: ChoosecablereceiverScreen,

    route: "choosecablereceiver_screen",
  },
  {
    screen: CableiucnumberScreen,

    route: "cableiuc_screen",
  },

  {
    screen: ChoosefeatheruserScreen,

    route: "choosefeatheruser_screen",
  },

  {
    screen: SearchcontactScreen,

    route: "searchcontact_screen",
  },
  {
    screen: TransactionsummaryScreen,

    route: "transactionsummary_screen",
  },
  {
    screen: PinScreen,

    route: "pin_screen",
  },
  {
    screen: AmounttosendScreen,

    route: "amounttosend_screen",
  },
  {
    screen: NegotiationChargeScreen,

    route: "negotiationcharge_screen",
  },
  {
    screen: TransactionpinScreen,

    route: "transactionpin_screen",
  },
  {
    screen: WalletfundingScreen,

    route: "walletfunding_screen",
  },

  {
    screen: CardScreen,

    route: "cards_screen",
  },
  {
    screen: CarddisclosureScreen,

    route: "carddisclosure_screen",
  },
  {
    screen: CreatecardScreen,

    route: "createcard_screen",
  },
  {
    screen: JoinwaitlistScreen,

    route: "joinwaitlist_screen",
  },
  {
    screen: CarddisclosureScreen,

    route: "cardpendingverification_screen",
  },
  {
    screen: CardCreateSuccessScreen,

    route: "cardcreationsuccess_screen",
  },
  {
    screen: CardtopupScreen,

    route: "cardtopup_screen",
  },

  {
    screen: ChatsScreen,
    route: "chats_screen",
  },
  {
    screen: ChatsdmScreen,

    route: "chatsdm_screen",
  },
  {
    screen: ChatsprofileScreen,

    route: "chatsprofile_screen",
  },
  {
    title: "",
    screen: StartnewchatScreen,

    route: "startnewschat_screen",
  },
  {
    screen: NotificationsScreen,
    showHeader: false,
    hideHiderTitle: false,
    route: "notification_screen",
  },
  {
    screen: CustomWebScreen,
    route: "customweb_screen",
  },
  {
    screen: TransactionSuccessScreen,

    route: "transactionsuccess_screen",
  },
  {
    screen: ProfileScreen,

    route: "profile_screen",
  },
  {
    screen: EditprofileScreen,

    route: "editprofile_screen",
  },
  {
    screen: ChangeappearanceScreen,

    route: "changeappearance_screen",
  },
  {
    screen: AccountverificationScreen,

    route: "accountverification_screen",
  },
  {
    screen: ChoosememojiScreen,

    route: "choosememoji_screen",
  },
  {
    screen: MemojisuccessScreen,

    route: "memojisuccess_screen",
  },
  {
    screen: ChoosememojibgScreen,

    route: "choosememojibg_screen",
  },
  {
    screen: MywalletScreen,

    route: "mywallet_screen",
  },
  {
    screen: SecurityandprivacyScreen,

    route: "securityandprivacy_screen",
  },
  {
    screen: SetupmfaScreen,

    route: "setupmfa_screen",
  },
  {
    screen: VerifybvnScreen,

    route: "verifybvn_screen",
  },
  {
    screen: BVNScreen,

    route: "bvn_screen",
  },

  {
    screen: BvnErrorScreen,

    route: "bvn-error_screen",
  },
  {
    screen: BVNSuccessScreen,

    route: "bvn-success_screen",
  },
  {
    screen: UploadDocScreen,

    route: "uploaddoc_screen",
  },
];
