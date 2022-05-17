import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import StudentSidebar from '../../components/StudentSidebar'
import DashboardSubscription from "./dashboardSubscription";
import SubscriptionScreen2 from "./subscriptionScreen2Dashboard";
import PaymentDashboardScreen from "./paymentDashboardScreen";
import LogHour from "./logHour";
import Flagged from "./flagged";
import Upload from "./upload";
import MonthlyDocument from './monthlyDocument';
import EditAndResend from './editAndResend';
import ProfileScreen from "../profile";
import PromptScreen from "..//prompt";
import TermsAndCondition from "../termAndcondition";
import Privacy from "../privacyPolicy";
import PasswordChangeProfile from '../dashboardChangepswd';
import { useIsSupervisor } from '../../redux/reducers/AuthReducer';
import PageUnauthorized from '../PageUnauthorized';


export default function StudentDashboard() {
  const isSupervisor = useIsSupervisor();
  
  if(isSupervisor === true)
    return <PageUnauthorized />

  return (
    <div className="sectiondashboard">
        <StudentSidebar />
        <Routes>
          <Route 
            path="/logHour" 
            element={<LogHour />} 
            />
          <Route
            path="/monthly-document"
            element={<MonthlyDocument />}
            />
          <Route
            path="/dashboard-subscription"
            element={<DashboardSubscription />}
            />
          <Route
            path="/subscription-screen-dashbard"
            element={<SubscriptionScreen2 />}
            />
          <Route
            path="/payment-screen-dashbard"
            element={<PaymentDashboardScreen />}
            />
          <Route 
            path="/flagged" 
            element={<Flagged />} 
            />
          <Route 
            path="/upload" 
            element={<Upload />} 
            />
          <Route 
            path="/edit-resend" 
            element={<EditAndResend />} 
            />
          <Route 
            path="/profile-screen" 
            element={<ProfileScreen />} 
            />
          <Route 
            path="/prompt-screen" 
            element={<PromptScreen />} 
            />
          <Route
            path="/terms-condition"
            element={<TermsAndCondition />}
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/password-change-profile"
            element={<PasswordChangeProfile />}
          />

        </Routes>
    </div>

  )
}
