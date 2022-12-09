import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setPersonalInfo} from "../app/slice";

import { firestore } from "../firebase/Firebase";
import { Button, Form, Input } from 'antd';
import Default from "../modal/Default";

// firebase 이메일 & 비밀번호 로그인 연동
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [defaultModal, setDefaultModal] = useState({show: false, type: ''});

    const onFinish = (values) => {
        console.log('Success:', values);
        const user = firestore.collection("user");
        let userList = [];
        user.get().then((docs) => {
            docs.forEach((doc) => {
                userList.push({
                    id: doc.data().id,
                    password: doc.data().password,
                    email: doc.data().email,
                    photoUrl: doc.data().photoUrl
                });
            })
            let isUser = false;
            for (let i = 0; i < userList.length; i++) {
                if (values.username === userList[i].id && values.password === userList[i].password) {
                    dispatch(setPersonalInfo({
                        id: userList[i].id,
                        email: userList[i].email,
                        photoUrl: userList[i].photoUrl
                    }));
                    isUser = true;
                }
            }
            if (isUser) navigate("/main");
            else {
                console.log("로그인 실패");
                setDefaultModal({show: true, type: 'login-fail'});
            };
        });
    };
    const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);
    const goToJoin = () => navigate('/join');

    // 이메일 & 비밀번호 로그인 테스트 (12/6)
    // const auth = getAuth();
    //
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    // const [userPw, setUserPw] = useState('');
    // const [login, setLogin] = useState('');
    //
    // const onChangeEmail = e => setEmail(e.target.value);
    // const onChangePw = e => setPassword(e.target.value);
    // const ChangeUserEmail = e => setUserEmail(e.target.value);
    // const ChangeUserPw = e => setUserPw(e.target.value);
    //
    // const createUser = e => {
    //     e.preventDefault();
    //
    //     // 1. 신규 사용자 가입
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in
    //             const user = userCredential.user;
    //             console.log("신규 사용자 가입 성공");
    //             console.log(user);
    //             setEmail('');
    //             setPassword('');
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log("신규 사용자 가입 실패");
    //             console.log(errorCode, errorMessage);
    //         })
    // };
    // const signIn = e => {
    //     e.preventDefault();
    //     // 2. 기존 사용자 로그인
    //     signInWithEmailAndPassword(auth, userEmail, userPw)
    //         .then((userCredential) => {
    //             // Signed in
    //             const user = userCredential.user;
    //             console.log("기존 사용자 로그인 성공");
    //             console.log(user);
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log("기존 사용자 로그인 실패");
    //             console.log(errorCode, errorMessage);
    //         });
    // };
    // // 3. 인증 상태 관찰자 설정 및 사용자 데이터 가져오기
    // // 임시로 useEffect 처리
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             const uid = user.uid;
    //             console.log("로그인 상태");
    //             setLogin(user.email);
    //         } else {
    //             // User is signed out
    //             console.log("로그아웃 상태");
    //             setLogin('');
    //         }
    //     });
    // }, []);
    // const logOut = e => {
    //     e.preventDefault();
    //     // 4. 사용자를 로그아웃하려면 signOut 을 호출
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //         console.log('로그아웃 성공');
    //     }).catch((error) => {
    //         // An error happened.
    //         console.log('로그아웃 실패');
    //     });
    // };

    return (
        <>
            <div style={{ paddingTop: '50px' }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="link" htmlType="button" onClick={goToJoin}>
                            register now!
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    {defaultModal.show && <Default defaultModal={defaultModal} setDefaultModal={setDefaultModal} />}
                </Form>
            </div>
            {/*<div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="email">Email</label>*/}
            {/*        <input*/}
            {/*            type="email"*/}
            {/*            id="email"*/}
            {/*            value={email}*/}
            {/*            onChange={onChangeEmail}*/}
            {/*        />*/}
            {/*        <label htmlFor="password">Password</label>*/}
            {/*        <input*/}
            {/*            type="password"*/}
            {/*            id="password"*/}
            {/*            value={password}*/}
            {/*            onChange={onChangePw}*/}
            {/*        />*/}
            {/*        <button onClick={createUser}>click</button>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="email">userEmail</label>*/}
            {/*        <input*/}
            {/*            type="email"*/}
            {/*            id="email"*/}
            {/*            value={userEmail}*/}
            {/*            onChange={ChangeUserEmail}*/}
            {/*        />*/}
            {/*        <label htmlFor="password">userPassword</label>*/}
            {/*        <input*/}
            {/*            type="password"*/}
            {/*            id="password"*/}
            {/*            value={userPw}*/}
            {/*            onChange={ChangeUserPw}*/}
            {/*        />*/}
            {/*        <button onClick={signIn}>Login</button>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        user login : {login}*/}
            {/*    </div>*/}
            {/*    <button onClick={logOut}>Logout</button>*/}
            {/*</div>*/}
        </>

    );
};
export default Login;
