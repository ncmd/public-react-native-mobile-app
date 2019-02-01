// import axios from 'axios';
// import {
//   ADD_ACCOUNT,
//   GET_ACCOUNT,
// } from './types';

// const keys = require('../../secrets/keys');
// let backend = keys.heroku_backend_uri





// export const setAccount = (email, accountid, plan) => async dispatch => {
//   // console.log(email,accountid,plan)
//   const data = { email: email, accountid: accountid, plan: plan }
//   await axios.post(backend + '/api/accounts/create', data);
//   dispatch({ type: ADD_ACCOUNT, payload: data });
// };

// export const createAccount = (email, username) => async dispatch => {
//   const data = { email: email, username: username }
//   await axios.post(backend + '/api/account/create', data)
// }

// export const getAccount = (accountid) => async dispatch => {
//   const data = { accountid: accountid }
//   const res = await axios.post(backend + '/api/account/get', data);
//   dispatch({ type: GET_ACCOUNT, payload: res.data });
// };