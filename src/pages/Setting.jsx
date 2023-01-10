import {useEffect, useState} from "react";

import { Tabs, Button, Form, Input } from 'antd';
import {LockOutlined} from "@ant-design/icons";

import {checkPassword} from "../utils/utilCommon";
import {updatePasswordApi} from "../api/adaptor.api";
import {firestore} from "../firebase/Firebase";
import {getAuth, EmailAuthProvider, reauthenticateWithCredential, deleteUser, signOut} from "firebase/auth";

const Setting = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [currentPassword, setCurrentPassword] = useState('');

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    };

    useEffect(() => {
        const userStore = firestore.collection("user");
        const auth = getAuth();
        const user = auth.currentUser;
        const currentUid = user.uid;
        userStore.doc(currentUid).get().then((doc) => {
            setCurrentPassword(doc.data()?.password);
        });
    }, []);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { password } = values;
        userAuthentication(password);
    };

    // Firebase Authentication - 사용자 재인증
    const userAuthentication = type => {
        console.log(type)
        console.log(currentPassword)
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        );
        reauthenticateWithCredential(user, credential).then((r) => {
            // User re-authenticated.
            if (type === 'deleteAccount') {
                console.log('deleteAccount')
                const userStore = firestore.collection("user");
                deleteUser(user).then((r) => {
                    // User deleted.
                    console.log(r);
                    userStore.doc(user.uid).delete().then(r => {
                        // Todo 모달 팝업 연동 여부 체크
                        signOut(auth).then(() => {
                            // Sign-out successful.
                            console.log('signOut ⭕️')
                        }).catch((error) => {
                            // An error happened.
                            console.log('signOut ❌️')
                        });
                    });
                }).catch((error) => {
                    // An error ocurred
                    console.log(error);
                });
            } else {
                updatePasswordApi(type);
            }
        }).catch((error) => {
            // An error ocurred
            console.log(error);
        });
    }

    // const deleteAccount = () => userAuthentication('deleteAccount');

    const onChange = (key) => console.log(key);

    return (
        <Tabs
            size='large'
            tabBarGutter={100}
            defaultActiveKey="1"
            centered
            onChange={onChange}
            items={[
                {
                    label: `비밀번호 변경`,
                    key: '1',
                    children: (
                        <Form
                            {...formItemLayout}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="current"
                                label="Current Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value || (value === currentPassword)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('최소 10자리 영문(대소문자), 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.'));
                                        }
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="현재 비밀번호를 입력해주세요." prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="New Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value || (value !== currentPassword && checkPassword(value))) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('최소 10자리 영문(대소문자), 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.'));
                                        }
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="새 비밀번호를 입력해주세요." prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm New Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || (getFieldValue('password') === value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="새 비밀번호를 다시 입력해주세요." prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                            </Form.Item>

                            <Form.Item wrapperCol={{...formItemLayout.wrapperCol, offset: 8}}>
                                <Button type="primary" htmlType="submit">
                                    비밀번호 변경
                                </Button>
                            </Form.Item>
                        </Form>
                    ),
                },
                {
                    label: `회원 탈퇴`,
                    key: '2',
                    children: (
                        <div style={{display: 'grid', justifyContent: 'center'}}>
                            <p style={{marginBottom: '5px'}}>
                                <b >계정 삭제는 영구적입니다.</b>
                            </p>
                            <p>
                                회원님의 프로필, 사진, 동영상, 댓글, 좋아요 및 팔로워가<br />
                                영구적으로 삭제됩니다.
                            </p>
                            <Button type="primary" htmlType="submit" onClick={() => userAuthentication('deleteAccount')}>
                                계정 삭제
                            </Button>
                        </div>
                    ),
                },
            ]}
        />
    )
}
export default Setting;
