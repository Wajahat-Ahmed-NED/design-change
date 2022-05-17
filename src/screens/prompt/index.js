import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './PromptScreen.css';
import { SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../assets/home.png';
import { GiHamburgerMenu } from 'react-icons/gi';

import { BsPencilSquare, BsFillHandIndexFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaClipboardList } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { ImUpload3 } from 'react-icons/im';

const PromptScreen = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="sectiondashboard">
      <div>
        <ProSidebar
          breakPoint="sm"
          toggled={showSidebar}
          onToggle={() => setShowSidebar(!showSidebar)}
        >
          <SidebarHeader style={{ backgroundColor: '#FFF2CC' }}>
            <figure>
              <img src={logo} alt="Melton Hill Lake" />
            </figure>
          </SidebarHeader>
          <SidebarContent style={{ backgroundColor: '#FFF2CC' }}>
            <Menu iconShape="square mt60">
              <MenuItem icon={<BsPencilSquare />}>
                Log experience hours
                <Link to="/logHour" />
              </MenuItem>
              <MenuItem icon={<CgProfile />} active={true}>
                Profile
                <Link to="/profile-screen" />
              </MenuItem>
              <MenuItem icon={<BsFillHandIndexFill />}>
                Subscription
                <Link to="/dashboard-subscription" />
              </MenuItem>
              <MenuItem icon={<FaClipboardList />}>
                Monthly document
                <Link to="/monthly-document" />
              </MenuItem>
              <MenuItem icon={<RiErrorWarningLine />}>
                Flagged logs
                <Link to="/flagged" />
              </MenuItem>
              <MenuItem icon={<ImUpload3 />}>
                Upload record
                <Link to="/upload" />
              </MenuItem>

              <MenuItem>
                <table>
                  <tr className="barTableHeader">
                    <th colSpan="2">Total Accrued:</th>
                  </tr>
                  <tr>
                    <td>Independent Hours</td>
                    <td className="colSize"></td>
                  </tr>
                  <tr>
                    <td>Unrestricted Hours</td>
                    <td className="colSize"></td>
                  </tr>
                  <tr>
                    <td>% Unrestricted</td>
                    <td className="colSize"></td>
                  </tr>
                  <tr>
                    <td># Supervision Contacts</td>
                    <td className="colSize"></td>
                  </tr>
                  <tr>
                    <td>% Supervision</td>
                    <td className="colSize"></td>
                  </tr>
                </table>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
      <div className="section has-background">
        <button
          className="Toggle_btn"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
        </button>
        <div className="columns mtPrompt">
          <div className="column is-one-fifth"></div>
          <div className=" is-one-third">
            <p className="promptText">
              Did you sign your final verification form? <br />
              Yes (Button) <br /> No, sign now
            </p>
            <p className="mt60 promptText">
              If no then the user can choose if they had an individual
              supervisor or multiple <br /> supervisors that will lead them to
              the coresponding link of the BACB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptScreen;
