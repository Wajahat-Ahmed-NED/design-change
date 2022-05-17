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
import { setSelectedDate, useIsLoading, useLogs, useSelectedDate } from '../../../redux/reducers/ExpLogReducer';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import { fetchDatedPendingLogs } from '../../../redux/sagas/experienceLog/fetchPendingByDateSaga';
import { submitFlagLog } from '../../../redux/sagas/experienceLog/submitFlagSaga';
import LocalStorage from '../../../services/LocalStorage';
import { LOG_DATA } from '../../../utils/CONSTANTS';
import { useDispatchEffect } from '../../../utils/hooks';
import './styles.css';
// import { Popover } from 'react-tiny-popover';

const PendingLogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logs = useLogs(); 
  const isLoading = useIsLoading();
  const showSidebar = useShowSidebar(); 
  const selectedDate = useSelectedDate();  

  const onDateChange = (date) => { 
    dispatch(setSelectedDate(date));
   }

  const tdRefs = new Array(); 
  logs.length && logs.forEach(log => {
    tdRefs.push(React.createRef());
  });

  useDispatchEffect(fetchDatedPendingLogs, moment(selectedDate).format('YYYY-MM-DD'), selectedDate);

  const approveLog = (id) => { 
    dispatch(submitFlagLog({
      log_id: id,
      is_approved: true,
    }));
   }
  const logDetails = (log) => { 
    LocalStorage.storeData(LOG_DATA, log);
    navigate(`/supervisor/log-details/${log.id}`);
  }
  const flagLog = (log) => { 
    LocalStorage.storeData(LOG_DATA, log);
    navigate(`/supervisor/log-details/${log.id}?action=flag`);
  }

  return (
      <div className="section has-background">
        <div className="columns ">
          <div className="column is-three-fifths">
            <button
              className="Toggle_btn"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            >
              {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>
            
            <p className="headingMain">Pending logs</p>
            
            <div className="column mt60 is-half">
              <MonthlyCalendar 
                onChange={onDateChange}
              />
            </div>

            <div className="column pending-logs mt30">
              <p>{moment(selectedDate).format('MMMM DD, YYYY')} pending logs</p>
              <table className="Flagtable">
                <tr>
                  <th>Student</th>
                  <th>Task list items documented</th>
                  <th>  </th>
                </tr>
                {
                  logs.map((log, i) => (
                    <tr key={log.id}>
                      <td className="tableFlex" ref={tdRefs[i]}>
                        <span className='name'>{ log.supervisor?.name }</span>
                        <DeleteItem item={{ id: log.id, name: log.supervisor?.name }} parent={tdRefs[i]} />
                      </td>
                      <td>{ log.task?.name?.split(' ')[0] }</td>
                      <td style={{ paddingTop: 0}}>
                        <div className='buttons'>
                          <button className="text-button" onClick={() => logDetails(log)}>Log Details</button>
                          <button className="primary-button" onClick={() => approveLog(log.id)}>Approve</button>
                          <button className='secondary-button' onClick={() => flagLog(log)}>Flag</button>
                        </div>

                      </td>
                    </tr>
                  ))
                }
              </table>
              {
                isLoading && <LoadingSpinner style={{ height: '100px', width: '100%'}}/> 
              }
              {
                !isLoading && logs.length === 0 && (
                  <div className='empty-list'>
                    No pending logs found
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

    // <Popover
    //   isOpen={isOpen}
    //   positions={['top', 'bottom', 'left', 'right']}  // if you'd like, you can limit the positions
    //   align='start'
    //   padding={2} // adjust padding here!
    //   reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
    //   onClickOutside={() => setIsOpen(false)} // handle click events outside of the popover/target here!
    //   parentElement
    //   content={({ position, nudgedLeft, nudgedTop }) => (
    //   )}
    //   >
    //   </Popover>

  )
 }

export default PendingLogs;
