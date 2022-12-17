import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';

import {firestore} from '../../firebase/Firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Default from "../../modal/Default";
import Confirm from "../../modal/Confirm";

const Simple = () => {
    const [defaultModal, setDefaultModal] = useState({
        show: false,
        type: ''
    });
    const [confirmModal, setConfirmModal] = useState({
        show: false,
        type: ''
    });

    // antd validateMessages object
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        }
    };

    // 회원가입 화면 진입
    useEffect(()=> {
        console.log("Simple Component");
    },[]);

    // Authentication Join
    const simpleCreateUser = async (values) => {
        const {email, password} = values;
        const userStore = firestore.collection("user");
        const auth = getAuth();
        // 1. 신규 사용자 가입
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user.uid) setConfirmModal({show: true, type: 'join-success'});
                console.log("createUserWithEmailAndPassword success ⭕️");
                userStore.doc(user.uid).set(values).then(r => console.log(r));
                // Todo agree, expired 필드 추가 여부 확인 필요
                userStore.doc(user.uid).update({phone: '', birth: '', photoUrl: 'https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_1280.png'});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("createUserWithEmailAndPassword error ❌");
                console.log(errorCode, errorMessage);
                if (errorCode === 'auth/email-already-in-use') {
                    setDefaultModal({show: true, type: 'email-already-in-use'});
                } else if (errorCode === 'auth/weak-password') {
                    setDefaultModal({show: true, type: 'weak-password'});
                }
            })

    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        simpleCreateUser(values).then((r) => console.log(r, "createUser"));
    };
    // Login failed
    const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

    return (
        <div className='simple-join'  style={{ paddingTop: '40px' }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                validateMessages={validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        }
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요." />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'email',
                            message: '이메일 형식에 맞게 작성해주세요.'
                        }
                    ]}
                >
                    <Input placeholder="이메일을 입력해주세요." />
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
                    <Input.Password placeholder="비밀번호를 입력해주세요." />
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
            {defaultModal.show && <Default defaultModal={defaultModal} setDefaultModal={setDefaultModal} />}
            {confirmModal.show && <Confirm confirmModal={confirmModal} setConfirmModal={setConfirmModal} />}
        </div>
    )
};
export default Simple;
