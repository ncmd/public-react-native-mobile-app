import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGOUT,
  SET_ACCOUNT_INFORMATION,
} from '../types/types_account';

export const setAccountInformation = (thisdata) => dispatch => {
  let data = thisdata
  dispatch({ type: SET_ACCOUNT_INFORMATION, payload: data});
}

export const accountLogin = () => dispatch => {
  dispatch({ type: ACCOUNT_LOGIN });
  console.log("accountLogin - this.props.account:",this.props.account)
}

export const accountLogout = () => dispatch => {
    dispatch({ type: ACCOUNT_LOGOUT });
    console.log("accountLogout - this.props.account:",this.props.account)
}

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