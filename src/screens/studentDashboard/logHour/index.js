import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { GiHamburgerMenu } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setShowSidebar, useShowSidebar } from '../../../redux/reducers/SidebarReducer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setSuccess, useFormData, useErrors, useIsLoading, useSuccess } from '../../../redux/reducers/ExpLogReducer';
import { fetchStaticData } from '../../../redux/sagas/experienceLog/formDataSaga';
import { submitExpLog } from '../../../redux/sagas/experienceLog/submitFormSaga';
import { useDispatchEffect } from '../../../utils/hooks';
import { validateLogHourForm } from '../../../utils/validation';
import './logHour.css';
// import MultiSelect from '../../../components/MultiSelect';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import OutlinedInput from '@mui/material/OutlinedInput';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
// function getStyles(name, names) {
//   return {
//     fontWeight: names.indexOf(name) === -1 ? 500 : 700
//   };
// }


const LogHour = () => {
  const data = useFormData();
  const isLoading = useIsLoading();
  let {
    expTypes,
    setting,
    supervisors,
    obsevations,
    methods,
    contacts,
    tasks
  } = data;
  // tasks.length && tasks.sort((a,b) => (a.id - b.id));

  useDispatchEffect(fetchStaticData, null, expTypes?.length == 0);

  const initialValues = {
    expereince_type: 1,
    setting: 1,
    method_of_supervision: 1,
    client_observation: 1,
    supervision_contact: 1,
    task: [],
    supervisor: 1,
    date_of_experience: moment().format('MM/DD/YYYY'),
    time_of_expereince: "",
    unrestricted_hours:  "",
    restricted_hours:  "",
    experience_hours:  "",
    individual_or_group:  "Individual",
    supervision_start_time:  "",
    supervision_end_time:  "",
    supervised_hours:  "",
    independant_hours:  "",
    experience_note:  ""  
  };

  const dispatch = useDispatch();

  const onSubmit = (values, onSubmitProps) => {
      const newValues = { ...values, task: 1 }; 
      dispatch(submitExpLog(newValues));  
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: validateLogHourForm,
  });

  const logCreateSuccess =  useSuccess();
  const logCreateErrors = useErrors();

  useEffect(() => {
    if(logCreateSuccess) {
      toast.success('Successfully submitted');
      dispatch(setSuccess(false))
    }
  }, [logCreateSuccess]);

  useEffect(() => {
    if(logCreateErrors && Array.isArray(logCreateErrors))
      logCreateErrors.forEach(err => {
        toast.error(err);
      });
  }, [logCreateErrors]);

  console.log('values: ',formik.values);
  // console.log('errors: ',formik.errors);
  // console.log('logCreateErrors: ', logCreateErrors);

  const showSidebar = useShowSidebar(); 

  if(isLoading)
    return (
      <LoadingSpinner style={{ width: '100%'}} />
    )

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
            
            <p className="headingMain">Log Experience Hours</p>
            
            <form onSubmit={formik.handleSubmit}>
            <div className="column mt30 is-two-fifths logForm">
              <label className="label">Experience Type</label>
              <select 
                name='expereince_type'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.expereince_type}
                onChange={formik.handleChange}
              >
              {
                expTypes.map(item => <option value={Number(item.id)} key={item.id}>{item.name}</option>)
              }
              </select>
              <span className="Register__error">
                  {(formik.touched.expereince_type && formik.errors.expereince_type) || ''}
                </span>

              <label className="label">Setting</label>

              <select 
                name='setting'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.setting}
                onChange={formik.handleChange}
              >
              {
                setting.map(item => <option value={Number(item.id)} key={item.id}>{item.name}</option>)
              }
              </select>
              <span className="Register__error">
                {(formik.touched.setting && formik.errors.setting) || ''}
              </span>

              <label className="label">Supervisor</label>
              <select 
                name='supervisor'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.supervisor}
                onChange={formik.handleChange}
              >
              {
                supervisors.map(item => <option value={Number(item.id)} key={item.id}>{item.name}</option>)
              }
              </select>
              <span className="Register__error">
                {(formik.touched.supervisor && formik.errors.supervisor) || ''}
              </span>

              <label className="label">Date of Experience</label>
              {/* <div style={{ width: '100%'}}>
              <DatePicker
                name='date_of_experience'
                 placeholderText='mm/dd/yyyy'
                 selected={new Date(formik.values.date_of_experience)}
                onChange={(date, e) => formik.handleChange(e)} 
                className='date-picker'
                />
              </div> */}
              <input 
                className="input is-small" 
                type="date" placeholder=" " 
                name='date_of_experience'
                value={formik.values.date_of_experience}
                onChange={formik.handleChange}
              />
              <span className="Register__error">
                {(formik.touched.date_of_experience && formik.errors.date_of_experience) || ''}
              </span>

              <label className="label">Time of Experience</label>
              <input 
                className="input is-small" 
                type="time" 
                placeholder=" " 
                name='time_of_expereince'
                value={formik.values.time_of_expereince}
                onChange={formik.handleChange}
                />
              <span className="Register__error">
                {(formik.touched.time_of_expereince && formik.errors.time_of_expereince) || ''}
              </span>

              <label className="label">Unrestricted Hours</label>
              <input
                className="input is-small"
                type="number"
                placeholder="Type here ..."
                name='unrestricted_hours'
                value={formik.values.unrestricted_hours}
                onChange={formik.handleChange}
              />
              <span className="Register__error">
                {(formik.touched.unrestricted_hours && formik.errors.unrestricted_hours) || ''}
              </span>

              <label className="label">Restricted Hours </label>
              <input
                className="input is-small"
                type="number"
                placeholder="Type here ..."
                name='restricted_hours'
                value={formik.values.restricted_hours}
                onChange={formik.handleChange}
              />
              <span className="Register__error">
                {(formik.touched.restricted_hours && formik.errors.restricted_hours) || ''}
              </span>

              <label className="label">Experience Hours </label>
              <input
                className="input is-small"
                type="number"
                placeholder="Type here ..."
                name='experience_hours'
                value={formik.values.experience_hours}
                onChange={formik.handleChange}
              />
              <span className="Register__error">
                {(formik.touched.experience_hours && formik.errors.experience_hours) || ''}
              </span>

              <label className="label">Individual or group supervision?</label>

              <select 
                name='individual_or_group'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.individual_or_group}
                onChange={formik.handleChange}
              >
                <option value='Individual'>Individual</option>
                <option value='Group'>Group</option>
              </select>
              <span className="Register__error">
                {(formik.touched.individual_or_group && formik.errors.individual_or_group) || ''}
              </span>

              <label className="label">Method of Supervision</label>

              <select 
                name='method_of_supervision'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.method_of_supervision}
                onChange={formik.handleChange}
              >
              {
                methods.map(item => <option value={Number(item.id)} key={item.id}>{item.name}</option>)
              }
              </select>
              <span className="Register__error">
                {(formik.touched.method_of_supervision && formik.errors.method_of_supervision) || ''}
              </span>

              <label className="label">Supervision Start Time</label>
              <input 
                className="input is-small" 
                type="time" placeholder=" " 
                name='supervision_start_time'
                value={formik.values.supervision_start_time}
                onChange={formik.handleChange} 
                />
              <span className="Register__error">
                {(formik.touched.supervision_start_time && formik.errors.supervision_start_time) || ''}
              </span>

              <label className="label">Supervision End Time</label>
              <input 
                className="input is-small" 
                type="time" placeholder=" " 
                name='supervision_end_time'
                value={formik.values.supervision_end_time}
                onChange={formik.handleChange}
                />
              <span className="Register__error">
                {(formik.touched.supervision_end_time && formik.errors.supervision_end_time) || ''}
              </span>

              <label className="label">Supervised Hours </label>
              <input
                className="input is-small"
                type="number"
                placeholder="Type here ..."
                name='supervised_hours'
                value={formik.values.supervised_hours}
                onChange={formik.handleChange}
              />
              <span className="Register__error">
                {(formik.touched.supervised_hours && formik.errors.supervised_hours) || ''}
              </span>

              <label className="label">Independent Hours </label>
              <input
                className="input is-small"
                type="number"
                placeholder="Type here ..."
                name='independant_hours'
                value={formik.values.independant_hours}
                onChange={formik.handleChange}
              />
              <span className="Register__error">
                {(formik.touched.independant_hours && formik.errors.independant_hours) || ''}
              </span>

              <label className="label">Client Observation?</label>
              <select 
                name='client_observation'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.client_observation}
                onChange={formik.handleChange}
              >
              {
                obsevations.map(item => <option value={Number(item.id)} key={item.id}>{item.name}</option>)
              }
              </select>
              <span className="Register__error">
                {(formik.touched.client_observation && formik.errors.client_observation) || ''}
              </span>

              <label className="label">Supervision contacts</label>
              <select 
                name='supervision_contact'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.supervision_contact}
                onChange={formik.handleChange}
              >
              {
                contacts.map(item => <option value={Number(item.id)} key={item.id}>{item.contact}</option>)
              }
              </select>
              <span className="Register__error">
                {(formik.touched.supervision_contact && formik.errors.supervision_contact) || ''}
              </span>

              <label className="label">Task list items documented</label>
              <select 
                name='task'
                className="select dropdownCustom mt is-normal" 
                value={formik.values.task}
                onChange={formik.handleChange}
              >
              {
                tasks.map(item => <option value={Number(item.id)} key={item.id}>{item.name.split(' ')[0]}</option>)
              }
              </select>
              {/* <Select
                name="task"
                multiple
                value={formik.values.task}
                onChange={formik.handleChange}
                input={<OutlinedInput className='MuiMultiselect' />}
                style={{ width: '100%' }}
                MenuProps={MenuProps}
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                  color: '#141414',
                  borderRadius: '5px'
                }}

              >
                {tasks.map(t => t.name.split(' ')[0]).map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, formik.values.task)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select> */}


              <span className="Register__error">
                {(formik.touched.task && formik.errors.task) || ''}
              </span>

              <label className="label">Experience Notes</label>
              <textarea 
                className="textarea" 
                placeholder="Type here..." 
                name='experience_note'
                value={formik.values.experience_note}
                onChange={formik.handleChange}
              ></textarea>
              <span className="Register__error">
                {(formik.touched.experience_note && formik.errors.experience_note) || ''}
              </span>

              <button
                className="button is-two-fifths is-large is-rounded dashBtn mt30"
                type='submit'
              >
                Submit
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
  );

};

export default LogHour;
