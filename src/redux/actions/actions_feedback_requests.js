// import axios from 'axios';

// export const getRequests = () => async dispatch => {
//     const res = await axios.get(backend + '/api/requests')
//     const data = []
//     res.data.map((req) => {
//       data.push({ description: req.description, tags: req.tags })
//       return null
//     })
//     dispatch({ type: 'GET_REQUESTS', payload: data });
//   };
  
  
//   export const addRequest = (description, tags) => async dispatch => {
//     const getlength = await axios.get(backend + '/api/requests')
//     const data = { description: description, tags: tags };
//     await axios.post(backend + '/api/request/new', data);
//     dispatch({ type: ADD_REQUEST, payload: data, payloadindex: getlength.data.length });
//   };
  

//   export const editRequestTags = (tags) => dispatch => {
//     const data = { tags }
//     dispatch({ type: EDIT_REQUEST_TAGS, payload: data });
//   };