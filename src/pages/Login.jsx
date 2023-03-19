import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setModalDefault} from '../app/slice';
import {Button, Form, Input} from 'antd';
import {
    LockOutlined,
    UserAddOutlined,
    MailOutlined,
    GithubOutlined,
    GoogleOutlined,
    MessageOutlined,
    ReadOutlined
} from '@ant-design/icons';

// firebase 이메일 & 비밀번호 로그인 연동
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import {firestore} from "../firebase/Firebase";

const loginFormStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    paddingTop: '40px'
};

const iconStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
};

const loginIconsWrap = {
    display: 'flex',
    justifyContent: 'center'
};

const loginIconStyle = {
    color: '#1890ff',
    fontSize: '24px'
};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = getAuth();

    // 로그인 화면 진입
    useEffect(()=> {
        console.log('Login 화면');
    },[]);

    // antd layout object
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    // Authentication - signInWithEmailAndPassword : 기존 사용자 로그인
    const signInApi = async (value) => {
        const {email, password} = value;

        // 2. 기존 사용자 로그인
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log('기존 사용자 로그인 API 성공');
                // .then((userCredential) => {
                //     // Signed in
                //     const user = userCredential.user;
                //     console.log(user, '기존 사용자 로그인 API 성공');
                // })
        } catch (error) {
            console.error(error, '기존 사용자 로그인 API 실패');
            switch (error.code) {
                case 'auth/user-not-found':
                    dispatch(setModalDefault({show: true, type: 'user-not-found'}));
                    break;
                case 'auth/wrong-password':
                    dispatch(setModalDefault({show: true, type: 'wrong-password'}));
                    break;
                default:
                    dispatch(setModalDefault({show: true, type: 'login-fail'}));
                    break;
            };
        };
    };

    const handleGoogleLogin = () => {
        console.log('handleGoogleLogin');
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider) // popup을 이용한 signup
            .then((data) => {
                console.log(data) // console로 들어온 데이터 표시
                console.log(data.user);
                const user = firestore.collection('user');
                const uid = data.user.uid;
                const userInfo = {
                    name: data.user.displayName,
                    email: data.user.email,
                    photoNum: '0',
                    list: {
                        cart: [],
                        post: [],
                        purchase: []
                    }
                }
                console.log(uid, userInfo)
                user.doc(uid).set(userInfo)
                    .then(() => console.log('Firestore 신규 사용자 등록'))
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });

    }

    // Login failed
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                {...layout}
                name='normal_login'
                style={loginFormStyle}
                initialValues={{
                    remember: true,
                }}
                onFinish={signInApi}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: '이메일을 입력해주세요.'
                        },
                        {
                            type: 'email',
                            message: '이메일 형식에 맞게 작성해주세요.',
                        },
                    ]}
                >
                    <Input placeholder='이메일을 입력해주세요.' prefix={<MailOutlined style={iconStyle} />} />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='비밀번호를 입력해주세요.'
                        type='password'
                        autoComplete='on'
                        prefix={<LockOutlined style={iconStyle} />} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 6
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <div className='login-icons' style={loginIconsWrap}>
                <Button
                    size='large'
                    shape='circle'
                    icon={<UserAddOutlined  style={loginIconStyle} />}
                    onClick={() => navigate('/join/detail')}
                />
                <Button
                    style={{marginLeft: '10px'}}
                    size='large'
                    shape='circle'
                    icon={<MailOutlined style={loginIconStyle} />}
                    onClick={() => navigate('/join/simple')}
                />
                <Button
                    style={{marginLeft: '10px'}}
                    size='large'
                    shape='circle'
                    icon={<GithubOutlined  style={loginIconStyle} />}
                    onClick={handleGoogleLogin}
                />
                <Button
                    style={{marginLeft: '10px'}}
                    size='large'
                    shape='circle'
                    icon={<GoogleOutlined  style={loginIconStyle} />}
                />
                <Button
                    style={{marginLeft: '10px'}}
                    size='large'
                    shape='circle'
                    icon={<MessageOutlined  style={loginIconStyle} />}
                />
                <Button
                    style={{marginLeft: '10px'}}
                    size='large'
                    shape='circle'
                    icon={<ReadOutlined  style={loginIconStyle} />}
                />
            </div>
        </>
    );
};
export default Login;
