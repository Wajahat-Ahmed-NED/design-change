import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import AttachmentContainer from '../../../components/AttachmentContainer';
import CSVDownloadBtn from '../../../components/CSVDownloadBtn';
import './Upload.css';


const Upload = () => {
  const navigate = useNavigate();
  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch()


  return (
      <div className="section has-light-background">
        <div className="columns">
          <div className="column"></div>
        </div>
        <div className="columns">
          <div className="column">
            <button
              className="Toggle_btn"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            >
              {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>
            <p className="headingMain">Upload record</p>

            <p className="pera mt30">
              Attach any previous documents and experience hours here.
            </p>

            <p className="pera mt30">
              Make one for Individual documents and one for Group/More than one
              supervisor docs
            </p>

            <div className="column is-two-fifths">
              <AttachmentContainer />
            </div>

            <p className="pera mt30 ">File Name and sorted by dates</p>
            
            <CSVDownloadBtn />
            
          </div>
        </div>
      </div>
  );
};

export default Upload;
