import axios from "axios";

axios.defaults.baseURL = 'http://www.fieldworktracker.com';
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['X-CSRFToken'] = 'ZgT2jJvV2D7L3zktN7I7FW4Bk8Nshero3do19BEBUvrYPJnwoyBfy8WkZrwZ8YG4';
axios.defaults.timeout = 10000;
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

const post = (url, body = {}) => axios.post(url, body);
const get = (url, params = {}) => axios.get(url, { params });
const put = (url, body = {}) => axios.put(url, body);
const del = (url, params = {}) => axios.delete(url, { params });

const ApiService = {
  axios,
  setAuthHeader: (token) => {
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
  },
  removeAuthHeader: () => {
    delete axios.defaults.headers.common["Authorization"];
  },

  login: (params) => post(`/api/v1/login/`, params),  
  signup: (params) => post(`/api/v1/signup/`, params),
  verifyEmail: (params) => post(`/users/email/verify-user/`, params),
  forgetPassSend: (params) => post(`/users/reset-password/send/`, params),
  forgetPassResend: (params) => post(`/users/reset-password/resend/`, params),
  forgetPassVerify: (params) => post(`/users/reset-password/verify/`, params),
  changePassword: (params) => post(`/rest-auth/password/change/`, params),
  
  getProfile: () => get(`/users/profile/`),
  updateProfile: (id, params) => put(`/users/profile/${id}/`, params),

  getExperienceTypes: () => get(`/api/v1/expereince-type/`),
  getSetting: () => get(`/api/v1/setting/`),
  getSupervisors: () => get(`/api/v1/get-supervisor/`),
  getMethodSupervision: () => get(`/api/v1/method-supervision/`),
  getClientObservation: () => get(`/api/v1/client-observation/`),
  getSupervisionContact: () => get(`/api/v1/supervision-contact/`),
  getTasks: () => get(`/api/v1/task/`),
  postExpLog: (params) => post('api/v1/experience-log/', params),
  getAll:   () => get(`/api/v1/experience-log/`),
  getFlagged:   () => get(`/api/v1/experience-log/?status=flagged`),
  getPending:   () => get(`/api/v1/experience-log/?status=pending`),
  getApproved:  () => get(`/api/v1/experience-log/?status=approved`),
  getCsvData:  () => get(`/api/v1/download-experience-log/`),

  getSubscriptions: () => get(`/api/v1/subscription/`),
  getUserSubscription: () => get(`/api/v1/user-subscription/`),
  addSubscription: (params) => post(`/api/v1/charge-payment/`, params),
  updateSubscription: (params) => put(`/api/v1/charge-payment/`, params),

  getPrivacyPolicy : () => get(`/modules/privacy-policy/`),
  getTermsConditions : () => get(`/modules/terms-and-conditions/`),

  getAccrued: () => get('/api/v1/get-accrued/'),

  // Supervisor side

  getPendingByDate:  (date) => get(`/api/v1/experience-log/?date_of_experience=${date}&status=pending`),
  getFlaggedByDate:  (date) => get(`/api/v1/experience-log/?date_of_experience=${date}&status=flagged`),
  postFlagLog: (params) => post('/api/v1/flag-log/', params),
  getTrainees: () => get('/api/v1/all-trainee/'),
  removeTrainee: (params) => post('/api/v1/remove-user/', params),
  postMonthlyDocument: (params) => post('api/v1/monthy-log/', params),

};

export default ApiService;
