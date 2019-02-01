// import axios from 'axios';

// export const filterPostByTagAction = (filtertagname) => async dispatch => {
//     const data = await auth.filterPostByTag(filtertagname)
//     dispatch({ type: FILTERED_POSTS, payload: data })
//   }
  
//   export const searchBox = (data) => dispatch => {
//     dispatch({ type: SEARCH_BOX, payload: data })
//   }
  

// // Need to adjust performance
// export const getTags = () => async dispatch => {
//     const res = await axios.get(backend + '/api/posts')
//     let allTags = []
//     res.data.map((post) => {
//       post.tags.map((tag) => {
//         if (allTags.indexOf(tag) <= -1) {
//           allTags.push(tag)
//         }
  
//         return null
//       })
//       return null
//     })
//     dispatch({ type: SET_TAGS, payload: allTags })
//     return res.data
//   }