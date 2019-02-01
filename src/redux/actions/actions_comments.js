// import axios from 'axios';
// import { auth } from '../../components/firebase'
// import {
//   ADD_COMMENT,
//   REPLY_COMMENT,
//   DELETE_COMMENT,
// } from './types';


// export const deleteReplyCommentFirestore = (postid,commentid) => async dispatch => {
//   const data = await auth.deleteReplyCommentFirestore(postid,commentid)
//   dispatch({ type: DELETE_COMMENT, payload: data})
// }

// export const replyCommentInPostFirestore = (postid, commentid, commentdata) => async dispatch => {
//   const data = await auth.replyCommentFirestore(postid, commentid, commentdata)
//   dispatch({ type: REPLY_COMMENT, payload: data })
// }

// export const addCommentToPostFirestore = (postid,commentdata) => async dispatch => {
//   const data = await auth.addCommentFirestore(postid,commentdata)
//   dispatch({ type: ADD_COMMENT, payload: data })
// }