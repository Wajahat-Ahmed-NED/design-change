import moment from 'moment';
import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import Rec1 from '../../../assets/Rectangle 22.png';
import Rec2 from '../../../assets/Rectangle 23.png';
import Rec3 from '../../../assets/Rectangle 24.png';
import { useError, useIsLoading, useUserSubscription } from '../../../redux/reducers/SubscriptionReducer';
import { fetchUserSubscription } from '../../../redux/sagas/subscription/fetchSaga';
import { useDispatchEffect } from '../../../utils/hooks';
import './dashboardSubscription.css';

const DashboardSubscription = () => {
  const navigate = useNavigate();
  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch()

  const userSubscription = useUserSubscription();
  const isLoading = useIsLoading();
  const error = useError();

  useEffect(() => {
    if(error) {
      toast.error(error);
      if(error === 'Not subscribed yet.')
        navigate(`/subscription-screen-dashbard`)
    }
  }, [error]);

  useDispatchEffect(fetchUserSubscription, null, true);

  let remaining, subscription, toBePaid=0.00;

  if(userSubscription) {
    subscription = userSubscription.subscription; 
    remaining = moment(userSubscription.expiry.replace('Z','')).diff(moment(), 'hours')/24;
    remaining = Math.round(remaining)
  }
  
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
            <p className="headingMain">Subscription</p>
            <p className="pera mt80">
              Number of days remaining to the end of monthly subscription:
            </p>
            <p className="heading2nd mt30">{remaining ? `${remaining} days` : '--'}</p>
            <p className="pera mt60">Subscription Details:</p>
            <p className="heading2nd mt30 mb30">${subscription?.price?.toFixed(2)} / {subscription?.period}</p>
            <span className="mt60">
              <a
                className=" changelink "
                onClick={_ => navigate(`/subscription-screen-dashbard`)}
              >
                Change subscripton plan
              </a>
            </span>
            <div>
              <img src={Rec1} alt="Melton Hill Lake" />
              <img
                style={{ marginLeft: 20 }}
                src={Rec2}
                alt="Melton Hill Lake"
              />
              <img
                style={{ marginLeft: 20 }}
                src={Rec3}
                alt="Melton Hill Lake"
              />
            </div>
            <p className="pera mt40">Amount to be paid:</p>
            <p className="heading2nd mt30">${toBePaid.toFixed(2)}</p>
            <div className="column is-one-third mt60">
              <a
                className="button is-large is-rounded dashBtn"
                onClick={_ => navigate(`/payment-screen-dashbard`)}
              >
                Pay
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DashboardSubscription;
