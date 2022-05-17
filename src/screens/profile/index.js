import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './ProfileScreen.css';
import { SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/home.png';
import { BsPencilSquare, BsFillHandIndexFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaClipboardList } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { ImUpload3 } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';
import {  useDispatch } from 'react-redux';
import { useUser } from '../../redux/reducers/AuthReducer';
import { signOutAction } from '../../redux/sagas/auth/AuthSagas';
import { setShowSidebar, useShowSidebar } from '../../redux/reducers/SidebarReducer';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useUser();

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, []);

  const onLogout = () => { 
    dispatch(signOutAction())
    navigate('/');
    window.location.reload();
  }

  const showSidebar = useShowSidebar(); 

  return (
      <div className="section has-background">
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
            <p className="headingMain">Profile</p>

            <p className="pera mt60">Name</p>
            <p className="heading3rd ">{ user.name }</p>
            <p className="pera mt30">Email</p>
            <p className="heading3rd ">{ user.email }</p>

            <p className="pera mt40">
              <a
                className="pera  mt20"
                onClick={_ => navigate(`/student/password-change-profile`)}
              >
                Change Password
              </a>
            </p>

            <p className="pera mt20">
              <a
                className="pera  mt20"
                onClick={_ => navigate(`/student/terms-condition`)}
              >
                Terms and Conditions
              </a>
            </p>
            <p className="pera mt20">
              <a className="pera  mt20" onClick={_ => navigate(`/student/privacy`)}>
                Privacy Policy
              </a>
            </p>

            <p className="mt40">
              <a className=" changelink mt60" onClick={onLogout}>
                Log out
              </a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default ProfileScreen;
