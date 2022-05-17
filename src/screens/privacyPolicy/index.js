import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { setShowSidebar, useShowSidebar } from '../../redux/reducers/SidebarReducer';
import ApiService from '../../services/ApiService';
import './Privacy.css';



const Privacy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const showSidebar = useShowSidebar(); 

  const [policy, setPolicy] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPrivacyPolicy = async () => { 
    setLoading(true);
    try {
      const res = await ApiService.getPrivacyPolicy();
      const results = res.data?.results;
      console.log(res.data.results[0]);
      if(results) 
        setPolicy(results[0]?.body);  
      else 
        setPolicy('No policy found')
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
   }

  useEffect(() => {
    fetchPrivacyPolicy()
  }, []);

  return (
      <div className="section ">
        <div className="columns">
          <div className="column"></div>
        </div>
        <div className="columns">
          <div className="column is-four-fifths">
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
              Privacy Policy
            </p>
            {
              loading ? 
              <LoadingSpinner style={{ height: '230px', width: '50%'}}/> 
              :
              <p className="mt80 termAndCondText">
                { policy }
              </p>
            }
          </div>
        </div>
      </div>
  );
};

export default Privacy;
