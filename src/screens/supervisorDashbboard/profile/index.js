import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setSuccess, useError, useIsLoading, useSuccess, useUserProfile } from '../../../redux/reducers/ProfileReducer';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import { signOutAction } from '../../../redux/sagas/auth/AuthSagas';
import { fetchProfile } from '../../../redux/sagas/profile/fetchSaga';
import { updateProfile } from '../../../redux/sagas/profile/updateSaga';
import { useDispatchEffect } from '../../../utils/hooks';
import { validateSupervisorProfile } from '../../../utils/validation';
import './styles.css';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useUserProfile();
  const isLoading = useIsLoading(); 
  const showSidebar = useShowSidebar(); 

  const [editMode, setEditMode] = useState(false);

  useDispatchEffect(fetchProfile, null, true);
  
  const onLogout = () => { 
    dispatch(signOutAction())
    navigate('/');
    window.location.reload();

  }

  if(isLoading)
    return (
      <LoadingSpinner style={{ width: '100%'}} />
    )


  return (
      <div className="section has-light-background">
        <div className="columns">
          <div className="column"></div>
        </div>
        <div className="columns profile">
          <div className="column is-one-quarter">
            <button
              className="Toggle_btn"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            >
              {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>
            <p className="headingMain">Profile</p>
            {
              editMode ? <EditForm onSave={() => setEditMode(false)}/> :
              <>
              <p className="pera mt60">Name</p>
              <p className="heading3rd ">{ user?.name }</p>
              <p className="pera mt30">Email</p>
              <p className="heading3rd ">{ user?.email }</p>
              <p className="pera mt30">Supervisor Qualification</p>
              <p className="heading3rd ">{ user?.supervisor?.supervisor_qualification }</p>
              <p className="pera mt30">BACB Account ID Number</p>
              <p className="heading3rd ">{ user?.supervisor?.bacb_account_number }</p>
              <p className="pera mt30">BACB Certification ID Number</p>
              <p className="heading3rd ">{ user?.supervisor?.bacb_certification_number }</p>
              <p className="pera mt30">Date Qualified to Supervise</p>
              <p className="heading3rd ">{ user?.supervisor?.date_qualified }</p>
              <p className="pera mt30">Date of Supervision Contract</p>
              <p className="heading3rd ">{ user?.supervisor?.date_contract }</p>
              <button 
                className="primary-button" 
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              </>
            }

            <p className="pera mt40">
              <a
                className="pera  mt20"
                onClick={_ => navigate(`/supervisor/password-change-profile`)}
              >
                Change Password
              </a>
            </p>

            <p className="pera mt20">
              <a
                className="pera  mt20"
                onClick={_ => navigate(`/supervisor/terms-condition`)}
              >
                Terms and Conditions
              </a>
            </p>
            <p className="pera mt20">
              <a className="pera  mt20" onClick={_ => navigate(`/supervisor/privacy`)}>
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


const EditForm = ({ onSave }) => { 
  const user = useUserProfile();
  const isLoading = useIsLoading(); 
  const dispatch = useDispatch();
  const updateSuccess =  useSuccess();
  const updateError = useError();

  const { supervisor } = user; 

  const initialValues = {
    name: user?.name,
    email: user?.email,
    bacb_account_number: supervisor?.bacb_account_number,
    bacb_certification_number: supervisor?.bacb_certification_number,
    supervisor_qualification: supervisor?.supervisor_qualification,
    date_qualified: supervisor?.date_qualified,
    date_contract: supervisor?.date_contract
  };

  const onSubmit = (values, onSubmitProps) => {
    const profileDataSubmit = {
      name: values.name,
      email: values.email,
      supervisor: {
        bacb_account_number: values.bacb_account_number,
        bacb_certification_number: values.bacb_certification_number,
        supervisor_qualification: values.supervisor_qualification,
        date_qualified: values.date_qualified,
        date_contract: values.date_contract    
      }
    };
    console.log({ profileDataSubmit });
    dispatch(updateProfile({
      id: user?.id,
      profile: profileDataSubmit
    }))
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: validateSupervisorProfile,
  });

  useEffect(() => {
    if(updateSuccess) {
      toast.success('Successfully Updated');
      dispatch(setSuccess(false))
      onSave();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if(updateError)
      toast.error(updateError);
  }, [updateError]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="label mt60">Name</p>
      <input
        className="input has-input-background text-input"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}    
      />
      <p className="label mt30">Email</p>
      <input
        className="input has-input-background text-input"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}    
      />
      <p className="label mt30">Supervisor Qualification</p>
      <input
        className="input has-input-background text-input"
        name="supervisor_qualification"
        value={formik.values.supervisor_qualification}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}    
      />
      <p className="label mt30">BACB Account ID Number</p>
      <input
        className="input has-input-background text-input"
        name="bacb_account_number"
        value={formik.values.bacb_account_number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}    
      />
      <p className="label mt30">BACB Certification ID Number</p>
      <input
        className="input has-input-background text-input"
        name="bacb_certification_number"
        value={formik.values.bacb_certification_number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}    
      />
      <p className="label mt30">Date Qualified to Supervise</p>
      <input
        className="input has-input-background text-input"
        type='date'
        name="date_qualified"
        value={formik.values.date_qualified}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}    
      />
      <p className="label mt30">Date of Supervision Contract</p>
      <input
        className="input has-input-background text-input"
        type='date'
        name="date_contract"
        value={formik.values.date_contract}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}    
      />
      <button 
        className="primary-button" 
        type='submit'
      >
        Save
      </button>
    </form>
  )
 }
export default ProfileScreen;
