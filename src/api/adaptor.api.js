import store from '../app/store';
import {auth, firestore} from '../firebase/Firebase';
import {setModalDefault, setImageList, setUserProfile} from '../app/slice';
import {getAuth, updateEmail, createUserWithEmailAndPassword, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth';

export const createUserWithEmailAndPasswordApi = (values) => {
    const {email, password} = values.user;
    const user = firestore.collection('user');

    // Authentication - createUserWithEmailAndPassword : 신규 사용자 등록
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signed in');
            const userInfo = userCredential.user;

            // 회원가입 완료 팝업 노출
            // if (userProfile.uid) setModalConfirm({show: true, type: 'join-success'});
            // Cloud Firestore : 신규 사용자 등록
            user.doc(userInfo.uid).set({...values.user, photoNum: '0',
                list: {
                    cart: [],
                    post: [],
                    purchase: []
                }
            }).then(() => console.log('Firestore 신규 사용자 등록'))
                .catch((error) => console.error(error, 'Firestore 신규 사용자 등록 실패'));
        })
        .catch((error) => {
            console.error('이메일 가입시 에러 : ', error);
            switch(error.code) {
                case 'auth/email-already-in-use':
                    console.log(error.code);
                    store.dispatch(setModalDefault({show: true, type: 'email-already-in-use'}));
                    break;
                default:
                    console.log(error.code);
                    store.dispatch(setModalDefault({show: true, type: 'join-fail'}));
                    break;
            }
        });
};

export const deleteUserApi = () => {
    const userProfile = store.getState().user.userProfile;
    const user = firestore.collection('user');
    const currentUser = auth.currentUser;
    const credential = EmailAuthProvider.credential(userProfile.email, userProfile.password);

    deleteUser(currentUser)
        .then(() => {
            console.log('이메일 계정 삭제시 성공');
            user.doc(userProfile.uid).delete()
                .then(() => console.log('Firestore 이메일 계정 삭제 성공'))
                .catch((error) => console.error(error, 'Firestore 이메일 계정 삭제 실패'))
        })
        .catch((error) => {
            console.error(error, '이메일 계정 삭제시 실패');
            reauthenticateWithCredential(currentUser, credential)
                .then(() => {
                    // 사용자 인증 완료 후, 재 호출
                    console.log('이메일 계정 삭제시 사용자 재인증 성공');
                    deleteUserApi();
                })
                .catch((error) => {
                    console.error(error, '이메일 계정 삭제시 사용자 재인증 실패');
                    store.dispatch(setModalDefault({show: true, type: "delete-fail"}));
                });
        });
};

export const updatePasswordApi = (password) => {
    const {current, newPw} = password;
    const userProfile = store.getState().user.userProfile;
    const user = firestore.collection('user');
    const currentUser = auth.currentUser;
    const credential = EmailAuthProvider.credential(userProfile.email, current)

    // Authentication - updatePassword : 사용자 비밀번호 설정
    updatePassword(currentUser, newPw)
        .then(() => {
            console.log('이메일 비밀번호 변경시 성공');
            // Cloud Firestore - update : 업데이트
            user.doc(userProfile.uid).update({password: newPw})
                .then(() => {
                    console.log('Firestore 이메일 비밀번호 변경시 성공');
                    store.dispatch(setModalDefault({show: true, type: 'pw-update-success'}));
                })
                .catch((error) => console.error(error, 'Firestore 이메일 비밀번호 변경시 실패'))
        })
        .catch((error) => {
            console.error(error, '이메일 비밀번호 변경시 실패');
            reauthenticateWithCredential(currentUser, credential)
                .then(() => {
                    // 사용자 인증 완료 후, 재 호출
                    console.log('이메일 비밀번호 변경시 사용자 재인증 성공');
                    console.log(password);
                    updatePasswordApi(password);
                })
                .catch((error) => {
                    console.error(error, '이메일 비밀번호 변경시 사용자 재인증 실패');
                    store.dispatch(setModalDefault({show: true, type: 'pw-update-fail'}));
                });
        });
};

export const updateProfileApi = (values) => {
    console.log(values);
    const {name, email, photo, birth, phone } = values.user;
    const userProfile = store.getState().user.userProfile;
    const user = firestore.collection('user');
    const currentUser = auth.currentUser;
    const credential = EmailAuthProvider.credential(userProfile.email, userProfile.password)

    // Authentication - updateEmail : 사용자의 이메일 주소 설정
    updateEmail(currentUser, email)
        .then(() => {
            console.log('이메일 업데이트시 성공');
            // Cloud Firestore - update : 업데이트
            user.doc(userProfile.uid).update({
                name,
                // email,
                photoNum: photo || '0',
                birth : birth || '',
                phone: phone || ''
            }).then(() => {
                console.log('Firestore 이메일 업데이트시 성공');
                store.dispatch(setModalDefault({show: true, type: 'profile-update-success'}));
                // 프로필 편집된 사용자 정보 불러오기
                reProfileApi();
            }).catch((error) => console.error(error, 'Firestore 이메일 업데이트시 실패'));
        })
        .catch((error) => {
            console.error(error, '이메일 업데이트시 실패');
            reauthenticateWithCredential(currentUser, credential)
                .then(() => {
                    // 사용자 인증 완료 후, 재 호출
                    console.log('🔥👀 이메일 업데이트시 사용자 재인증 성공 👀🔥');
                    console.log(values);
                    updateProfileApi(values);
                })
                .catch((error) => {
                    console.error(error, '이메일 업데이트시 사용자 재인증 실패');
                    store.dispatch(setModalDefault({show: true, type: 'profile-update-fail'}));
                });
        });
};

// 로그인 사용자 정보 가져오기
export const reProfileApi = (userId) => {
    const user = firestore.collection('user');
    const uid = userId || store.getState().user?.userProfile.uid;
    user.get().then((docs) => {
        docs.forEach((doc) => {
            if (doc.id === uid) store.dispatch(setUserProfile({...doc.data(), ...{uid}}))
        })
    }).catch((error) => console.error(error));
};

// 전체 포스트 가져오기 (수정 필요)
export const getPostApi = () => {
    let imageList = [];
    const post = firestore.collection('post');

    post.get().then((docs) => {
       docs.forEach((doc) => {
           if (doc.exists) {
               console.log(imageList.length);
               // 포스트 노출 (전체 - 총 10)
               imageList.length < 10 && imageList.push(doc.data());
           }
       })

        store.dispatch(setImageList(imageList));
    }).catch((error) => console.error(error));
};

export const uploadPostApi = (values) => {
    console.log('uploadPostApi');
    console.log(values);
    const userProfile = store.getState().user.userProfile;
    const user = firestore.collection('user');
    console.log({...userProfile, list: {...userProfile.list, post: [...userProfile.list.post, {url: values.photo[0].thumbUrl, id: '3', cat: values.cat}] }})

    user.doc(userProfile.uid).update({...userProfile, list: {...userProfile.list, post: [...userProfile.list.post, {url: values.photo[0].thumbUrl, id: '2', cat: values.cat}] }}).then(() => {
        console.log('Firestore 포스트 업데이트시 성공');
        reProfileApi();
    })
    // store.dispatch((setModalDefault({show: true, type: 'upload-post-success'})));
};
