import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setPersonalInfo, setIsLoggedIn} from "../app/slice";

import { firestore } from "../firebase/Firebase";
import { Button, Form, Input } from 'antd';
import Default from "../modal/Default";

// firebase 이메일 & 비밀번호 로그인 연동
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [defaultModal, setDefaultModal] = useState({show: false, type: ''});

    useEffect(()=> {
        console.log("Login PAGE");
    },[]);

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

    // 이메일 & 비밀먼호 회원가입 및 로그인
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        }
    };

    // 이메일 & 비밀번호 로그인 테스트 (12/6)
    const auth = getAuth();
    const [login, setLogin] = useState('');

    const createUser = value => {
        const {email, password} = value;
        // 1. 신규 사용자 가입
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("신규 사용자 가입 성공");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("신규 사용자 가입 실패");
                console.log(errorCode, errorMessage);
            })
    };
    const signIn = value => {
        console.log(value);
        const {email, password} = value;
        // 2. 기존 사용자 로그인
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("기존 사용자 로그인 성공");
                console.log(user);
                dispatch(setPersonalInfo({
                    email,
                    password
                }));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("기존 사용자 로그인 실패");
                console.log(errorCode, errorMessage);
            });
    };
    // 3. 인증 상태 관찰자 설정 및 사용자 데이터 가져오기 > App.js
    const logOut = e => {
        e.preventDefault();
        // 4. 사용자를 로그아웃하려면 signOut 을 호출
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('로그아웃 성공');
        }).catch((error) => {
            // An error happened.
            console.log('로그아웃 실패');
        });
    };

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
            <div>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    validateMessages={validateMessages}
                    onFinish={createUser}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'email',
                            }
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
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
                    onFinish={signIn}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'email',
                            }
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                user login : {login}
            </div>
            <button onClick={logOut}>Logout</button>
        </>

    );
};
export default Login;
