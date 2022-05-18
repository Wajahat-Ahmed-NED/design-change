import { useEffect, useState } from 'react';

import './payment.css';

import { useParams, useNavigate } from 'react-router-dom';
import CardPaymentForm from '../../components/CardPaymentForm';
import { useQuery } from '../../utils/hooks';
import { useDispatch } from 'react-redux';
import { useIsSupervisor } from '../../redux/reducers/AuthReducer';
import { addSubscription } from '../../redux/sagas/subscription/paymentSaga';
import { useSuccess } from '../../redux/reducers/SubscriptionReducer';

const Payment = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isSupervisor = useIsSupervisor()
  const role = isSupervisor ? 'supervisor' : 'student';

  const query = useQuery();
  const subscription = query.get('subscription');

  const isSubscribed = useSuccess();

  useEffect(() => {
    if(isSubscribed)
      navigate('/logHour');
  }, [isSubscribed]);

  const onTokenGenerated = (token) => { 
    const params = {
      sub_id: subscription,
      token
    }; 
    dispatch(addSubscription(params))
  }

  return (
    <section className="section has-left-background">
      <div className="columns is-centered">
        <div className="column"></div>
        <div className="column">
          <div className="columns is-mobile is-centered">
            <div className="column">
              <p className="addPaymentText">Add Payment Method</p>
            </div>
          </div>

          <div className="columns register-form-layout mt80">
            <div className="column is-half">
              <label className="label ml0">Card Details:</label>
            </div>
          </div>

          <div className="columns">
            <div className="column is-half">
              <CardPaymentForm onSuccess={onTokenGenerated} />
            </div>
          </div>
          <div className="columns">
            <div className="column ">
              <button
                className="signup-text"
                onClick={_ => navigate(`/login/`+role)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
