import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { GiHamburgerMenu } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setSuccess, useIsLoading, useSuccess } from '../../../redux/reducers/ExpLogReducer';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { submitFlagLog } from '../../../redux/sagas/experienceLog/submitFlagSaga';
import LocalStorage from '../../../services/LocalStorage';
import { LABELS, LOG_DATA } from '../../../utils/CONSTANTS';
import { useQuery } from '../../../utils/hooks';

const LogDetails = () => {
  const { id: logId } = useParams(); 
  const query = useQuery();
  const action = query.get('action');

  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const showSidebar = useShowSidebar(); 
  const isLoading = useIsLoading(); 
  const success = useSuccess(); 

  useEffect(() => {
    if(success) {
      dispatch(setSuccess(false));
      navigate(-1);
    }
  }, [success]);

  const log = LocalStorage.getData(LOG_DATA);

  // console.log('logId: ', logId);
  // console.log('log: ', log);

  const [flagMode, setFlagMode] = useState(action === 'flag' ? true : false);
  const [flagItems, setFlagItems] = useState(new Map());
  const [showMsg, setShowMsg] = useState(false);

  const onSelectItem = (key, value) => {
    const newSelected = new Map(flagItems);
    newSelected.set(key, value);
    setFlagItems(newSelected);
    showMsg && setShowMsg(false);
  }
  const approveLog = () => {
    dispatch(submitFlagLog({
      log_id: Number(logId),
      is_approved: true,
    }))
  }
  const onSubmitFlag = () => {
    let data = {};
    flagItems.forEach((val, key) => {
      if (val === true)
        data[key] = true;
    });
    if (Object.keys(data).length === 0) {
      setShowMsg(true);
      return;
    }
    dispatch(submitFlagLog({
      log_id: Number(logId),
      is_flag: true,
      data
    }));
  }
  const onCancel = () => { 
    setFlagMode(false);
    setFlagItems(new Map());
   }
  
  if(isLoading)
   return (
     <LoadingSpinner style={{ width: '100%'}} />
   )

  return (
      <div className="section has-light-background">
        <div className="columns ">
          <div className="column is-three-fifths">
            <button
              className="Toggle_btn"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            >
              {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>
            
            <p className="headingMain">
              <a
                className="backlink"
                onClick={_ => navigate(-1)}
              >
                <IoIosArrowBack size={24}  />
              </a>

              { log?.user?.name }
            </p>
            
            <div className="column mt30 is-two-fifths logForm">
              {
                Object.keys(LABELS).map(key => (
                  <LogItem itemKey={key} value={log[key]} selected={!!flagItems.get(key)} onSelect={onSelectItem} key={key} />
                ))
              }
              {
                !flagMode ?
                <div className='buttons'>
                  <button className="primary-button" type='button' onClick={approveLog}>Approve</button>
                  {
                  log?.status === 'pending' &&  
                  <button className='secondary-button' type='button' onClick={() => setFlagMode(true)}>Flag</button>
                  }
                </div>
                :
                <div className='buttons' style={{ flexDirection: "column", marginTop: '24px' }}>
                  <button className="secondary-button full-width" type='button' onClick={onSubmitFlag}>Flag</button>
                  { showMsg && <p>Please select the Items that you want to flag!</p> }
                  <br/>
                  <button className='text-button' type='button' onClick={onCancel}>Cancel</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
  );

};


const LogItem = ({ itemKey, value, selected, onSelect }) => { 

  const handleClick = () => { 
    onSelect(itemKey, !selected);
   }
  let itemValue = '';
  if(typeof value === 'object' ) 
    itemValue = value?.contact || value?.name; 
  else if(typeof value === 'string')
    itemValue = value;
  
  return (
    <>
    <label className="label" style={{ color: selected ? 'rgb(177, 0, 0)' : '#141414'}}>{ LABELS[itemKey] }</label>
    <div className={ selected ? 'log-item-selected': 'log-item' } onClick={handleClick}>
      { itemValue }
    </div>
    </>

  )
 }
export default LogDetails;
