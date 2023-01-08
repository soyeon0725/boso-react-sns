import store from "../app/store";
import {setConfirmModal, setDefaultModal} from '../app/slice';
import { firestore } from '../firebase/Firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updatePassword
} from "firebase/auth";

// Firebase Authentication - 신규 사용자 등록
export const createUserWithEmailAndPasswordApi = (values) => {
    const {email, password} = values;
    const userStore = firestore.collection("user");
    const auth = getAuth();
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
                store.dispatch(setDefaultModal({show: true, type: 'email-already-in-use'}));
            } else {
                store.dispatch(setDefaultModal({show: true, type: 'join-fail'}));
            }
        });
};

// Firebase Authentication - 사용자 비밀번호 설정
export const updatePasswordApi = (password) => {
    // Authentication - updatePassword
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = password;

    // Cloud Firestore - doc update
    const userStore = firestore.collection("user");
    const currentUid = user.uid

    updatePassword(user, newPassword).then(() => {
        // Update successful.
        userStore.doc(currentUid).update({password}).then(() => {
            store.dispatch(setConfirmModal({show: true, type: 'change-password'}));
        })
    }).catch((error) => {
        // An error ocurred
        console.log(error);
    });
};
