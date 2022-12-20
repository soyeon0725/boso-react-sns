import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';

import {firestore} from '../../firebase/Firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Default from "../../modal/Default";
import Confirm from "../../modal/Confirm";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {createUserWithEmailAndPasswordApi} from "../../api/adaptor";

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
        await createUserWithEmailAndPasswordApi(values);
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
                    <Input placeholder="이름을 입력해주세요." prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
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
            {defaultModal.show && <Default defaultModal={defaultModal} setDefaultModal={setDefaultModal} />}
            {confirmModal.show && <Confirm confirmModal={confirmModal} setConfirmModal={setConfirmModal} />}
        </div>
    )
};
export default Simple;
