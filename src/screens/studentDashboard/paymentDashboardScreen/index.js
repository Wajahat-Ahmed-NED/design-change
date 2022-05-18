import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import Rec1 from '../../../assets/Rectangle 22.png';
import Rec2 from '../../../assets/Rectangle 23.png';
import Rec3 from '../../../assets/Rectangle 24.png';
import CardPaymentForm from '../../../components/CardPaymentForm';
import { useSuccess } from '../../../redux/reducers/AuthReducer';
import { useData, useUserSubscription } from '../../../redux/reducers/SubscriptionReducer';
import { addSubscription, updateSubscription } from '../../../redux/sagas/subscription/paymentSaga';
import { useQuery } from '../../../utils/hooks';
import './paymentdashboardSubscription.css';


const PaymentDashboardScreen = () => {
  const navigate = useNavigate();
  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch()
  const subscriptions = useData();
  const userSubscription = useUserSubscription();
  const isSubscribed = useSuccess();

  const query = useQuery();
  const subscription = query.get('subscription');
  const selected = subscriptions.find(item => item.id == Number(subscription)); 

  useEffect(() => {
    if(isSubscribed)
      navigate(`/dashboard-subscription`);
  }, [isSubscribed]);

  const onTokenGenerated = (token) => { 
    const params = {
      sub_id: Number(subscription),
      token
    }; 
    if(userSubscription) 
      dispatch(updateSubscription(params));
    else 
      dispatch(addSubscription(params));
  }

  return (
      <div className="section has-light-background">
        <div className="columns">
          <div className="column"></div>
        </div>
        <div className="columns">
          <div className="column is-two-thirds">
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
              Payment
            </p>
            <p className="pera mt60">Amount to be paid:</p>
            <p className="heading2nd mt30">${selected.price}</p>
            <div className="mt30">
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

            <div className="columns  mt30">
              <div className="column is-two-fifths">
                <label className="label ml0">Card Details:</label>
              </div>
            </div>

            <CardPaymentForm onSuccess={onTokenGenerated} />

          </div>
        </div>
      </div>
  );
};

export default PaymentDashboardScreen;
