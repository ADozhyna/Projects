import * as firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCGCkmr67quRC2gFhEby7T1OE_fpa0oQLk",
    authDomain: "piskel-f72fe.firebaseapp.com",
    databaseURL: "https://piskel-f72fe.firebaseio.com",
    projectId: "piskel-f72fe",
    storageBucket: "piskel-f72fe.appspot.com",
    messagingSenderId: "793207060064",
    appId: "1:793207060064:web:0c99ae46ca575aea62b505"
};

firebase.initializeApp(firebaseConfig);

export default document.querySelector('.sign-in').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        const { user } = result;
        document.querySelector('.display-name').innerText = `Hello, ${user.displayName}!`;
    });
});

