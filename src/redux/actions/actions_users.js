// import axios from 'axios';

// export const setUserEmail = (email) => dispatch => {
//     const data = { email: email };
//     dispatch({ type: SET_EMAIL, payload: data });
//   };
  
//   export const getUser = () => dispatch => {
//     dispatch({ type: FETCH_USER });
//   };
  
//   export const addUser = (email, accountid, source, plan) => async dispatch => {
//     let data = { email: email, accountid: accountid, source: source, plan: plan };
//     // console.log("DATA:",data)
//     const res = await axios.post(backend + '/api/user/new', data);
//     dispatch({ type: ADD_USER, payload: res.data });
//     return res.data
//   };