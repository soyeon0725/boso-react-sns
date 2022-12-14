import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPersonalInfo } from '../app/slice';

import { Button, Form, Input } from 'antd';
import {
    UserAddOutlined,
    MailOutlined,
    GithubOutlined,
    GoogleOutlined,
    MessageOutlined,
    ReadOutlined
} from '@ant-design/icons';
import Default from '../modal/Default';

import { firestore } from '../firebase/Firebase';
// firebase 이메일 & 비밀번호 로그인 연동
import {
    getAuth, // 사용자 인증 정보
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [defaultModal, setDefaultModal] = useState({
        show: false,
        type: ''
    });

    // 로그인 화면 진입
    useEffect(()=> {
        console.log("Login PAGE");
    },[]);

    // firestore Login
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
                console.log("아이디와 비번 불일치");
                setDefaultModal({show: true, type: 'login-fail'});
            };
        });
    };
    // Login failed
    const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

    // Authentication Login With Email And Password (12/6)
    const auth = getAuth();
    // Authentication Login
    const signIn = async (value) => {
        const {email, password} = value;
        // 2. 기존 사용자 로그인
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("signInWithEmailAndPassword success ⭕");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("signInWithEmailAndPassword error ❌");
                console.log(errorCode, errorMessage);
            });
    };

    // route
    const signUp = () => navigate('/join');
    const simpleSignUp = () => navigate('/simple-join');

    return (
        <>
            <div style={{ paddingTop: '40px' }}>
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
                    autoComplete="on"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Email is not a valid email!',
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
            <div className='login-icons' style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    size="large"
                    shape="circle"
                    icon={<UserAddOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                    onClick={signUp}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<MailOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                    onClick={simpleSignUp}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<GithubOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<GoogleOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<MessageOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<ReadOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
            </div>
            {defaultModal.show && <Default defaultModal={defaultModal} setDefaultModal={setDefaultModal} />}
        </>
    );
};
export default Login;
