import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import Score from "./Pages/Dashboard/Admin_menu/Score.jsx";
import Students from "./Pages/Dashboard/Admin_menu/Students.jsx";
import Task from "./Pages/Dashboard/Admin_menu/Task.jsx";
import Help from "./Pages/Dashboard/Admin_menu/Help.jsx";
import Dashboard from "./Pages/Dashboard/Admin_menu/Dashboard.jsx";
import Settings from "./Pages/Dashboard/Admin_menu/Settings.jsx";
import Profile from "./Pages/Dashboard/Admin_menu/Profile.jsx";
import Spinner from "./Components/Spinner/Spinner.jsx";
import Profit from "./Components/ProfitPage/ProfitPage.jsx";
import ReferralPage from "./Components/ReferralPage/ReferralPage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import Guide from "./Components/Guide/Guide.jsx";
import CustomerSupport from "./Components/CustomerSupport/CustomerSupport.jsx";
import DepositPage from "./Components/DepositPage/DepositPage.jsx";
import WithdrawPage from "./Components/WithdrawPage/WithdrawPage.jsx";
import TransactionHistoryPage from "./Components/TransactionHistoryPage/TransactionHistoryPage.jsx";
import InvestmentSummary from "./Components/InvestmentSummary/InvestmentSummary.jsx";
import EditProfileModal from "./Components/UserProfile/EditProfileModal.jsx";
import Dashboarda from "./Components/Dashboard/Dashboard.jsx";
import InvestmentCardApiAdmin from "./Components/MyCoourse/InvestmentCardApiAdmin.jsx";
import AddInvestmentCard from "./Components/AddInvestmentCard/AddInvestmentCard.jsx";
import AdminWithdrawalApprovalPage from "./Components/WithdrawApprove/WithdrawApprove.jsx";

const Layout = lazy(() => import("./Pages/Layout/Layout.jsx"));
const LandingPage = lazy(() => import("./Pages/Home/LandingPage.jsx"));
const SignIn = lazy(() => import("./Pages/SigninPage/SignIn.jsx"));
const SignUp = lazy(() => import("./Pages/SignupPage/SignUP.jsx"));
const TermsAndCondition = lazy(() => import("./Pages/TermsAndCondition/TermsAndConditon.jsx"));
const DashboardLayout = lazy(() => import("./Pages/Dashboard/DashboardLayout/Dashboard.jsx"));
const GeneralSetting = lazy(() => import("./Pages/Dashboard/GeneralSetting/GeneralSetting.jsx"));
const PrivacySetting = lazy(() => import("./Pages/Dashboard/PrivacySetting/PrivacySetting.jsx"));
const BillingSetting = lazy(() => import("./Pages/Dashboard/BillingSetting/BillingSetting.jsx"));
const NotificationSetting = lazy(() => import("./Pages/Dashboard/NotificationSetting/NotificationSetting.jsx"));
const Admin_404 = lazy(() => import("./Pages/Dashboard/Admin_menu/Admin_404.jsx"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<Spinner />}><Layout /></Suspense>}>
        <Route index element={<Suspense fallback={<Spinner />}><LandingPage /></Suspense>} />
        <Route path="termsAndCondition" element={<Suspense fallback={<Spinner />}><TermsAndCondition /></Suspense>} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="guide" element={<Guide />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="profit" element={<Profit />} />
          <Route path="share" element={<ReferralPage />} />
          <Route path="mine" element={<UserProfile />} />
          <Route path="customerSupport" element={<CustomerSupport />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
          <Route path="transactionHistory" element={<TransactionHistoryPage />} />
          <Route path="investmentSummary" element={<InvestmentSummary />} />
          <Route path="editProfile" element={<EditProfileModal />} />
          <Route path="dashboarda" element={<Dashboarda />}/>
          <Route path="addInvestmentCard" element={<AddInvestmentCard />} />
          <Route path="investmentCardAdmin" element={<InvestmentCardApiAdmin />} />
          <Route path="withdrawApprovel" element={<AdminWithdrawalApprovalPage />} />

          
          
         

          
        </Route>
      </Route>

      <Route path="dashboard" element={<Suspense fallback={<Spinner />}><DashboardLayout /></Suspense>}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="profile" element={<Profile />} />
            <Route path="task" element={<Task />} />
            <Route path="settings" element={<Suspense fallback={<Spinner />}><Settings /></Suspense>}>
              <Route index element={<GeneralSetting />} />
              <Route path="billing" element={<BillingSetting />} />
              <Route path="privacy" element={<PrivacySetting />} />
              <Route path="notification" element={<NotificationSetting />} />
              <Route path="help" element={<Help />} />
            </Route>
          </Route>

      <Route path="/signIn" element={<Suspense fallback={<Spinner />}><SignIn /></Suspense>} />
      <Route path="/signUp" element={<Suspense fallback={<Spinner />}><SignUp /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<Spinner />}><Admin_404 /></Suspense>} />
    </Routes>
  );
}

export default AppRoutes;
