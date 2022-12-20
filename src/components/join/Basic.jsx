import { useEffect, useState } from 'react';

import { Button, Checkbox, Form, Input, Radio, Collapse } from 'antd';

import {
    checkPassword,
    checkBirth,
    checkName,
    checkPhoneNumber
} from '../../utils/utilCommon';
import Default from '../../modal/Default';
import Confirm from '../../modal/Confirm';


import {LockOutlined, MailOutlined, UserOutlined, PhoneOutlined, GiftOutlined} from "@ant-design/icons";
import {createUserWithEmailAndPasswordApi, JoinAndLoginApi} from "../../api/adaptor";

const Join = () => {
    const { Panel } = Collapse;
    const [defaultModal, setDefaultModal] = useState({
        show: false,
        type: ''
    });
    const [confirmModal, setConfirmModal] = useState({
        show: false,
        type: ''
    });

    // antd layout
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    };

    // antd validateMessages object
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    // 회원가입 화면 진입
    useEffect(()=> {
        console.log("Basic Component");
    },[]);

    const genExtra = key => <Checkbox value={key} onClick={(event) => event.stopPropagation()} />;

    // Authentication Join
    const createUser = async (values) => {
        console.log(values)

        // 1. 신규 사용자 가입
        await createUserWithEmailAndPasswordApi(values);
    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        createUser(values.user).then((r) => console.log(r, "createUser"));
    };
    const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

    return (
        <div className='basic-join' style={{ paddingTop: '40px' }}>
            <Form
                {...layout}
                name="nest-messages"
                validateMessages={validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name={["user", "name"]}
                    label="Name"
                    rules={[
                        {
                            required: true
                        },
                        {
                            validator: (_, value) => {
                                if (!value || checkName(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('이름에 숫자, 특수문자는 사용할 수 없습니다.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요." prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            required: true
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
                    name={["user", "password"]}
                    label="Password"
                    rules={[
                        {
                            required: true
                        },
                        {
                            validator: (_, value) => {
                                if (!value || checkPassword(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('최소 10자리 영문(대소문자), 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.'));
                            }
                        }
                    ]}
                >
                    <Input.Password placeholder="비밀번호를 입력해주세요." prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={["user", "birth"]}
                    label="Birth"
                    rules={[
                        {
                            required: true
                        },
                        {
                            validator: (_, value) => {
                                if (!value || checkBirth(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('생년월일은 \'YYYYMMDD\' 형식으로 숫자만 입력해주세요.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="생년월일을 입력해주세요." prefix={<GiftOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={["user", "phone"]}
                    label="Phone"
                    rules={[
                        {
                            required: true
                        },
                        {
                            validator: (_, value) => {
                                if (!value || checkPhoneNumber(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('\'-\'빼고 숫자만 입력해주세요.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="휴대폰을 입력해주세요." prefix={<PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={["user", "agree"]}
                    label="Agree"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Checkbox.Group>
                        <Collapse style={{width: '26em'}}>
                            <Panel showArrow={false} header="(필수) 개인회원 약관에 동의" key="1" extra={genExtra("A")}>
                                <p>개인회원 약관에 동의 (상세)</p>
                            </Panel>
                        </Collapse>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    name={["user", "expired"]}
                    label="Expired"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Radio.Group>
                        <Radio value="1">1년</Radio>
                        <Radio value="3">3년</Radio>
                        <Radio value="5">5년</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {defaultModal.show && <Default defaultModal={defaultModal} setDefaultModal={setDefaultModal} />}
            {confirmModal.show && <Confirm confirmModal={confirmModal} setConfirmModal={setConfirmModal} />}
        </div>
    )
}
export default Join;
