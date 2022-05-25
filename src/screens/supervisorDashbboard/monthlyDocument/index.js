import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import './styles.css';

const MonthlyDocument = () => {
  const navigate = useNavigate();
  const rows = new Array(5).fill('0');
  const showSidebar = useShowSidebar();
  const dispatch = useDispatch()

  return (
    <div className="section monthly-document" style={{ overflowX: "auto" }}>
      <div className="columns">
        <div className="column is-one-fifths">
          <button
            className="Toggle_btn"
            onClick={() => dispatch(setShowSidebar(!showSidebar))}
          >
            {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
          </button>
          <p className="headingMain">Monthly document</p>
          <label className="label">Student Name</label>
          <select
            className="select dropdownCustom is-normal"
            value={1}
          >
            <option value={1}>John Cooper</option>
          </select>
        </div>
      </div>
      <div className="section2">
        <div className="columns">
          <div className="column">
            <p className="headingMain">
              <button
                className=" backlink"
                onClick={_ => { }}
              >
                <IoIosArrowBack size={24} style={{ margin: '0 20px', marginLeft: 0 }} />
              </button>
              November (1)
              <button
                className=" backlink"
                onClick={_ => { }}
                style={{ margin: '0 20px' }}
              >
                <IoIosArrowForward size={24} style={{ margin: '0 20px' }} />
              </button>
            </p>

            <div className="column mt40" style={{ marginLeft: '-20px' }}>
              <div className="headerChart">
                <p>INDIVIDUAL SUPERVISION MEETING AGENDA</p>
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
                <div style={{ height: '15px' }} />

                <label className="checkbox-label">
                  <input type="checkbox" className="checkSize" />
                  <span>Fieldwork Hours Check</span>
                </label>
                <div className="agendasec2 mt20">
                  <div className='m-2'>
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
                  <div className='m-2'>
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
                  <div className="m-2" style={{ marginRight: '20px' }}>
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
                <div style={{ height: '15px' }} />

                <label className="checkbox-label">
                  <input type="checkbox" className="checkSize" />
                  <span>Supervisee Check</span>
                </label>

                <div className="column mt20" style={{ margin: '0px 30px' }}>
                  <label style={{ lineHeight: '30px' }}>Supervisee questions and feedback:</label>
                  <textarea
                    className="textarea  "
                    placeholder="Type here..."
                  ></textarea>
                </div>
                <div style={{ height: '15px' }} />

                <label className="checkbox-label">
                  <input type="checkbox" className="checkSize" />
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
                <div style={{ height: '15px' }} />

                <label className="checkbox-label">
                  <input type="checkbox" className="checkSize" />
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
                  <p className="mt30" style={{ lineHeight: '30px' }}>Feedback:</p>
                  <textarea
                    className="textarea  "
                    placeholder="Type here..."
                  ></textarea>

                </div>
                <div style={{ height: '15px' }} />

                <label className="checkbox-label">
                  <input type="checkbox" className="checkSize" />
                  <span>Task List Review Check</span>
                </label>

                <div className="mt30 agendaTable" style={{ margin: '20px 20px' }}>
                  <table>
                    <tr className="noBorder">
                      <th rowSpan="2" align='left' className="agendaTableHeader" style={{ textAlign: 'left', paddingLeft: '16px' }}>Task</th>
                      <th colSpan="2" className="agendaTableHeader">Assessment</th>
                      <th rowSpan="2" className="agendaTableHeader">Feedback</th>
                      <th rowSpan="2" className="agendaTableHeader">Review</th>
                    </tr>
                    <tr>
                      <th className="agendaTableText">Can Demonstrate</th>
                      <th className="agendaTableText"> Can Explain</th>
                    </tr>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td style={{ width: '30%', textAlign: 'left', paddingLeft: '16px' }}></td>
                        <td style={{ width: '10%' }}>
                          <input type="checkbox" className="" />
                        </td>
                        <td style={{ width: '10%' }}>
                          <input type="checkbox" className="" />
                        </td>
                        <td style={{ width: '20%' }}></td>
                        <td style={{ width: '20%' }}></td>
                      </tr>

                    ))}
                  </table>
                </div>

                <div className="column is-two-fifths mt40">
                  <a
                    className="button is-large is-rounded saveBtn"
                    onClick={_ => { }}
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
