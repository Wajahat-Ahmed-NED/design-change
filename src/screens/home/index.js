import './home.css';
import logo from '../../assets/home.png';
import bottomLogo from '../../assets/bottomLogo.png';
import { useNavigate, Navigate } from 'react-router-dom';
import { setUserIsSupervisor, useAuhToken, useIsSupervisor } from '../../redux/reducers/AuthReducer';
import { useDispatch } from 'react-redux';
import { useSupervisor, useToken } from '../../utils/hooks';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSupervisor = useSupervisor(); 
  const Token = useToken();

  if(Token && isSupervisor!==null) {
    if(isSupervisor === true)
      return <Navigate to="/supervisor/signlogs" replace />;
    else if(isSupervisor === false)
      return <Navigate to="/student/logHour" replace />;
  }
    
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered is-horizontal-center">
          <div className="column is-centered columns is-multiline">
            <div className='columns is-flex-direction-column is-align-items-center'>
            <img
              src={logo}
              alt="Melton Hill Lake"
              className="column is-centered is-half log"
            />
            <img
              src={bottomLogo}
              alt="Melton Hill Lake"
              className="column is-centered is-half log bottom-logo"
            />
            </div>
           
            <div className="is-centered column is-full columns">
              <p
                style={{ textAlign: 'center' }}
                className="mt20 column is-centered is-narrow"
              >
                I am a:
              </p>
            </div>
            <div className="button-container">
              <button
                className="button is-rounded role-button role-button-trainee"
                onClick={_ => {
                  // dispatch(setUserIsSupervisor(true));
                  navigate('/login/supervisor');
                }}
              >
                Supervisor
              </button>
              <button
                className="button is-rounded role-button role-button-student"
                onClick={_ => {
                  // dispatch(setUserIsSupervisor(false));
                  navigate('/login/student');
                }}
              >
                Trainee
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
