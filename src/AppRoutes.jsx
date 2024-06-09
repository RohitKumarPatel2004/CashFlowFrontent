import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";

import Spinner from "./Components/Spinner/Spinner.jsx";
import DepositPage from "./Components/DepositPage/DepositPage.jsx";
import WithdrawPage from "./Components/WithdrawPage/WithdrawPage.jsx";
import TransactionHistoryPage from "./Components/TransactionHistoryPage/TransactionHistoryPage.jsx";
import InvestmentSummary from "./Components/InvestmentSummary/InvestmentSummary.jsx";
import EditProfileModal from "./Components/UserProfile/EditProfileModal.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import InvestmentCardApiAdmin from "./Components/MyCoourse/InvestmentCardApiAdmin.jsx";
import AddInvestmentCard from "./Components/AddInvestmentCard/AddInvestmentCard.jsx";
import AdminWithdrawalApprovalPage from "./Components/WithdrawApprove/WithdrawApprove.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import Guide from "./Components/Guide/Guide.jsx";
import Profit from "./Components/ProfitPage/ProfitPage.jsx";
import ReferralPage from "./Components/ReferralPage/ReferralPage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import CustomerSupport from "./Components/CustomerSupport/CustomerSupport.jsx";

const Layout = lazy(() => import("./Pages/Layout/Layout.jsx"));
const LandingPage = lazy(() => import("./Pages/Home/LandingPage.jsx"));
const SignIn = lazy(() => import("./Pages/SigninPage/SignIn.jsx"));
const SignUp = lazy(() => import("./Pages/SignupPage/SignUP.jsx"));
const Admin_404 = lazy(() => import("./Components/Admin_404/Admin_404.jsx"));

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <Layout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="aboutUs"
          element={
            <Suspense fallback={<Spinner />}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="guide"
          element={
            <Suspense fallback={<Spinner />}>
              <Guide />
            </Suspense>
          }
        />

        <Route element={<PrivateRoute />}>
          <Route
            path="profit"
            element={
              <Suspense fallback={<Spinner />}>
                <Profit />
              </Suspense>
            }
          />
          <Route
            path="share"
            element={
              <Suspense fallback={<Spinner />}>
                <ReferralPage />
              </Suspense>
            }
          />
          <Route
            path="mine"
            element={
              <Suspense fallback={<Spinner />}>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="customerSupport"
            element={
              <Suspense fallback={<Spinner />}>
                <CustomerSupport />
              </Suspense>
            }
          />
          <Route
            path="deposit"
            element={
              <Suspense fallback={<Spinner />}>
                <DepositPage />
              </Suspense>
            }
          />
          <Route
            path="withdraw"
            element={
              <Suspense fallback={<Spinner />}>
                <WithdrawPage />
              </Suspense>
            }
          />
          <Route
            path="transactionHistory"
            element={
              <Suspense fallback={<Spinner />}>
                <TransactionHistoryPage />
              </Suspense>
            }
          />
          <Route
            path="investmentSummary"
            element={
              <Suspense fallback={<Spinner />}>
                <InvestmentSummary />
              </Suspense>
            }
          />
          <Route
            path="editProfile"
            element={
              <Suspense fallback={<Spinner />}>
                <EditProfileModal />
              </Suspense>
            }
          />
          <Route
            path="dashboarda"
            element={
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="addInvestmentCard"
            element={
              <Suspense fallback={<Spinner />}>
                <AddInvestmentCard />
              </Suspense>
            }
          />
          <Route
            path="investmentCardAdmin"
            element={
              <Suspense fallback={<Spinner />}>
                <InvestmentCardApiAdmin />
              </Suspense>
            }
          />
          <Route
            path="withdrawApprovel"
            element={
              <Suspense fallback={<Spinner />}>
                <AdminWithdrawalApprovalPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route
        path="/signIn"
        element={
          <Suspense fallback={<Spinner />}>
            <SignIn />
          </Suspense>
        }
      />
      <Route
        path="/signUp"
        element={
          <Suspense fallback={<Spinner />}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Spinner />}>
            <Admin_404 />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
