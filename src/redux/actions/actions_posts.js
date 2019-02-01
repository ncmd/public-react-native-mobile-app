// import axios from 'axios';

// export const getPosts = () => async dispatch => {
//     const res = await axios.get(backend + '/api/posts')
//     console.log(res.data)
//     dispatch({ type: 'GET_POSTS', payload: res.data });
//   };
  
// export const addPost = (author, title, description, tags, objectives) => async dispatch => {
//     const data = { author: author, title: title, description: description, tags: tags, objectives: objectives };
//     await axios.post(backend + '/api/post/new', data);
//     dispatch({ type: ADD_POST });
//   };
  
// export const updatePost = (author, id, title, description, tags, objectives) => async dispatch => {
//     const data = { author: author, id: id, title: title, description: description, tags: tags, objectives: objectives };
//     await axios.post(backend + '/api/post/edit', data);
//     // auth.editRunbookFirestore(id)
//     dispatch({ type: UPDATE_POST });
//   };
  
  
//   export const getPost = (uri) => async dispatch => {
//     // // console.log("URI:",uri);
//     const res = await axios.get(backend + `${uri}`);
//     // console.log("RES",res)
//     dispatch({ type: GET_POST, payload: res.data });
//   }
  
//   export const editPost = (uri) => async dispatch => {
//     // console.log("URI:",uri);
//     const res = await axios.get(backend + `${uri}`);
//     dispatch({ type: GET_POST, payload: res.data });
//   }
  
//   export const starPost = (postid, username, starred, action, index) => async dispatch => {
//     auth.starRunbookFirestore(postid, username, action)
  
//     if (index !== null) {
//       dispatch({ type: STAR_POST, payloadindex: index, payloadaction: action, payloadusername: username });
//     } else if (index === null) {
//       dispatch({ type: STAR_POST_LOCAL, payloadaction: action, payloadusername: username });
//     }
  
//   }
  
//   export const removePost = () => async dispatch => {
//     const res = await axios.post(backend + '/api/post');
//     dispatch({ type: REMOVE_POST, payload: res.data });
//   };
  