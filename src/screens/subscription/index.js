import './subcription.css';
import { useDispatchEffect } from '../../utils/hooks';
import { fetchSubscriptions } from '../../redux/sagas/subscription/fetchSaga';
import { useData, useIsLoading } from '../../redux/reducers/SubscriptionReducer';
import LoadingSpinner from '../../components/LoadingSpinner';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Subcription = () => {
  const navigate = useNavigate();

  const subscriptions = useData();
  const isLoading = useIsLoading();

  useDispatchEffect(fetchSubscriptions, null, subscriptions?.length == 0);

  const [selected, setSelected] = useState(null);

  return (
    <section className="section has-left-background">
      <div className="columns is-centered">
        <div className="column"></div>
        <div className="column">
          <div className="columns is-mobile is-centered">
            <div className="column">
              <p className="Subscription-text">Choose Subscription</p>
            </div>
          </div>

          <div className="row subsCard mt60">
            {
              isLoading ?
                <LoadingSpinner style={{ height: '230px', width: '50%' }} />
                :
                subscriptions.map(item => (
                  <div className="col-md-4 col-lg-4 col-sm-4" key={item.id}>
                    <label>
                      <input
                        type="radio"
                        name="subscription"
                        className="card-input-element"
                        onClick={_ => { setSelected(item.id) }}
                      />

                      <div className="panel panel-default card-input">
                        <div className="panel-head">
                          <p className="subtitle">{item.name}</p>
                          <h1
                            className="title"
                            style={{ marginTop: 40, marginBottom: 25 }}
                          >
                            <sub style={{ fontSize: 25 }}>$</sub> {item.price}
                          </h1>
                          <p className="subtitle2">{item.period === 'Month' ? `$${(item.price * 12).toFixed(2)}/Year` : `$${(item.price / 12).toFixed(2)}/Month`}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))
            }
          </div>

          <div className="columns register-form-layout1 mt120">
            <div className="column ">
              <a
                className="button is-large continue-button is-rounded signin-button size_btn"
                onClick={_ => navigate('/payment?subscription=' + selected)}
              >
                Continue
              </a>
            </div>
          </div>

          <div className="columns is-centered ">
            <div className="column">
              <button
                style={{ textAlign: 'center' }}
                className="cancel-text SubCancelText"
                onClick={_ => navigate('/')}
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

export default Subcription;
