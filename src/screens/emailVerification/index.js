import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/home.png';
import './emailVerification.css';
import { verifyEmailAction } from '../../redux/sagas/auth/AuthSagas';
import { useSuccess, useUser } from '../../redux/reducers/AuthReducer';
import { useEffect } from 'react';
import LocalStorage from '../../services/LocalStorage';
import { USER_DATA } from '../../utils/CONSTANTS';

const EmailVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = useUser() || LocalStorage.getData(USER_DATA);
  const success = useSuccess(); 

  console.log('user: ', user);
  
  useEffect(() => {
    if(success) {
      formik?.resetForm();
      if(user.is_supervisor)
        navigate(`/supervisor/signlogs`);
      else 
        navigate('/subscription');
    }  
  }, [success]);

  const validate = values => {
    let errors = {};
    if (!values.token) {
      errors.token = '⋆Required';
    }
    return errors;
  };

  const initialValues = {
    email: '',
    token: ''
  };

  const onSubmit = (values, onSubmitProps) => {
    const params = {
      email: user?.email,
      token: values.token,
    };
    console.log({ params });
    dispatch(verifyEmailAction(params));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <section className="section has-left-background">
      <div className="columns is-centered">
        <div className="column"></div>
        <div className="column">
          <figure className="image register-image">
            <img src={logo} alt="Melton Hill Lake" />
          </figure>
          <div className="columns is-mobile is-centered">
            <div className="column">
              <p className="registration-text">Verify Email</p>
              <p className="text-sub">
                Enter token sent to your email address.
              </p>

            </div>
          </div>

          {/* {isLoading ? <Loader /> : ''} */}
          <form onSubmit={formik.handleSubmit}>
            <div className="columns register-form-layout">
              <div className="column is-half">
                <label className="label">Verification Token</label>
                <input
                  className="input is-rounded has-input-background"
                  type="text"
                  name="token"
                  value={formik.values.token}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.token && formik.errors.token) || ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout">
              <div className="column is-half">
                <button
                  className="button is-large is-rounded signin-button"
                  type="submit"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailVerification;
