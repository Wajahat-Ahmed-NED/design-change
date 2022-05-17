import moment from 'moment';

export const isEmpty = (value) => {
  if(value===null || value===undefined) return true
  else if(typeof value === 'string' && value.length === 0) return true;
  else if(typeof value === 'number' && value < 0) return true;
  else return false
};
export const isNotSelected = (param = 0) => (param && param === 0);

export const validateLogHourForm = values => {
    let errors = {};
    for (const key in values) {
      if (isEmpty(values[key])) {
        errors[key] = '⋆Required';
      }
    }
    const startTime = moment(values.supervision_start_time,'HH:mm'); 
    const endTime = moment(values.supervision_end_time,'HH:mm'); 
    const diffHrs = endTime.diff(startTime, 'hours'); 

    if(Number(values.supervised_hours) > diffHrs)
      errors.supervised_hours = 'Value cannot be more than '+diffHrs;
    else if(Number(values.supervised_hours)+Number(values.independant_hours) > diffHrs)
      errors.independant_hours = 'Value cannot be more than '+(diffHrs-Number(values.supervised_hours));
    return errors;
}

export const validateStudentRegistration = values => {
    let errors = {};
    if (!values.email) {
      errors.email = '⋆Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email format';
    }
    if (!values.password) {
      errors.password = '⋆Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 characters long';
    }
    if (!values.name) {
      errors.name = '⋆Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = '⋆Required';
    }
    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords not matched';
      }
    }
    if (!values.check) {
      errors.check = 'Please agree to our terms and conditions';
    }
    return errors;
  };
export const validateSupervisorRegistration = values => {
    let errors = {};
    if (!values.email) {
      errors.email = '⋆Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email format';
    }
    if (!values.password) {
      errors.password = '⋆Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 characters long';
    }
    if (!values.name) {
      errors.name = '⋆Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = '⋆Required';
    }
    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords not matched';
      }
    }
    if (!values.check) {
      errors.check = 'Please agree to our terms and conditions';
    }
    if (!values.bacb_account_number) {
      errors.bacb_account_number = '⋆Required';
    }
    if (!values.bacb_certification_number) {
      errors.bacb_certification_number = '⋆Required';
    }
    if (!values.supervisor_qualification) {
      errors.supervisor_qualification = '⋆Required';
    }
    if (!values.date_qualified) {
      errors.date_qualified = '⋆Required';
    }
    if (!values.date_contract) {
      errors.date_contract = '⋆Required';
    }

    return errors;
  };
export const validateSupervisorProfile = values => {
    let errors = {};
    if (!values.email) {
      errors.email = '⋆Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email format';
    }
    if (!values.name) {
      errors.name = '⋆Required';
    }
    if (!values.bacb_account_number) {
      errors.bacb_account_number = '⋆Required';
    }
    if (!values.bacb_certification_number) {
      errors.bacb_certification_number = '⋆Required';
    }
    if (!values.supervisor_qualification) {
      errors.supervisor_qualification = '⋆Required';
    }
    if (!values.date_qualified) {
      errors.date_qualified = '⋆Required';
    }
    if (!values.date_contract) {
      errors.date_contract = '⋆Required';
    }

    return errors;
  };

