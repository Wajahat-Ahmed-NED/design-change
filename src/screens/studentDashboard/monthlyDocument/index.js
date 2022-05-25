import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useIsLoading, useLogs } from '../../../redux/reducers/ExpLogReducer';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import { fetchAll } from '../../../redux/sagas/experienceLog/fetchAllSaga';
import { useDispatchEffect } from '../../../utils/hooks';
import './monthlyDocument.css';


const TASKS_TABLE = [
  ['A-1','B-1','B-8','C-1','D-1','E-1','F-1','G-1','G-12','H-1','I-1'],
  ['A-2','B-2','B-9','C-2','D-2','E-2','F-2','G-2','G-13','H-2','I-2'],
  ['A-3','B-3','B-10','C-3','D-3','E-3','F-3','G-3','G-14','H-3','I-3'],
  ['A-4','B-4','B-11','C-4','D-4','E-4','F-4','G-4','G-15','H-4','I-4'],
  ['A-5','B-5','B-12','C-5','D-5','E-5','F-5','G-5','G-16','H-5','I-5'],
  [ null,'B-6','B-13','C-6','D-6','E-6','F-6','G-6','G-17','H-6','I-6'],
  [ null,'B-7','B-14','C-7', null,'E-7','F-7','G-7','G-18','H-7','I-7'],
  [ null, null,'B-15','C-8', null, null,'F-8','G-8','G-19','H-8','I-8'],
  [ null, null,  null,'C-9', null, null,'F-9','G-9','G-20','H-9', null],
  [ null, null,  null,'C-10', null, null, null,'G-10','G-21', null, null],
  [ null, null,  null,'C-11', null, null, null,'G-11','G-22', null, null],
]; 
const MonthlyDocument = () => {
  const navigate = useNavigate();

  const rows  = new Array(5).fill('0'); 

  const logs = useLogs();
  const isLoading = useIsLoading();

  useDispatchEffect(fetchAll, null, true);

  const tasks = {};
  let total_restricted_hrs = 0; 
  let total_unrestricted_hrs = 0; 
  let total_supervisor_hrs = 0; 
   
  for (const log of logs) {
    const [taskCode, ...text] = log?.task.name.split(' ');
    if(taskCode) {
      if(tasks[taskCode] && Array.isArray(tasks[taskCode])) 
        tasks[taskCode].push(log?.date_of_experience);
      else 
      tasks[taskCode] = [ log?.date_of_experience]; 
    }
    total_restricted_hrs += Number(log?.restricted_hours)
    total_unrestricted_hrs += Number(log?.unrestricted_hours)
  }
  total_supervisor_hrs = total_restricted_hrs + total_unrestricted_hrs;

  console.log('tasks: ', tasks)
  const renderTaskDates = (task) => { 
    const taskDates = tasks[task];
    return [1,2,3,4,5,6,7,8,9].map(i => {
      const date = taskDates && taskDates[i-1] ? taskDates[i-1].split('-').reverse().join('/') : 'dd/mm/yyyy'
      const disabled = date==='dd/mm/yyyy';
      return <option disabled={disabled} key={task+i}>{i}. {date}</option>
    });
  }
  const renderTaskColor = (task) => { 
    const taskDates = tasks[task];
    if(taskDates?.length > 0 && taskDates?.length <= 3)
      return '#81DFED';
    else if(taskDates?.length > 3 && taskDates?.length <= 6)
      return '#62B4BF';
    else if(taskDates?.length > 6 && taskDates?.length <= 10)
      return '#D37498';
    else 
      return '#FFFFFF';
  }

  const showSidebar = useShowSidebar(); 
  const dispatch = useDispatch()

  // if(isLoading)
  // return (
  //   <LoadingSpinner />
  // )

  return (
      <div className="section " style={{ overflowX: "auto"}}>
        <div className="columns">
          <div className="column">
            <button
              className="Toggle_btn"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            >
              {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>
            <p className="headingMain">Monthly Document</p>
            <p className=" mt30 heading2nd" style={{ marginBottom: '10px'}}>Task List</p>
            <div>
              <div className="columns">
                <div className="column is-four-fifths">
                  <table className="monthlyTable">
                      {TASKS_TABLE.map((row,i) => (
                        <tr key={'row-'+i}>
                          {
                            row.map((cell,j) => (
                              <td key={`cell-${i}${j}`}>
                                {
                                  cell && 
                                  <select
                                    style={{ background: renderTaskColor(cell) }}
                                    className="select selectBtn dropdownCustom mt is-normal"
                                  >
                                    <option>{cell.replace('-','')}</option>
                                    {renderTaskDates(cell)}
                                  </select>
                                }
                              </td>
                            ))
                          }
                        </tr>
                      ))}
                  </table>
                </div>
              </div>
            </div>
            <div className="HRline" />
            <div className="columns mt10">
              <div className=" column secondSectionMonthlyDocumnet">
                <div>
                  <p>
                    Total Restricted
                    Hours:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {total_restricted_hrs}
                  </p>
                  <p>
                    Total Unrestricted
                    Hours:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {total_unrestricted_hrs}
                  </p>
                  <p>
                    Total Supervisor
                    Hours:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {total_supervisor_hrs}
                  </p>
                </div>
                <div className="colordtext">
                  <div className="ml160">
                    <button className="clr1"></button>
                    <span>1-3 opportunities with the task list item</span>
                  </div>
                  <div className="ml160">
                    <button className="clr2"></button>
                    <span>4-6 opportunities with the task list item</span>
                  </div>
                  <div className="ml160">
                    <button className="clr3"></button>
                    <span>7-10 opportunities with the task list item</span>
                  </div>
                  <div className="ml160">
                    <h1 className="Heading mt20">
                      <b>&nbsp;&nbsp;New Estimated Date of Completion:</b>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>08/11/2023</b>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="HRline" />
          </div>
        </div>
        <div className="section2">
          <div className="columns">
            <div className="column">
              <p className="headingMain">
                <button
                  className=" backlink"
                  onClick={_ => {}}
                >
                  <IoIosArrowBack size={24} style={{ margin: '0 20px', marginLeft: 0 }}/>
                </button>
                  November (1)
                <button
                  className=" backlink"
                  onClick={_ => {}}
                >
                  <IoIosArrowForward size={24} style={{ margin: '0 20px'}} />
                </button>
              </p>

              <div className="column mt40">
                <div className="headerChart">
                  <p>SUPERVISION CONTACT AGENDA</p>
                </div>
                <div className="box">
                  <div className="agendaSec1 mt10">
                    <div>
                      <p>
                        <span>Supervisee: </span>
                        <span>
                          <input
                            className="contactAgendaInput"
                            type="text"
                            placeholder="Type here..."
                          />
                        </span>
                      </p>
                      <p>
                        <span>Start Time: </span>
                        <span>
                          <input
                            className="contactAgendaInput"
                            type="time"
                            placeholder="00:00 AA"
                          />
                        </span>
                      </p>
                      <p>
                        <span>Date: </span>
                        <span>
                          <input
                            className="contactAgendaInput"
                            type="date"
                            placeholder="MM/DD/YYYY"
                          />
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>Supervisor: </span>
                        <span>
                          <input
                            className="contactAgendaInput"
                            type="text"
                            placeholder="Type here..."
                          />
                        </span>
                      </p>
                      <p>
                        <span>End Time: </span>
                        <span>
                          <input
                            className="contactAgendaInput"
                            type="time"
                            placeholder="00:00 AA"
                          />
                        </span>
                      </p>
                      <p>
                        <span>Format: </span>
                        <span>
                          <input
                            className="contactAgendaInput"
                            type="text"
                            placeholder="Type here..."
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '15px'}}/>

                  <label className="checkbox-label">
                    <input type="checkbox" className="checkSize"  />
                    <span>Fieldwork Hours Check</span>
                  </label>
                  <div className="agendasec2 mt20" style={{ margin: '15px 40px'}}>
                    <div className='m-3'>
                      <table className='agenda-table'>
                        <tr className="barTableHeader">
                          <th colSpan="2">
                            Month to Date:
                            <input
                              className="contactAgendaInput"
                              type="text"
                              placeholder="Type here..."
                            />
                          </th>
                        </tr>
                        <tr>
                          <td>Independent Hours</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td>Unrestricted Hours</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td>% Unrestricted</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td># Supervision Contacts</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td>% Supervision</td>
                          <td className="colSize1"></td>
                        </tr>
                      </table>
                    </div>
                    <div className='m-3'>
                      <table className='agenda-table'>
                        <tr className="barTableHeader">
                          <th colSpan="2">
                            Total Accrued:
                            <input
                              className="contactAgendaInput"
                              type="text"
                              placeholder="Type here..."
                            />
                          </th>
                        </tr>
                        <tr>
                          <td>Independent Hours</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td>Unrestricted Hours</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td>% Unrestricted</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td># Supervision Contacts</td>
                          <td className="colSize1"></td>
                        </tr>
                        <tr>
                          <td>% Supervision</td>
                          <td className="colSize1"></td>
                        </tr>
                      </table>
                    </div>
                    <div  className='m-3' style={{ marginRight: '20px' }}>
                      <p className="checkText">
                        <input type="checkbox" className="checkSize" />
                        Supervised Fieldwork
                      </p>
                      <p className="checkText">
                        <input type="checkbox" className="checkSize" />
                        Practicum
                      </p>
                      <p className="checkText">
                        <input type="checkbox" className="checkSize" />
                        Intensive Practicum
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '15px'}}/>
                  
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkSize"  />
                    <span>Supervisee Check</span>
                  </label>

                  <div className="column mt20" style={{ margin: '0px 30px' }}>
                    <label style={{ lineHeight: '30px'}}>Supervisee questions and feedback:</label>
                    <textarea
                      className="textarea  "
                      placeholder="Type here..."
                    ></textarea>
                  </div>
                  <div style={{ height: '15px'}}/>

                  <label className="checkbox-label">
                    <input type="checkbox" className="checkSize"  />
                    <span>Observation Check</span>
                  </label>

                  <div className="mt20 agendasec3" style={{ margin: '20px 50px' }}>
                    <p>
                      Observation date:  
                      <input type="date" className="inputagenda" />
                    </p>
                    <br />
                    <label className="mt10">Skills demonstrated:</label>
                    <br />
                    <select className="select dropdownCustomize mt is-normal">
                      <option>Select</option>
                      <option>With options</option>
                    </select>
                    <p className="mt30">Feedback:</p>
                    <textarea
                      className="textarea  "
                      placeholder="Type here..."
                    ></textarea>
                  </div>
                  <div style={{ height: '15px'}}/>

                  <label className="checkbox-label">
                    <input type="checkbox" className="checkSize"  />
                    <span>Clinical Practice Check</span>
                  </label>

                  <div className="mt30" style={{ margin: '20px 50px' }}>
                    <p>
                      Type:
                      <input type="text" className="inputagenda" />
                    </p>
                    <div className="check mt10">
                      <p>
                        <input type="checkbox" className="checkSize" />
                        Completed
                      </p>
                      <p>
                        <input type="checkbox" className="checkSize" />
                        In person
                      </p>
                      <p>
                        <input type="checkbox" className="checkSize" />
                        Not completed
                      </p>
                      <p>
                        <input type="checkbox" className="checkSize" />
                        Online
                      </p>
                    </div>
                    <p className="mt30" style={{ lineHeight: '30px'}}>Feedback:</p>
                    <textarea
                      className="textarea  "
                      placeholder="Type here..."
                    ></textarea>
                    <div className="inputFlex mt20">
                      <p className='mt-2'>
                        Next assignment:
                        <input type="text" className="inputagenda" />
                      </p>
                      <p className='mt-2'>
                        Total Unrestricted Hours:
                        <input type="text" className="inputagenda" />
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '15px'}}/>

                  <label className="checkbox-label">
                    <input type="checkbox" className="checkSize"  />
                    <span>Task List Review Check</span>
                  </label>

                  <div className="mt30 agendaTable" style={{ margin: '20px 20px' }}>
                    <table>
                      <tr className="noBorder">
                        <th rowSpan="2" align='left' className="agendaTableHeader" style={{ textAlign:'left', paddingLeft: '16px'}}>Task</th>
                        <th colSpan="2" className="agendaTableHeader">Assessment</th>
                        <th rowSpan="2" className="agendaTableHeader">Feedback</th>
                        <th rowSpan="2" className="agendaTableHeader">Review</th>
                      </tr>
                      <tr>
                        <th className="agendaTableText">Can Demonstrate</th>
                        <th className="agendaTableText"> Can Explain</th>
                      </tr>
                      { rows.map((row, i) => (
                        <tr key={i}>
                        <td style={{ width: '30%', textAlign:'left', paddingLeft: '16px'}}></td>
                        <td style={{ width: '10%'}}>
                          <input type="checkbox" className="" />
                        </td>
                        <td style={{ width: '10%'}}>
                          <input type="checkbox" className="" />
                        </td>
                        <td style={{ width: '20%'}}></td>
                        <td style={{ width: '20%'}}></td>
                      </tr>

                      ))}
                    </table>
                  </div>

                  <div className="column is-two-fifths mt40">
                    <a
                      className="button is-large is-rounded saveBtn"
                      onClick={_ => {}}
                    >
                      Save Doc
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MonthlyDocument;
