import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useData, useIsLoading, useUserSubscription } from '../../../redux/reducers/SubscriptionReducer';
import { fetchSubscriptions } from '../../../redux/sagas/subscription/fetchSaga';
import { useDispatchEffect } from '../../../utils/hooks';
import './dashboardSubscription2.css';



const SubscriptionScreen2 = () => {
  const navigate = useNavigate();
  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch()

  const subscriptions = useData();
  const userSubscription = useUserSubscription();
  const isLoading = useIsLoading();

  useDispatchEffect(fetchSubscriptions, null, subscriptions?.length == 0);
  
  const [selected, setSelected] = useState(userSubscription?.subscription?.id);
  
  return (
      <div className="section has-background">
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
              Change Subscription Plan
            </p>

            <div class="row subsCard mt120">
              {
                isLoading ? 
                <LoadingSpinner style={{ height: '230px', width: '50%'}}/> 
                :
                subscriptions.map(item => (
                  <div class="col-md-4 col-lg-4 col-sm-4" key={item.id}>
                    <label>
                      <input
                        type="radio"
                        name="subscription"
                        class="card-input-element"
                        defaultChecked={item.id === userSubscription?.subscription?.id}
                        onClick={_ => { setSelected(item.id) }}
                      />
    
                      <div class="panel panel-default card-input">
                        <div class="panel-head">
                          <p class="subtitle">{ item.name }</p>
                          <h1
                            class="title"
                            style={{ marginTop: 40, marginBottom: 25 }}
                          >
                            <sub style={{ fontSize: 25 }}>$</sub> {item.price}
                          </h1>
                          <p class="subtitle2">{item.period === 'Month' ? `$${(item.price*12).toFixed(2)}/Year` : `$${(item.price/12).toFixed(2)}/Month`}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))
              }
            </div>
            <div className="column is-one-third mt120">
              <a
                className="button is-large is-rounded dashBtn"
                onClick={_ => navigate(`/payment-screen-dashbard?subscription=${selected}`)}
              >
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SubscriptionScreen2;
