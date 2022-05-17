import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import { useData, useIsLoading } from '../../../redux/reducers/TraineesReducer';
import { removeTrainee } from '../../../redux/sagas/trainees/deleteSaga';
import { fetchAllTrainees } from '../../../redux/sagas/trainees/fetchAllSaga';
import { useDispatchEffect } from '../../../utils/hooks';
import './styles.css';
// import { Popover } from 'react-tiny-popover';

const Trainees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trainees = useData(); 
  const isLoading = useIsLoading();
  const showSidebar = useShowSidebar(); 

  useDispatchEffect(fetchAllTrainees, null, true);

  const onRemove = (id) => { 
    dispatch(removeTrainee({ u_id: id }));
  } 

  return (
      <div className="section has-background">
        <div className="columns ">
          <div className="column is-two-fifths">
            <button
              className="Toggle_btn"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            >
              {showSidebar ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>
            
            <p className="headingMain">Trainees</p>
            
            <div className="column is-three-fifths mt60 trainees">
              <p>Completed Hours</p>
              <table className="Traineetable">
              {
                trainees.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="tableFlex">
                      <span className='name'>{ item.name }</span>
                      <button className='delete-btn' onClick={() => onRemove(item.id)}>Remove</button>
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
                !isLoading && trainees.length === 0 && (
                  <div className='empty-list'>
                    No trainees found
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
export default Trainees;
