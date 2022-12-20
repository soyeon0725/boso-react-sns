import store from "../app/store";
import {setList} from "../app/slice"
import {useState} from 'react';
import { firestore } from '../firebase/Firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const createUserWithEmailAndPasswordApi = (values) => {
    const {email, password} = values;
    const userStore = firestore.collection("user");
    const auth = getAuth();
    console.log(values);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("createUserWithEmailAndPassword success ⭕️");
            // isUser = {...isUser, photoUrl: 'https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_1280.png'};
            // if (user.uid) setConfirmModal({show: true, type: 'join-success'});
            userStore.doc(user.uid).set({
                ...values,
                photoUrl: 'https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_1280.png'
            }).then(r => console.log(r));
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("createUserWithEmailAndPassword error ❌");
            console.log(errorCode, errorMessage);
            if (errorCode === 'auth/email-already-in-use') {
                // setDefaultModal({show: true, type: 'email-already-in-use'});
            } else {
                // setDefaultModal({show: true, type: 'join-fail'});
            }
        });
};
