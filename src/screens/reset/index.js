import './reset.css';
import axios from 'axios';
import logo from '../../assets/home.png';
import { useNavigate } from 'react-router-dom';
import { fetchToken, headers, server } from '../../helpers/constants';
import { useFormik } from 'formik';
import { useQuery } from '../../utils/hooks';
import { useIsSupervisor, useSuccess } from '../../redux/reducers/AuthReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetPassAction } from '../../redux/sagas/auth/forgetPassSaga';

const Reset = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const success = useSuccess(); 
  const isSupervisor = useIsSupervisor()
  
  const query = useQuery();
  const email = query.get('email');

  useEffect(() => {
    const role = isSupervisor ? 'supervisor' : 'student';
    if(success) navigate(`/login/${role}`)
  }, [success]);

  const validate = values => {
    let errors = {};
    if (!values.password) {
      errors.password = '⋆Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 characters long';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = '⋆Required';
    }
    if (!values.token) {
      errors.token = '⋆Required';
    }
    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    return errors;
  };

  const initialValues = {
    password: '',
    confirmPassword: '',
    token: ''
  };

  const onSubmit = async (values, onSubmitProps) => {
    const params = {
      email: email,
      password: values.password,
      token: values.token,
    };
    dispatch(resetPassAction(params))  

  };

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
          <p className="welcome-text">Reset Password</p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="columns form-layout mt30">
          <div className="column is-one-quarter">
            <label className="label">New Password</label>
            <input
              className="input is-rounded has-input-background"
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
        <div className="columns form-layout">
          <div className="column is-one-quarter">
            <label className="label">Confirm New Password</label>
            <input
              className="input is-rounded has-input-background"
              type="password"
              placeholder="Enter password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="Register__error">
              {(formik.touched.confirmPassword &&
                formik.errors.confirmPassword) ||
                ''}
            </span>
          </div>
        </div>

        <div className="columns form-layout">
          <div className="column is-one-quarter">
            <label className="label">Email Token</label>
            <input
              className="input is-rounded has-input-background"
              type="text"
              placeholder="Enter Email Token"
              name="token"
              value={formik.values.token}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="Register__error">
              {(formik.touched.token &&
                formik.errors.token) ||
                ''}
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
          <a className="cancel-text" onClick={_ => navigate('/login/:role')}>
            Cancel
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reset;
