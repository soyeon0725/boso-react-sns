import {useState} from "react";
import { useNavigate } from "react-router-dom";

import { firestore } from "../firebase/Firebase";
import { Button, Form, Input } from 'antd';
import Default from "../modal/Default";

const Login = () => {
    const navigate = useNavigate();
    const [defaultModal, setDefaultModal] = useState({show: false, type: ''});

    const onFinish = (values) => {
        console.log('Success:', values);
        const user = firestore.collection("user");
        let userList = [{
            id: '',
            password: ''
        }];
        user.get().then((docs) => {
            docs.forEach((doc) => {
                userList.push({
                    id: doc.data().id,
                    password: doc.data().password
                });
            })
            let isUser = false;
            for (let i = 0; i < userList.length; i++) {
                if (values.username === userList[i].id && values.password === userList[i].password) {
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
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const goToJoin = () => navigate('/join');
    return (
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
                {defaultModal && <Default defaultModal={defaultModal} setDefaultModal={setDefaultModal} />}
            </Form>
        </div>
    );
};
export default Login;
