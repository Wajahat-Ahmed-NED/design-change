import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import MonthlyCalendar from '../../../components/MonthlyCalendar';
import { setSelectedDate, useFlagged, useIsLoading, useLogs, useSelectedDate } from '../../../redux/reducers/ExpLogReducer';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import { fetchDatedFlaggedLogs } from '../../../redux/sagas/experienceLog/fetchFlaggedByDateSaga';
import { fetchDatedPendingLogs } from '../../../redux/sagas/experienceLog/fetchPendingByDateSaga';
import { submitFlagLog } from '../../../redux/sagas/experienceLog/submitFlagSaga';
import LocalStorage from '../../../services/LocalStorage';
import { LABELS, LOG_DATA } from '../../../utils/CONSTANTS';
import { useDispatchEffect } from '../../../utils/hooks';
import './styles.css';
// import { Popover } from 'react-tiny-popover';

const SupervisorFlaggedLogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flaggedLogs = useFlagged(); 
  const isLoading = useIsLoading();
  const showSidebar = useShowSidebar(); 
  const selectedDate = useSelectedDate();  

  const onDateChange = (date) => { 
    dispatch(setSelectedDate(date));
   }

  const tdRefs = new Array(); 
  flaggedLogs.length && flaggedLogs.forEach(log => {
    tdRefs.push(React.createRef());
  });

  useDispatchEffect(fetchDatedFlaggedLogs, moment(selectedDate).format('YYYY-MM-DD'), selectedDate);

  const logDetails = (log) => { 
    LocalStorage.storeData(LOG_DATA, log);
    navigate(`/supervisor/log-details/${log.id}`);
  }

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
            
            <p className="headingMain">Flagged logs</p>
            
            <div className="column mt60 is-half">
              <MonthlyCalendar 
                onChange={onDateChange}
              />
            </div>

            <div className="column flagged-logs mt30">
              <p>{moment(selectedDate).format('MMMM DD, YYYY')} flagged logs</p>
              <table className="Flagtable">
                <thead>
                <tr>
                  <th>Student</th>
                  <th>Flagged items</th>
                  <th align='center'>Total flags</th>
                </tr>
                </thead>
                <tbody>
                {
                  flaggedLogs.map((log, i) => (
                    <tr key={log.id}>
                      <td>
                        <div className="tableFlex">
                          <span className='name'>{ log.supervisor?.name }</span>
                          <DeleteItem item={{ id: log.id, name: log.supervisor?.name }} />
                        </div>
                      </td>
                      <td>
                        <div className="tableFlex" >
                          { getFlaggedItems(log?.data) }
                          <button className="text-button" onClick={() => logDetails(log)}>Log Details</button>
                        </div>
                      </td>
                      <td align='center' >
                        <div className="tableFlex" style={{ justifyContent:"center" }}>{ getFlaggedItemCount(log?.data) }</div>
                      </td>
                    </tr>
                  ))
                }

                </tbody>
              </table>
              {
                isLoading && <LoadingSpinner style={{ height: '100px', width: '100%'}}/> 
              }
              {
                !isLoading && flaggedLogs.length === 0 && (
                  <div className='empty-list'>
                    No flagged logs found
                  </div>
                )
              }

            </div>

          </div>


        </div>
      </div>
  );

};


const DeleteItem = ({item, parent }) => { 
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  
  return (
    <div ref={ref} style={{ height: '20px' }}>
        <MdOutlineClose size={20} color='#C67070' onClick={handleClick}/>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={5}
      >
        <Popover id="popover-contained">
          <Popover.Body>
              <div className='delete-dialog'>
                  <p>Do you want to remove {item.name}?</p>
                  <div className='row'>
                    <button className="primary-button">Remove</button>
                    <button className='secondary-button' onClick={() => { setShow(false) }}>Cancel</button>
                  </div>
              </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  )
 }

  const getFlaggedItems = (data) => { 
    const labels = [];
    if(data) {
      Object.keys(data).forEach(key => {
        labels.push(LABELS[key]);
      });
      return labels.join(', ');
    }
    else return '';
  }
  const getFlaggedItemCount = (data) => { 
    const labels = [];
    if(data) {
      return Object.keys(data).length;
    }
    else return 0;
  }

export default SupervisorFlaggedLogs;
