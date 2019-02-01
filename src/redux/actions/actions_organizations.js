
// import axios from 'axios';

// export const inviteAccount = (email, organizationname) => async dispatch => {
//     const data = { email: email, organizationname: organizationname }
//     const res = await axios.post(backend + '/api/account/invite', data)
//     // console.log(res.data)
//     return res.data
//   }
  
//   export const createOrganization = (organizationname, emailaddress, accountid) => async dispatch => {
//     const data = { organizationname: organizationname.toLowerCase(), emailaddress: emailaddress, accountid: accountid }
//     await axios.post(backend + '/api/organization/create', data).then(function (result) {
//       dispatch({ type: JOIN_ORGANIZATION, payload: organizationname })
//       auth.loadOrganization(organizationname)
//     })
//   }
  
//   export const joinOrganization = (organizationname, accountid) => async dispatch => {
//     const data = { organizationname: organizationname.toLowerCase(), accountid: accountid }
//     await axios.post(backend + '/api/organization/join', data)
//     dispatch({ type: JOIN_ORGANIZATION, payload: organizationname })
//   }
  
//   export const leaveOrganization = (organizationname, accountid) => async dispatch => {
//     const data = { organizationname: organizationname, accountid: accountid }
//     await axios.post(backend + '/api/organization/leave', data)
//     dispatch({ type: LEAVE_ORGANIZATION, payload: organizationname })
//   }
  
//   export const checkOrganization = (organizationname) => async dispatch => {
//     const data = { organizationname: organizationname.toLowerCase() }
//     const res = await axios.post(backend + '/api/organization/check', data)
//     dispatch({ type: CHECK_ORGANIZATION, payload: res.data.Message })
//   }


//   export const loadOrganizationAll = (organizationname) => async dispatch => {
//     const data = await auth.loadOrganization(organizationname)
//     // // console.log("DAAATA",data)
//     dispatch({ type: LOAD_ORGANIZATION, payload: data })
//   }

// export const addActivityToOrganization = (organizationname, activity) => async dispatch => {
//     // console.log("ACTIVITY!!!!",activity)
//     await auth.addActivityToOrganization(organizationname, activity)
//     dispatch({ type: ADD_ACTIVITY_ORGANIZATION, payload: activity, payloadindex: 0 });
//   };
  
//   export const completeOrganizationActivity = (organizationname, activity) => async dispatch => {
//     await auth.completeOrganizationActivityFirestore(organizationname, activity)
//     dispatch({ type: COMPLETE_ACTIVITY_ORGANIZATION, payload: activity, payloadindex: 0 });
//   };


// export const changeOrgMemberDepartment = (organizationname, index, department) => dispatch => {
//     auth.changeOrgMemberDepartmentFirestore(organizationname, index, department)
//     dispatch({ type: CHANGE_DEPARTMENT_ORGANIZATION, payloadindex: index, payloaddepartment: department })
//   }


// export const signoutOrganization = () => dispatch => {
//     dispatch({ type: SIGNOUT_ORGANIZATION, payload: {} })
//   }
  