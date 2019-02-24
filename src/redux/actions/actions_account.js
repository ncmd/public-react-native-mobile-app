import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGOUT,
  SET_ACCOUNT_INFORMATION,
  LOAD_ACCOUNT_INFORMATION,
} from '../types/types_account';
import firebase from 'react-native-firebase';

export const loadAccountInformation = (accountid) => async dispatch => {
  console.log("loadAccountInformation----")
  let data = []
  let ref = firebase.firestore().collection('accounts').doc(accountid);
  await ref.get().then(function (doc) {
    // dispatch({ 
    //   type: LOAD_ACCOUNT_INFORMATION, 
    //   emailAddress: doc.data().emailAddress, 
    //   phoneNumber: doc.data().phoneNumber, 
    //   firebaseUid: doc.data().firebaseUid, 
    //   orders: doc.data().orders, 
    //   });
  });

}

export const setAccountInformation = (thisdata) => dispatch => {
  let data = thisdata
  dispatch({ type: SET_ACCOUNT_INFORMATION, payload: data });
}

export const accountLogin = () => dispatch => {
  dispatch({ type: ACCOUNT_LOGIN, payload: true });
  // console.log("accountLogin - this.props.account:",this.props.account)
}

export const accountLogout = () => dispatch => {
  dispatch({ type: ACCOUNT_LOGOUT, payload: false });
  // console.log("accountLogout - this.props.account:",this.props.account)
}
export const createNewAccount = (emailaddress, phonenumber, firebaseuid) => async dispatch => {
  console.log("Creating Account", emailaddress, phonenumber)
  let ref = await firebase.firestore().collection('accounts').doc(firebaseuid);
  ref.set({
    emailAddress: emailaddress,
    phoneNumber: phonenumber,
    firebaseUid: firebaseuid,
    orders: []
  })
}

export const accountWatchStock = (stockid) => async dispatch => {
  console.log("Watching stock")
  
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