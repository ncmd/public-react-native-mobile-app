import firebase from 'react-native-firebase';

export const getStocksAllDocuments = () => {
    let ref = firebase.firestore().collection('stocks');
    ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          return (doc.data());
      });
  });
  }
  