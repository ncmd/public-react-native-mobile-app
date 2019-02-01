// import axios from 'axios';

// export const setPath = (path) => dispatch => {
//     // console.log("This Path:",path)
//     const data = { path: path }
//     dispatch({ type: SET_PATH, payload: data })
// }

// export const pingBackend = () => async dispatch => {
//     await axios.get(backend + '/api/ping').then((response) => {
//         dispatch({ type: PING_BACKEND, payload: 'up' });
//     }).catch((response) => {
//         if (response.status === undefined) {
//             dispatch({ type: PING_BACKEND, payload: "down" });
//         }
//     });
// };
