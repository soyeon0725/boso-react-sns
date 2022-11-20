import React from 'react';
import {checkId, checkPassword, checkBirth, checkName, checkPhoneNumber} from '../utils/utilCommon';
import {firestore} from '../firebase/Firebase';
import './join.css'

import { Button, Checkbox, Form, Input, Radio, Collapse } from 'antd';
const { Panel } = Collapse;

const Join = () => {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

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

    const validateId = (_, value) => {
        if (!value || checkId(value)) {
            console.log('아이디 입력 성공')
            console.log(value)
            return Promise.resolve();
        } else {
            console.log('아이디 입력 실패')
            console.log(value)
            return Promise.reject(new Error(_.message));
        }
    }

    const validatePassword = (_, value) => {
        if (!value || checkPassword(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const validateName = (_, value) => {
        if (!value || checkName(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const validateBirth = (_, value) => {
        if (!value || checkBirth(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const validatePhone = (_, value) => {
        if (!value || checkPhoneNumber(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const genExtra = (key) => {
        return (
            <Checkbox value={key} onClick={(event) => event.stopPropagation()}/>
        );
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const user = firestore.collection("user");
        let existing = [];
        user.get().then((docs) => {
            docs.forEach((doc) => {
                existing.push(doc.id);
            })
            let isExisting = false;
            for (let i = 0; i < existing.length; i++) {
                if (values.user.id === existing[i]) {
                    console.log(`신규: ${values.user.id}, 기존: ${existing[i]}`)
                    isExisting = true;
                }
            }
            if (isExisting) alert('중복된 아이디입니다.');
            else user.doc(values.user.id).set(values.user);
        });
    };

    return (
        <div className="join-wrap">
            <h2>Join</h2>
            <Form
                {...layout}
                name="nest-messages"
                validateMessages={validateMessages}
                onFinish={onFinish}
            >
                <Form.Item
                    name={["user", "id"]}
                    label="id"
                    rules={[
                        {
                            required: true
                        },
                        {
                            message: '4~20자의 영문, 숫자와 특수문자 \'_\'만 사용해주세요.',
                            validator: validateId
                        }
                    ]}
                >
                    <Input placeholder="아이디를 입력해주세요." />
                </Form.Item>
                <Form.Item
                    name={["user", "password"]}
                    label="password"
                    rules={[
                        {
                            required: true
                        },
                        {
                            message: '최소 10자리 영문(대소문자), 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.',
                            validator: validatePassword
                        }
                    ]}
                >
                    <Input.Password placeholder="비밀번호를 입력해주세요." />
                </Form.Item>
                <Form.Item
                    name={["user", "name"]}
                    label="name"
                    rules={[
                        {
                            required: true
                        },
                        {
                            message: '이름에 숫자, 특수문자는 사용할 수 없습니다.',
                            validator: validateName
                        }
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요." />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="email"
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
                    <Input placeholder="이메일 형식에 맞게 작성해주세요." />
                </Form.Item>
                <Form.Item
                    name={["user", "birth"]}
                    label="birth"
                    rules={[
                        {
                            required: true
                        },
                        {
                            message: '생년월일은 \'YYYYMMDD\' 형식으로 숫자만 입력해주세요.',
                            validator: validateBirth
                        }
                    ]}
                >
                    <Input placeholder="생년월일을 입력해주세요." />
                </Form.Item>
                <Form.Item
                    name={["user", "phone"]}
                    label="phone"
                    rules={[
                        {
                            required: true
                        },
                        {
                            message: '\'-\'빼고 숫자만 입력해주세요.',
                            validator: validatePhone
                        }
                    ]}
                >
                    <Input placeholder="휴대폰을 입력해주세요." />
                </Form.Item>
                <Form.Item
                    name={["user", "agree"]}
                    label="agree"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Checkbox.Group>
                        <Collapse style={{width: '25em'}}>
                            <Panel showArrow={false} header="(필수) 개인회원 약관에 동의" key="1" extra={genExtra("A")}>
                                <p>개인회원 약관에 동의 (상세)</p>
                            </Panel>
                        </Collapse>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    name={["user", "expired"]}
                    label="expired"
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
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Join;
