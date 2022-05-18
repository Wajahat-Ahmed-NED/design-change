import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import logo from '../assets/title.png';
import { BsPencilSquare, BsFillHandIndexFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaClipboardList } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { ImUpload3 } from 'react-icons/im';
import { setShowSidebar, useShowSidebar } from '../redux/reducers/SidebarReducer';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './component.css';
import { useDispatchEffect } from '../utils/hooks';
import { fetchAccrued } from '../redux/sagas/monthlyDocument/fetchAccruedSaga';
import { useAccruedData } from '../redux/reducers/MonthlyDocReducer';

const routes = [
  { id: 1, path: '/logHour' },
  { id: 2, path: '/profile-screen' },
  { id: 3, path: '/dashboard-subscription' },
  { id: 4, path: '/monthly-document' },
  { id: 5, path: '/flagged' },
  { id: 6, path: '/upload' },
]; 
export default function StudentSidebar() {
  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch();
  const location = useLocation();
  const accrued = useAccruedData(); 

  const path = location.pathname.replace('/student','');
  const routeId = routes.find(route => route.path === path)?.id; 
  const [activeItem, setActiveItem] = useState(routeId);

  useDispatchEffect(fetchAccrued, null, true);

  const {
    independent_hours,
    unrestricted_hours,
    percent_unrestricted,
    supervision_contacts,
    percent_supervision
  } = accrued; 

  return (
    <div>
    <ProSidebar
      breakPoint="sm"
      toggled={showSidebar}
      onToggle={() => dispatch(setShowSidebar(!showSidebar))}
    >
      <SidebarHeader style={{ backgroundColor: '#F4DEEA' }}>
        <figure>
          <img src={logo} alt="Melton Hill Lake" />
        </figure>
      </SidebarHeader>
      <SidebarContent style={{ backgroundColor: '#F4DEEA' }}>
        <Menu iconShape="square mt60">
          <MenuItem icon={<BsPencilSquare />} active={activeItem===1} onClick={() => setActiveItem(1)} >
            Log experience hours
            <Link to="/student/logHour" />
          </MenuItem>
          <MenuItem icon={<CgProfile />} active={activeItem===2} onClick={() => setActiveItem(2)}>
            Profile
            <Link to="/student/profile-screen" />
          </MenuItem>
          <MenuItem icon={<BsFillHandIndexFill />} active={activeItem===3} onClick={() => setActiveItem(3)}>
            Subscription
            <Link to="/student/dashboard-subscription" />
          </MenuItem>
          <MenuItem icon={<FaClipboardList />} active={activeItem===4} onClick={() => setActiveItem(4)}>
            Monthly document
            <Link to="/student/monthly-document" />
          </MenuItem>
          <MenuItem icon={<RiErrorWarningLine />} active={activeItem===5} onClick={() => setActiveItem(5)}>
            Flagged logs
            <Link to="/student/flagged" />
          </MenuItem>
          <MenuItem icon={<ImUpload3 />} active={activeItem===6} onClick={() => setActiveItem(6)}>
            Upload record
            <Link to="/student/upload" />
          </MenuItem>
        </Menu>
        {
        activeItem===4 && 
        <div className='sidebar-accrued-table'>
          <table className='agenda-table'>
            <tr className="barTableHeader">
              <th colSpan="2" style={{ fontSize: '12px' }}>
                Total Accrued:
              </th>
            </tr>
            <tr>
              <td>Independent Hours</td>
              <td className="colSize1">{ independent_hours || '' }</td>
            </tr>
            <tr>
              <td>Unrestricted Hours</td>
              <td className="colSize1">{ unrestricted_hours || ''  }</td>
            </tr>
            <tr>
              <td>% Unrestricted</td>
              <td className="colSize1">{ percent_unrestricted?.toFixed(0) || ''  }</td>
            </tr>
            <tr>
              <td># Supervision Contacts</td>
              <td className="colSize1">{ supervision_contacts || ''  }</td>
            </tr>
            <tr>
              <td>% Supervision</td>
              <td className="colSize1">{ percent_supervision?.toFixed(0) || ''  }</td>
            </tr>
          </table>
        </div>
        }

      </SidebarContent>
    </ProSidebar>
  </div>
)
}
