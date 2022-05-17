import moment from 'moment';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useFlagged, useIsLoading, usePastFlagged } from '../../../redux/reducers/ExpLogReducer';
import { fetchFlagged, fetchPastFlagged } from '../../../redux/sagas/experienceLog/fetchFlaggedSaga';
import { useDispatchEffect } from '../../../utils/hooks';
import './Flagged.css';
import { LABELS } from '../../../utils/CONSTANTS';



const Flagged = () => {
  const navigate = useNavigate();

  const flaggedLogs = useFlagged();
  const pastLogs = usePastFlagged();
  const isLoading = useIsLoading();

  useDispatchEffect(fetchFlagged, null, true);
  useDispatchEffect(fetchPastFlagged, null, true);
  
  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch()

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
            <p className="headingMain">Flagged Logs</p>

            <p className="heading2nd mt120">Past Flagged Logs</p>
            <div className="column is-two-fifths mt30" style={{ padding: 0 }}>
              <table className="Flagtable">
                <tr>
                  <th>Date</th>
                  <th>Flagged Items</th>
                </tr>
                {
                  !isLoading && pastLogs.map(item => (
                    <tr key={item.id}>
                      <td>{moment(item.date_of_experience).format('MM/DD/YYYY')}</td>
                      <td className="tableFlex">
                        <span>Method of Supervision</span>
                        <span className="statusSpanTable">{ item.status }</span>
                      </td>
                    </tr>
                  ))
                }
              </table>
              {
                isLoading && <LoadingSpinner style={{ height: '100px', width: '100%'}}/> 
              }
              {
                !isLoading && pastLogs.length === 0 && (
                  <div className='empty-list'>
                    No flagged items found
                  </div>
                )
              }

            </div>

            <p className="heading2nd mt80">New Flagged Logs</p>
            <div className="column is-two-fifths mt30" style={{ padding: 0 }}>
              <table className="Flagtable">
                <tr>
                  <th>Date</th>
                  <th>Flagged Items</th>
                </tr>
                {
                  !isLoading && flaggedLogs.map(log => (
                    <tr key={log.id}>
                      <td>{ moment(log.date_of_experience).format('MM/DD/YYYY') }</td>
                      <td className="tableFlex">
                        <span>{ getFlaggedItems(log?.data) }</span>
                        <span className="editSpanTable">
                          <button
                            className=" editText"
                            onClick={_ => navigate(`/student/edit-resend`)}
                          >
                            Edit and resend
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </table>
              {
                isLoading && <LoadingSpinner style={{ height: '100px', width: '100%'}}/> 
              }
              {
                !isLoading && flaggedLogs.length === 0 && (
                  <div className='empty-list'>
                    No flagged items found
                  </div>
                )
              }

            </div>
          </div>
        </div>
      </div>
  );
};

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

export default Flagged;
