// import axios from 'axios';
// // Edit Groups
// export const addGroupContactname = (contactname) => dispatch => {
//     const data = { contactname }
//     dispatch({ type: ADD_GROUP_CONTACTNAME, payload: data });
//   };
//   export const addGroupEmailaddress = (emailaddress) => dispatch => {
//     const data = { emailaddress }
//     dispatch({ type: ADD_GROUP_EMAILADDRESS, payload: data });
//   };
//   export const addGroupInstantmessenger = (instantmessenger) => dispatch => {
//     const data = { instantmessenger }
//     dispatch({ type: ADD_GROUP_INSTANTMESSENGER, payload: data });
//   };
//   export const addGroupDepartment = (department) => dispatch => {
//     const data = { department }
//     dispatch({ type: ADD_GROUP_DEPARTMENT, payload: data });
//   };
//   export const addGroupLocation = (location) => dispatch => {
//     const data = { location }
//     dispatch({ type: ADD_GROUP_LOCATION, payload: data });
//   };
//   export const addGroupSkillsExperience = (skillsexperience) => dispatch => {
//     const data = { skillsexperience }
//     dispatch({ type: ADD_GROUP_SKILLSEXPERIENCE, payload: data });
//   };
//   export const addGroups = (groups) => async dispatch => {
//     const data = { groups }
//     dispatch({ type: ADD_GROUPS, payload: data });
//   };

// export const addGroupUser = (uri, accountid, contactname, emailaddress, instantmessenger, department, location) => async dispatch => {
//     const data = { accountid: accountid, contactname: contactname, emailaddress: emailaddress, instantmessenger: instantmessenger, department: department, location: location }
//     await axios.post(backend + `${uri}`, data);
//     dispatch({ type: ADD_GROUPS, payload: data });
//   };