import Header from "./components/Header";
import Listings from "./screens/Listings";
import LoginScreen from "./screens/LoginScreen";
import NewListingForm from "./screens/NewListingForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ShowListing from "./screens/ShowListing";
import SignUpScreen from "./screens/SignUpScreen";
import VerificationScreen from "./screens/VerificationScreen";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./screens/LandingPage";
import CommonHeader from "./components/CommonHeader";
import EditListingForm from "./screens/EditListingForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./screens/Account";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Header />
                  <LandingPage />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <CommonHeader />
                  <Outlet />
                </>
              }
            >
              <Route path="explore" element={<Listings />} />
              <Route path="login" element={<LoginScreen />} />
              <Route path="sign-up" element={<SignUpScreen />} />
              <Route path="verify" element={<VerificationScreen />} />
              <Route path="new-form" element={<NewListingForm />} />
              <Route path="show-list/:id" element={<ShowListing />} />
              <Route path="edit-list/:id" element={<EditListingForm />} />
              <Route path="account" element={<Account />} />
            </Route>
            {/* Catch-all route */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </AuthProvider>
      <ToastContainer />
    </Router>
  );
}

export default App;
