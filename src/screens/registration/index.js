import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/title.png';
import './registration.css';
import { signUpAction } from '../../redux/sagas/auth/AuthSagas';
import { useUser } from '../../redux/reducers/AuthReducer';
import { useEffect } from 'react';
import { validateStudentRegistration, validateSupervisorRegistration } from '../../utils/validation';

const Register = () => {
  const { role } = useParams();
  return (
    <section className="section has-left-background">
      <div className="columns is-centered">
        <div className="column "></div> 
        <div className="column ">
        <div className={`columns ${role==='student' && 'register-form-layout'}`}>
          <div className="column is-half">
            <figure className="image register-image">
              <img src={logo} alt="Melton Hill Lake" />
            </figure>
            <div className="columns is-mobile is-centered">
              <div className="column">
                <p className="registration-text">Create Account</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      { role === 'supervisor' && <SupervisorForm />}
      { role === 'student' && <StudentForm />}
    </section>
  );
};

const StudentForm = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useUser();

  useEffect(() => {
    if(user) {
      formik?.resetForm();
      navigate(`/verify-email`);
    }  
  }, [user]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    check: false,
  };

  const onSubmit = (values, onSubmitProps) => {
    const registerDataSubmit = {
      name: values.name,
      email: values.email,
      password: values.password,
      is_supervisor: false,
    };

    console.log({ registerDataSubmit });
    dispatch(signUpAction(registerDataSubmit));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: validateStudentRegistration,
  });

  return (
      <div className="columns is-centered">
        <div className="column "></div>
        <div className="column">
          {/* {isLoading ? <Loader /> : ''} */}
          <form onSubmit={formik.handleSubmit}>
            <div className="columns register-form-layout">
              <div className="column is-half">
                <label className="label">Full Name</label>
                <input
                  className="input has-input-background"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.name && formik.errors.name) || ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout">
              <div className="column is-half">
                <label className="label">Email</label>
                <input
                  className="input has-input-background" 
                  type="email"
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
            <div className="columns register-form-layout">
              <div className="column is-half">
                <label className="label">Password</label>
                <input
                  className="input has-input-background"
                  type="password"
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
            <div className="columns register-form-layout">
              <div className="column is-half">
                <label className="label">Confirm Password</label>
                <input
                  className="input has-input-background"
                  type="password"
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
            <div className="columns register-terms-layout">
              <div className="column is-half">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="check"
                    onClick={() =>
                      formik.setFieldValue('check', !formik.values.check)
                    }
                    className='terms-checkbox'
                  />
                  <span
                    className={`${
                      formik.touched.check &&
                      formik.errors.check &&
                      'Register__error'
                    } register-checkbox-text`}
                  >
                    I agree to the Terms and Conditions and Privacy Policy
                  </span>
                </label>
              </div>
            </div>
            <div className="columns register-form-layout">
              <div className="column is-half">
                <button
                  className="button is-large signin-button"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <div className="columns is-centered">
            <div className="column">
              <a
                className="signup-text"
                onClick={_ => navigate(`/login/student`)}
              >
                Already have an account? <Strong>Sign In</Strong> 
              </a>
            </div>
          </div>
        </div>
      </div>

  )
 }
 
 const SupervisorForm = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useUser();

  useEffect(() => {
    if(user) {
      formik?.resetForm();
      navigate(`/verify-email`);
    }  
  }, [user]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    check: false,
    bacb_account_number: "",
    bacb_certification_number: "",
    supervisor_qualification: "",
    date_qualified: "",
    date_contract: ""
  };

  const onSubmit = (values, onSubmitProps) => {
    const registerDataSubmit = {
      name: values.name,
      email: values.email,
      password: values.password,
      is_supervisor: true,
      bacb_account_number: values.bacb_account_number,
      bacb_certification_number: values.bacb_certification_number,
      supervisor_qualification: values.supervisor_qualification,
      date_qualified: values.date_qualified,
      date_contract: values.date_contract  
    };

    console.log({ registerDataSubmit });
    dispatch(signUpAction(registerDataSubmit));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: validateSupervisorRegistration,
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <div className="columns is-centered">
        <div className="column"></div>
        <div className="column" style={{ paddingLeft: '10%'}}>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">Full Name</label>
                <input
                  className="input has-input-background"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.name && formik.errors.name) || ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">Email</label>
                <input
                  className="input has-input-background"
                  type="email"
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
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">Password</label>
                <input
                  className="input has-input-background"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoFocus={false}
                />
                <span className="Register__error">
                  {(formik.touched.password && formik.errors.password) || ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">Confirm Password</label>
                <input
                  className="input has-input-background"
                  type="password"
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
        </div>
        <div className="column">
          {/* {isLoading ? <Loader /> : ''} */}
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">BACB Account ID Number </label>
                <input
                  className="input has-input-background"
                  type="number"
                  name="bacb_account_number"
                  value={formik.values.bacb_account_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.bacb_account_number && formik.errors.bacb_account_number) || ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">BACB Certification ID Number</label>
                <input
                  className="input has-input-background"
                  type="number"
                  name="bacb_certification_number"
                  value={formik.values.bacb_certification_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.bacb_certification_number && formik.errors.bacb_certification_number) || ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">Supervisor Qualification</label>
                <input
                  className="input has-input-background"
                  type="text"
                  name="supervisor_qualification"
                  value={formik.values.supervisor_qualification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.supervisor_qualification && formik.errors.supervisor_qualification) || ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">Date Qualified to Supervise</label>
                <input
                  className="input has-input-background"
                  type="date"
                  name="date_qualified"
                  value={formik.values.date_qualified}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.date_qualified &&
                    formik.errors.date_qualified) ||
                    ''}
                </span>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <label className="label">Date of Supervision Contract</label>
                <input
                  className="input has-input-background"
                  type="date"
                  name="date_contract"
                  value={formik.values.date_contract}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="Register__error">
                  {(formik.touched.date_contract &&
                    formik.errors.date_contract) ||
                    ''}
                </span>
              </div>
            </div>
            <div className="columns register-terms-layout2">
              <div className="column">
                <label className="checkbox2">
                  <input
                    type="checkbox"
                    name="check"
                    onClick={() =>
                      formik.setFieldValue('check', !formik.values.check)
                    }
                  />
                  <span
                    className={`${
                      formik.touched.check &&
                      formik.errors.check &&
                      'Register__error'
                    } register-checkbox-text`}
                  >
                    I agree to the Terms and Conditions and Privacy Policy
                  </span>
                </label>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <button
                  className="button is-large signin-button"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="columns register-form-layout2">
              <div className="column is-half">
                <a
                  className="signup-text supervisor-signup-text"
                  onClick={_ => navigate(`/login/supervisor`)}
                >
                  Already have an account? <strong>Sign In</strong>
                </a>
              </div>
            </div>
        </div>
      </div>
    </form>


  )
 }
export default Register;
