// import './App.sass';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./screens/home";
import Login from "./screens/login";
import ForgotPassword from "./screens/forgot_password";
import Reset from "./screens/reset";
import Register from "./screens/registration";
import Subcription from "./screens/subscription";
import Payment from "./screens/payment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSupervisor, useToken } from "./utils/hooks";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import EmailVerification from "./screens/emailVerification";
import NoInternetPage from "./screens/noInternetPage";
import { Offline, Online } from "react-detect-offline";
import SupervisorDashboard from "./screens/supervisorDashbboard";
import StudentDashboard from "./screens/studentDashboard";
import PageNotFound from "./screens/PageNotFound";
import PageUnauthorized from "./screens/PageUnauthorized";

const stripePromise = loadStripe(
  "pk_test_51KEFcQALU9F9wJtIG5c0Ht2UjOE7RBfl9oJ9VzuDhW5Uh89UFpBNgohoDZnd1mxptXE8swHXV4s6W7xtK9gF3IoI00FIW98qNF"
);

function App() {
  const isSupervisor = useSupervisor(); 

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Online> */}
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/:role" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<Reset />} />
          <Route path="register/:role" element={<Register />} />
          <Route path="verify-email" element={<EmailVerification />} />
          <Route path="subscription" element={<Subcription />} />
          <Route path="payment" element={<Payment />} />
          <Route
            key="Supervisor Dashboard"
            path="/supervisor/*"
            element={
              <RequireAuth>
                <SupervisorDashboard />
              </RequireAuth>
            }
          />
          <Route
            key="Student Dashboard"
            path="/student/*"
            element={
              <RequireAuth>
                <StudentDashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </Elements>
      {/* </Online> */}
      {/* <Offline>
        <NoInternetPage />
      </Offline> */}
    </BrowserRouter>
  );
}

function RequireAuth({ children }) {
  const Token = useToken();
  let location = useLocation();
  console.log("Token: ", Token);
  if (!Token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default App;
