import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SupervisorSidebar from '../../components/SupervisorSidebar'
import SignLogs from './signLogs'
import SupervisorFlaggedLogs from './supervisorFlaggedLogs'
import PendingLogs from './supervisorPendingLogs'
import Trainees from './supervisorTrainees'
import ProfileScreen from "./profile";
import PasswordChangeProfile from "../dashboardChangepswd";
import PromptScreen from "../prompt";
import TermsAndCondition from "../termAndcondition";
import Privacy from "../privacyPolicy";
import MonthlyDocument from "./monthlyDocument";
import { useIsSupervisor } from '../../redux/reducers/AuthReducer'
import PageUnauthorized from '../PageUnauthorized'
import LogDetails from './logDetails'


export default function SupervisorDashboard() {

  const isSupervisor = useIsSupervisor();
  
  if(isSupervisor === false)
    return <PageUnauthorized />

  return (
    <div className="sectiondashboard">
        <SupervisorSidebar />
        <Routes>
            <Route path="/signlogs" element={<SignLogs />} />
            <Route path="/log-details/:id" element={<LogDetails />} />
            <Route path="/monthly-document" element={<MonthlyDocument />} />
            <Route path="/trainees" element={<Trainees />} />
            <Route path="/pending-logs" element={<PendingLogs />} />
            <Route path="/flagged-logs" element={<SupervisorFlaggedLogs />} />
            <Route path="/profile-screen" element={<ProfileScreen />} />
            <Route path="/prompt-screen" element={<PromptScreen />} />
            <Route path="/terms-condition" element={<TermsAndCondition />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/password-change-profile" element={<PasswordChangeProfile />} />

        </Routes>
    </div>

  )
}
