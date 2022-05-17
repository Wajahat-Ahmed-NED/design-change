import { all } from 'redux-saga/effects';
import { loginSaga, logoutSaga, signupSaga, verifyEmailSaga } from './auth/AuthSagas';
import { changePassSaga } from './auth/changePassSaga';
import { forgetPassSaga, resetPassSaga } from './auth/forgetPassSaga';
import { fetchAllSaga } from './experienceLog/fetchAllSaga';
import { fetchCsvSaga } from './experienceLog/fetchCsvSaga';
import { fetchFlaggedByDateSaga } from './experienceLog/fetchFlaggedByDateSaga';
import { fetchFlaggedSaga, fetchPastFlaggedSaga } from './experienceLog/fetchFlaggedSaga';
import { fetchPendingByDateSaga } from './experienceLog/fetchPendingByDateSaga';
import { formDataSaga } from './experienceLog/formDataSaga';
import { submitFlagSaga } from './experienceLog/submitFlagSaga';
import { submitFormSaga } from './experienceLog/submitFormSaga';
import { fetchAccruedSaga } from './monthlyDocument/fetchAccruedSaga';
import { fetchProfileSaga } from './profile/fetchSaga';
import { updateProfileSaga } from './profile/updateSaga';
import { fetchSubscriptionSaga, fetchUserSubscriptionSaga } from './subscription/fetchSaga';
import { addSubscritionSaga, updateSubscritionSaga } from './subscription/paymentSaga';
import { deleteSaga } from './trainees/deleteSaga';
import { fetchAllTraineesSaga } from './trainees/fetchAllSaga';

export default function* rootSaga() {
    yield all([
        signupSaga(),
        verifyEmailSaga(),
        loginSaga(),
        logoutSaga(),
        forgetPassSaga(),
        resetPassSaga(),
        changePassSaga(),
        formDataSaga(),
        fetchAllSaga(),
        fetchFlaggedSaga(),
        fetchPastFlaggedSaga(),
        fetchCsvSaga(),
        submitFormSaga(),
        fetchSubscriptionSaga(),
        fetchUserSubscriptionSaga(),
        addSubscritionSaga(),
        updateSubscritionSaga(),
        fetchProfileSaga(),
        updateProfileSaga(),
        submitFlagSaga(),
        fetchAccruedSaga(),
        fetchAllTraineesSaga(),
        deleteSaga(),
        fetchPendingByDateSaga(),
        fetchFlaggedByDateSaga()
    ])
}