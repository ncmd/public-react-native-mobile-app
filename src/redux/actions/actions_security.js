// import axios from 'axios';

// // Get VerifyIDToken
// export const sendVerifyIdTokenToBackend = (token) => {
//     let data = { token: token }
//     axios.post(backend + '/api/verify', data);
//   }

//   // Action Creator, call Golang RestAPI, uses Dispatch Redux to send to store
// export const applySecurity = (email, recaptcha) => async dispatch => {
//     let data = { email: email, recaptcha: recaptcha };
//     const res = await axios.post(backend + '/api/apply', data);
//     dispatch({ type: SET_RECAPTCHA, payload: res.data });
//   };