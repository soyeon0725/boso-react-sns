import store from "../app/store";
import {setDefaultModal, setUserInfo, setPostList} from '../app/slice';
import { firestore } from '../firebase/Firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateEmail,
    updatePassword,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";

// Firebase API
export const createUserWithEmailAndPasswordApi = (values) => {
    const {email, password} = values;
    const userStore = firestore.collection("user");
    const auth = getAuth();
    // Authentication - createUserWithEmailAndPassword : 신규 사용자 등록
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // isUser = {...isUser, photoUrl: 'https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_1280.png'};
            // if (user.uid) setConfirmModal({show: true, type: 'join-success'});
            userStore.doc(user.uid).set({
                ...values,
                photoNum: '0'
            }).then(() => {});
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === 'auth/email-already-in-use') {
                store.dispatch(setDefaultModal({show: true, type: 'email-already-in-use'}));
            } else {
                store.dispatch(setDefaultModal({show: true, type: 'join-fail'}));
            }
        });
};


export const updatePasswordApi = (values) => {
    const { current, password } = values;
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = password;
    const userStore = firestore.collection("user");
    const uId = store.getState().joinInfo.userId;

    // Authentication - updatePassword : 사용자 비밀번호 설정
    updatePassword(user, newPassword).then(() => {
        console.log('비밀번호 변경 성공');
        // Cloud Firestore - update : 업데이트
        userStore.doc(uId).update({ password }).then(() => {
            console.log('Cloud store 비밀번호 변경 성공');
            getUserApi(); // 업데이트된 유저 정보 가져오기
            store.dispatch(setDefaultModal({show: true, type: 'change-password'}));
        })
    }).catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/requires-recent-login') {
            reAuthenticationApi(current);
        } else {
            // Todo errorCode 확인 후, 모달 팝업 연동 ?
            console.log('비밀번호 변경 실패');
            console.log(errorCode);
        }
    });
};

export const getUserApi = () => {
    const userStore = firestore.collection("user");
    const uId = store.getState().joinInfo.userId;

    // Cloud Firestore - get : 가져오기
    userStore.doc(uId).get().then((doc) => {
        console.log(doc.data()?.photoNum)
        store.dispatch(setUserInfo({
            name: doc.data()?.name,
            email: doc.data()?.email,
            password: doc.data()?.password,
            birth: doc.data()?.birth,
            phone: doc.data()?.phone,
            photoNum: doc.data()?.photoNum,
            list: doc.data()?.list,
        }))
    });
}

export const updateUserApi = ({ name, email, birth, phone, photo }) => {
    console.log(name, email, birth, photo);

    const auth = getAuth();
    const userStore = firestore.collection("user");
    const uId = store.getState().joinInfo.userId;
    const password = store.getState().joinInfo.userInfo.password;

    // Authentication - updateEmail : 사용자의 이메일 주소 설정
    updateEmail(auth.currentUser, email).then(() => {
        console.log('Email updated success!');
        // Cloud Firestore - update : 업데이트
        userStore.doc(uId).update({
            name,
            email,
            birth: birth || '',
            phone: phone || '',
            photoNum: photo || '0'
        }).then(() => {
            console.log('Cloud store 업데이트 성공');
            getUserApi(); // 업데이트된 유저 정보 가져오기
            store.dispatch(setDefaultModal({show: true, type: 'change-profile'}));
        });
    }).catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/requires-recent-login') {
            reAuthenticationApi(password);
        } else {
            // Todo errorCode 확인 후, 모달 팝업 연동 ?
            console.log('updateEmail fail');
            console.log(errorCode);
        }
    });
}

export const deleteUserApi = (password) => {
    console.log(password)
    const auth = getAuth();
    const user = auth.currentUser;
    const userStore = firestore.collection("user");
    const uId = store.getState().joinInfo.userId;

    deleteUser(user)
        .then(() => {
            console.log('계정 삭제 성공');
            userStore.doc(uId).delete().then(() => {
                console.log('Cloud store 계정 삭제 성공');
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/requires-recent-login') {
                reAuthenticationApi(password);
            } else {
                // Todo errorCode 확인 후, 모달 팝업 연동 ?
                console.log('계정 삭제 실패');
                console.log(errorCode);
            }
        });
}

export const reAuthenticationApi = (password) => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(password);
    const credential = EmailAuthProvider.credential(user.email, password);

    reauthenticateWithCredential(user, credential).then(() => {
        console.log('사용자 재인증 완료');
        deleteUserApi();
    }).catch((error) => {
        // Todo errorCode 확인 후, 모달 팝업 연동 ?
        const errorCode = error.code;
        console.log('사용자 재인증 실패');
        console.log(errorCode);
    });
}

export const getPostApi = () => {
    const postStore = firestore.collection("post");
    const uId = store.getState().joinInfo.userId;

    // Cloud Firestore - get : 가져오기
    let imageList = [];
    postStore.get().then((docs) => {
       docs.forEach((doc) => {
           if (doc.exists) {
               // document의 데이터
               // console.log(doc.data());
               // document의 id
               // console.log(doc.id);
               console.log(imageList.length)
               // 포스트 노출 (전체 - 총 10)
               imageList.length < 10 && imageList.push(doc.data());
               // return imageList;

           }
       })
        console.log(imageList);
        store.dispatch(setPostList(imageList))
    });

}
