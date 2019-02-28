import {
    ACCOUNT_NET_WORTH_ADD,
    ACCOUNT_NET_WORTH_GET,
  } from '../types/types_account';
  import firebase from 'react-native-firebase';
  
  export const loadAccountNetWorth = (accountid) => async dispatch => {
    console.log("loadAccountNetWorth----")
    let data = []
    dispatch({
      type: LOAD_ACCOUNT_INFORMATION
    });
  }
  