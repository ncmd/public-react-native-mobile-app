import firebase from 'react-native-firebase';

export const createNewUser = (emailaddress, phonenumber) => async dispatch => {
    let ref = firebase.firestore().collection('users');
    ref.add({
        emailAddress: emailaddress,
        phoneNumber: phonenumber,
        emailVerified: false,
    })
}
