import axios from 'axios';
import {
  // GET_POSTS,
  GET_POST,
  ADD_POST,
  STAR_POST,
  ADD_REQUEST,
  ADD_ACTIVITY,
  REMOVE_POST,
  UPDATE_POST,
} from './types';

// Action Creator, call Golang RestAPI, uses Dispatch Redux to send to store
export const getPosts = () => async dispatch => {
  const res = await axios.get(backend + '/api/posts')
  console.log(res.data)
  dispatch({ type: 'GET_POSTS', payload: res.data });
};


export const addPost = (author, title, description, tags, objectives) => async dispatch => {
  const data = { author: author, title: title, description: description, tags: tags, objectives: objectives };
  await axios.post(backend + '/api/post/new', data);
  dispatch({ type: ADD_POST });
};

export const getPost = (uri) => async dispatch => {
  // // console.log("URI:",uri);
  const res = await axios.get(backend + `${uri}`);
  // console.log("RES",res)
  dispatch({ type: GET_POST, payload: res.data });
}

export const editPost = (uri) => async dispatch => {
  // console.log("URI:",uri);
  const res = await axios.get(backend + `${uri}`);
  dispatch({ type: GET_POST, payload: res.data });
}

export const starPost = (postid, username, starred, action, index) => async dispatch => {
  auth.starRunbookFirestore(postid, username, action)

  if (index !== null) {
    dispatch({ type: STAR_POST, payloadindex: index, payloadaction: action, payloadusername: username });
  } else if (index === null) {
    dispatch({ type: STAR_POST_LOCAL, payloadaction: action, payloadusername: username });
  }

}

export const removePost = () => async dispatch => {
  const res = await axios.post(backend + '/api/post');
  dispatch({ type: REMOVE_POST, payload: res.data });
};
