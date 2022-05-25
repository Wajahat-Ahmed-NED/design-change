import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';
import './editAndResend.css';
import { useDispatch } from 'react-redux';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';


const EditAndResend = () => {
  const navigate = useNavigate();
  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch()

  return (
      <div className="section has-light-background">
        <div className="columns">
          <div className="column"></div>
        </div>
        <div className="columns">
          <div className="column">
          <button className='Toggle_btn' 
            onClick={() => dispatch(setShowSidebar(!showSidebar))}

          >
              {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>
            <p className="headingMain">
              <a className=" backlink" onClick={_ => navigate(-1)}>
                <IoIosArrowBack />
              </a>
              Edit and Resend
            </p>
            <div className="column dashForm is-one-third logForm mt20">
              <label className="label">Supervision Start Time</label>
              <input class="input is-small" type="date" placeholder=" " />
              <label className="label">Supervision End Time</label>
              <input class="input is-small" type="time" placeholder=" " />

              <label className="label">Supervised Hours </label>
              <input
                class="input is-small"
                type="number"
                placeholder="Type here ..."
              />
              <label className="label">Independent Hours </label>
              <input
                class="input is-small"
                type="number"
                placeholder="Type here ..."
              />

              <label className="label">Client Observation?</label>

              <select className="select dropdownCustom mt is-normal">
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
              <label className="label">Supervision contacts</label>

              <select className="select dropdownCustom mt is-normal">
                <option>Select dropdown</option>
                <option>With options</option>
              </select>

              <label className="label">Task list items documented</label>

              <select className="select dropdownCustom mt is-normal">
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
              <label className="label">Experience Notes </label>
              <textarea class="textarea" placeholder="Type here..."></textarea>

              <a
                className="button is-large is-rounded saveBtn mt30"
                onClick={_ => navigate(`/payment-screen-dashbard`)}
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditAndResend;
