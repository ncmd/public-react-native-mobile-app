// import axios from 'axios';

// export const unsubscribeAccount = (subscriptionid) => async dispatch => {
//     const data = { stripeSubscriptionId: subscriptionid }
//     await axios.post(backend + '/api/account/unsubscribe', data)
// }

// export const getStripeCustomerID = (email) => async dispatch => {
//     const data = { email: email }
//     const res = await axios.get(backend + '/api/user/customerid', data)
//     dispatch({ type: SET_STRIPE_CUSTOMERID, payload: res.data.id })
// }

// export const stripePaymentStatus = (status) => async dispatch => {
//     dispatch({ type: SET_STRIPE_PAYMENT_STATUS, payload: status })
// }

// export const updateFirebaseAccountsWithStripeCustomerId = (accountid, customerid) => async disptach => {
//     const data = { accountid: accountid, customerid: customerid }
//     await axios.post(backend + '/api/accounts/update', data)
// }

// export const setPlan = (plan) => async dispatch => {
//     const data = { plan: plan };
//     dispatch({ type: SET_PLAN, payload: data });
// };

// export const setStripeProgress = (value) => dispatch => {
//     dispatch({ type: SET_STRIPE_PROGRESS, payload: value })
// }

// export const addSubscriber = (email) => async dispatch => {
//     const data = { email: email };
//     const res = await axios.post(backend + '/api/subscribe/new', data);
//     // console.log("Add Sub Response:",res)
//     dispatch({ type: ADD_SUBSCRIBER, payload: res.data });
//   };

// export const setStripeModal = () => dispatch => {
//     dispatch({ type: SET_STRIPE_MODAL })
// }
