import {
    SET_SIGNUP_CREDENTIALS,
} from '../types/types_signup';

export const setSignupCredentials = (email) => async dispatch => {
    const data = { email: email }
    dispatch({ type: SET_SIGNUP_CREDENTIALS, payload: data });
};
