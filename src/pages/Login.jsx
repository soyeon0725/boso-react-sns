import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    UserAddOutlined,
    MailOutlined,
    IdcardOutlined,
    GithubOutlined,
    GoogleOutlined,
    MessageOutlined,
    ReadOutlined
} from '@ant-design/icons';
import Default from '../modal/Default';

// firebase 이메일 & 비밀번호 로그인 연동
import {
    getAuth, // 사용자 인증 정보
    signInWithEmailAndPassword
} from "firebase/auth";


const Login = () => {
    const navigate = useNavigate();
    const [defaultModal, setDefaultModal] = useState({
        show: false,
        type: ''
    });

    // 로그인 화면 진입
    useEffect(()=> {
        console.log("Login PAGE");
    },[]);

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
                console.log(errorCode);
                console.log(errorMessage);
                // setDefaultModal({show: true, type: 'login-fail'});
            });
    };

    // route
    const basicJoin = () => navigate('/join', {state: { join: 'basic' }});
    const simpleJoin = () => navigate('/join', {state: { join: 'simple' }});

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
                        <Input placeholder="이메일을 입력해주세요." prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
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
                        <Input.Password placeholder="비밀번호를 입력해주세요." prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
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
                    onClick={basicJoin}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<IdcardOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                    onClick={simpleJoin}
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
