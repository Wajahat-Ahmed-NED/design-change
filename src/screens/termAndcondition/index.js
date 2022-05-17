import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import ApiService from '../../services/ApiService';
import { setShowSidebar, useShowSidebar } from '../../redux/reducers/SidebarReducer';
import { useDispatch } from 'react-redux';
import './termsAndCondition.css';

const TermsAndCondition = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const showSidebar = useShowSidebar(); 

  const [terms, setTerms] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTerms = async () => { 
    setLoading(true);
    try {
      const res = await ApiService.getTermsConditions();
      const results = res.data?.results;
      console.log(res.data);
      if(results && results[0]?.body) 
        setTerms(results[0]?.body);  
      else 
        setTerms('No Terms and Conditions found')
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
   }

  useEffect(() => {
    fetchTerms()
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
              Terms and Conditions
            </p>

            {
              loading ? 
              <LoadingSpinner style={{ height: '230px', width: '50%'}}/> 
              :
              <p className="mt80 termAndCondText">
                { terms }
              </p>
            }
          </div>
        </div>
      </div>
  );
};

export default TermsAndCondition;
