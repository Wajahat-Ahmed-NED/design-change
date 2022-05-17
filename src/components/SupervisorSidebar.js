import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import logo from '../assets/home.png';
import { BsPencilSquare, BsPeopleFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaClipboardList } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FiClock } from 'react-icons/fi';
import { setShowSidebar, useShowSidebar } from '../redux/reducers/SidebarReducer';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const routes = [
  { id: 1, path: '/signlogs' },
  { id: 2, path: '/profile-screen' },
  { id: 3, path: '/trainees' },
  { id: 4, path: '/monthly-document' },
  { id: 5, path: '/pending-logs' },
  { id: 6, path: '/flagged-logs' },
]; 

export default function SupervisorSidebar() {
    const showSidebar = useShowSidebar(); 
    const dispatch = useDispatch()
    const location = useLocation();

    const path = location.pathname.replace('/supervisor','');
    const routeId = routes.find(route => route.path === path)?.id; 
    const [activeItem, setActiveItem] = useState(routeId);
  
  return (
      <div>
        <ProSidebar
          breakPoint="sm"
          toggled={showSidebar}
          onToggle={() => dispatch(setShowSidebar(!showSidebar))}
            >
          <SidebarHeader style={{ backgroundColor: '#FFF2CC' }}>
            <figure>
              <img src={logo} alt="Melton Hill Lake" />
            </figure>
          </SidebarHeader>
          <SidebarContent style={{ backgroundColor: '#FFF2CC' }}>
            <Menu iconShape="square mt60">
              <MenuItem icon={<BsPencilSquare />} active={activeItem===1} onClick={() => setActiveItem(1)}>
                Sign logs
                <Link to="/supervisor/signlogs" />
              </MenuItem>
              <MenuItem icon={<CgProfile />} active={activeItem===2} onClick={() => setActiveItem(2)}>
                Profile
                <Link to="/supervisor/profile-screen" />
              </MenuItem>
              <MenuItem icon={<BsPeopleFill />} active={activeItem===3} onClick={() => setActiveItem(3)}>
                Trainees
                <Link to="/supervisor/trainees" />
              </MenuItem>
              <MenuItem icon={<FaClipboardList />} active={activeItem===4} onClick={() => setActiveItem(4)}>
                Monthly document
                <Link to="/supervisor/monthly-document" />
              </MenuItem>
              <MenuItem icon={<FiClock />} active={activeItem===5} onClick={() => setActiveItem(5)}>
                Pending logs
                <Link to="/supervisor/pending-logs" />
              </MenuItem>
              <MenuItem icon={<RiErrorWarningLine />} active={activeItem===6} onClick={() => setActiveItem(6)}>
                Flagged logs
                <Link to="/supervisor/flagged-logs" />
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
  )
}
