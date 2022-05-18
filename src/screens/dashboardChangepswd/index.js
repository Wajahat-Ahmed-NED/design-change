import { useFormik } from 'formik';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar, useShowSidebar } from '../../redux/reducers/SidebarReducer';
import { changePassAction } from '../../redux/sagas/auth/changePassSaga';
import './PasswordChangeProfile.css';

const PasswordChangeProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSidebar = useShowSidebar(); 

  const validate = values => {
    let errors = {};
    if (!values.password) {
      errors.password = '⋆Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 characters long';
    }
    if (!values.oldPassword) {
      errors.oldPassword = '⋆Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = '⋆Required';
    }
    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    return errors;
  };

  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values, onSubmitProps) => {
    const params = {
      new_password1: values.password,
      new_password2: values.password,
    };
    dispatch(changePassAction(params))  
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

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
            <p className="headingMain">
              <a
                className=" backlink"
                onClick={_ => navigate(-1)}
              >
                <IoIosArrowBack />
              </a>
              Change Password
            </p>
            
            <form onSubmit={formik.handleSubmit}>
            <div className="columns ">
              <div className="column is-one-quarter">
                <label className="label mt60">Current Password</label>
                <input
                  className="input has-input-background"
                  type="password"
                  placeholder="Enter password"
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}    
                />
                <span className="Register__error">
                  {(formik.touched.oldPassword && formik.errors.oldPassword) || ''}
                </span>

              </div>
            </div>
            <div className="columns ">
              <div className="column is-one-quarter">
                <label className="label">New Password</label>
                <input
                  className="input has-input-background"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}    
                />
                <span className="Register__error">
                  {(formik.touched.password && formik.errors.password) || ''}
                </span>

              </div>
            </div>
            <div className="columns ">
              <div className="column is-one-quarter">
                <label className="label">Confirm New Password</label>
                <input
                  className="input has-input-background"
                  type="password"
                  placeholder="Enter password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}    
                />
                <span className="Register__error">
                  {(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
                </span>

              </div>
            </div>

            <div className="column is-one-quarter ">
              <button
                className="button is-large is-rounded dashBtn"
                type="submit"
              >
                Save
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default PasswordChangeProfile;
