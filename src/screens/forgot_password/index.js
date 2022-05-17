import './forget-password.css';
import { useFormik } from 'formik';
import logo from '../../assets/home.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchToken, headers, server } from '../../helpers/constants';
import { useDispatch } from 'react-redux';
import { forgetPassAction } from '../../redux/sagas/auth/forgetPassSaga';
import { setSuccess, useSuccess } from '../../redux/reducers/AuthReducer';
import { useEffect, useState } from 'react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const success = useSuccess(); 

  const [email, setEmail] = useState(null);
  
  useEffect(() => {
    if(success && email) {
      dispatch(setSuccess(false));
      navigate('/reset-password?email='+email)
    }
  }, [success, email]);

  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = '⋆Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email format';
    }
    return errors;
  };

  const initialValues = {
    email: '',
  };

  const onSubmit = async (values, onSubmitProps) => {
    const params = {
      email: values.email,
    };
    setEmail(values.email);
    dispatch(forgetPassAction(params))  
  };

  useEffect(() => {
    if(success && email) {
      dispatch(setSuccess(false));
      navigate('/reset-password?email='+email)
    }
  }, [success, email]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <section className="section has-background">
      <div className="columns">
        <div className="column is-one-quarter">
          <figure className="Logo">
            <img src={logo} alt="Melton Hill Lake" />
          </figure>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <p className="welcome-text">Forgot Password</p>
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          <p className="forgot-password-text-sub">
            Enter your email address and we will send you a <br /> token to
            reset your password.
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="columns form-layout mt30">
          <div className="column is-one-quarter">
            <label className="label">Email</label>
            <input
              className="input is-rounded has-input-background"
              type="text"
              placeholder="Enter email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="Register__error">
              {(formik.touched.email && formik.errors.email) || ''}
            </span>
          </div>
        </div>

        <div className="columns form-layout mt60">
          <div className="column is-one-quarter">
            <button
              className="button is-large is-rounded signin-button"
              type="submit"
            >
                Reset Password
            </button>
          </div>
        </div>
      </form>

      <div className="columns">
        <div className="column">
          <a className="cancel-text forgotCancel" onClick={_ => navigate('/')}>
            Cancel
          </a>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
