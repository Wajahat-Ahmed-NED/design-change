import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import './dashboard.css'
import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import Icon2 from "../../../assets/Group2.png";
import Icon3 from "../../../assets/Group3.png";
import { Doughnut } from 'react-chartjs-2';
Chart.register(
    Tooltip, Title, ArcElement, Legend
)

const Dashboard = () => {
    const showSidebar = useShowSidebar();
    const dispatch = useDispatch()
    const rows = new Array(5).fill('0');
    const data = {
        datasets: [{
            label: 'My First Dataset',
            data: [28.56, 71.44],
            backgroundColor: [
                '#75D6D1',
                '#F4DEEA',
            ],
            hoverOffset: 4
        }]
    }
    const data1 = {
        datasets: [{
            label: 'My First Dataset',
            data: [31.7, 68.4],
            backgroundColor: [
                '#75D6D1',
                '#F9E18A',
            ],
            hoverOffset: 4
        }]
    }
    const data2 = {
        datasets: [{
            label: 'My First Dataset',
            data: [56.67, 43.33],
            backgroundColor: [
                '#75D6D1',
                '#F9E18A',
            ],
            hoverOffset: 4
        }]
    }

    return (
        <div className="section">
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
                    <p className="headingMain">Dashboard</p>
                    <div className="columns mt30">
                        <div className="column row-space-evenly">
                            <div className="cards bottom-text-div">
                                <p className='card-text'> TOTAL HOURS COMPLETED </p>
                                <div className='doughnut-div'>
                                    <Doughnut data={data} />
                                </div>
                                <div className='bottom'>
                                    <p className='card-text'> 28.56% Completed </p>
                                    <p className='card-text'> Non-Concentrated: 224 <br></br>
                                        Concentrated: 252
                                    </p>
                                </div>

                            </div>
                            <div className="cards bottom-text-div">
                                <p className='card-text'> RESTRICTED VS UNRESTRICTED HOURS </p>
                                <div className='doughnut-div'>
                                    <Doughnut data={data1} />
                                </div>

                                <div className='bottom'>

                                    <p className='card-text'> 31.7% Restricted
                                        <br></br>
                                        68.4% Unrestricted
                                    </p>
                                    <p className='card-text'> Required minimum 60% Unrestricted </p>
                                </div>

                            </div>
                            <div className="cards bottom-text-div">
                                <p className='card-text'> SUPERVISED HOURS </p>
                                <div className='doughnut-div'>
                                    <Doughnut data={data2} />
                                </div>

                                <div className='bottom'>
                                    <p className='card-text'> 43.3% Supervised </p>
                                    <p className='card-text'>
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                    <p className="headingMain mt30">Monthly Details</p>
                    <div className="mt30 agendaTable mt30">
                        <table>
                            <tr className="noBorder">
                                <th className="agendaTableHeader">Month</th>
                                <th className="agendaTableHeader">Total Hours</th>
                                <th className="agendaTableHeader">Independent</th>
                                <th className="agendaTableHeader">Supervised</th>
                                <th className="agendaTableHeader">Supervised</th>
                                <th className="agendaTableHeader">Supervision %</th>
                                <th className="agendaTableHeader">Restricted</th>
                                <th className="agendaTableHeader">Unrestricted</th>
                                <th className="agendaTableHeader">Unrestricted %</th>
                                <th className="agendaTableHeader">Type</th>
                            </tr>

                            {rows.map((row, i) => (
                                <tr key={i}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>

                            ))}
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
