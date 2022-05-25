import logo from "../../assets/title.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useFormik } from "formik";
import "./login.css";
import {
  setSuccess,
  useAuhToken,
  useIsLoading,
  useIsSupervisor,
  useUser,
} from "../../redux/reducers/AuthReducer";
import { signInAction } from "../../redux/sagas/auth/AuthSagas";
1;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useUser();
  const isSupervisor = useIsSupervisor();
  const isLoading = useIsLoading();
  const authToken = useAuhToken();
  const { role } = useParams();

  useEffect(() => {
    if (authToken && isSupervisor !== null) {
      if (isSupervisor === true)
        navigate("/supervisor/signlogs", { replace: true });
      else if (isSupervisor === false)
        navigate("/student/logHour", { replace: true });
    }
  }, [authToken, isSupervisor]);

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "⋆Required";
    }
    if (!values.password) {
      errors.password = "⋆Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters long";
    }
    return errors;
  };

  const initialValues = {
    name: authUser?.email || "",
    password: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log({ values });

    const payload = {
      username: values.name,
      password: values.password,
    };
    dispatch(signInAction(payload));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const onSignup = () => {
    dispatch(setSuccess(false));
    navigate(`/register/${role}`);
  };
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
        <div className="column is-one-quarter">
          <p className="welcome-text">Welcome back!, {role === "student" ? "Trainee" : "Supervisor"} </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="columns form-layout InputSize">
          <div className="column is-one-quarter">
            <label className="label">Email</label>
            <input
              className="input has-input-background"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="Register__error">
              {(formik.touched.name && formik.errors.name) || ""}
            </span>
          </div>
        </div>
        <div className="columns form-layout InputSize">
          <div className="column is-one-quarter">
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
              {(formik.touched.password && formik.errors.password) || ""}
            </span>
          </div>
        </div>
        <div className="columns form-layout">
          <div className="column is-one-quarter">
            <div className="row-flex">
              <label className="checkbox">
                <input type="checkbox" style={{ marginRight: "5px" }} />
                Remember me
              </label>
              <button
                className="forgot-pass"
                onClick={(_) => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
        <div className="columns form-layout mt60 ">
          <div className="column is-one-quarter">
            <button
              className="button is-large is-rounded signin-button"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>

      <div className="columns form-layout mt15">
        <div className="column is-one-quarter">
            <div className="bottom-text-div">
            <a className="log-text" onClick={onSignup}>
            Don’t have an account? Sign Up
          </a>
          </div>
          
        </div>
      </div>

      {/* <div className="columns is-centered">
        <div className="column">
          <a className="signup-text" onClick={_ => navigate(`/subscription`)}>
            next
          </a>
        </div>
      </div> */}
    </section>
  );
};

export default Login;
