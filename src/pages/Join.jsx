import { useState } from 'react';
import {firestore} from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import {checkId, checkPassword, checkBirth, checkName, checkPhoneNumber} from '../utils/utilCommon';

import './join.css'

import {Button, Checkbox, Form, Input, Radio, Collapse, Row, Col} from 'antd';
const { Panel } = Collapse;

const Join = () => {
    const [form] = Form.useForm();
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const user = firestore.collection("user");

    const layout = {
        labelCol: { span: 8 },
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

    const onDuplicationCheck = () => {
        if (userId === "") alert("아이디를 입력해주세요.");
        else {
            console.log("ddd")
            let existing = [];
            user.get().then((docs) => {
                docs.forEach((doc) => {
                    existing.push(doc.id);
                })
                let isExisting = false;
                for (let i = 0; i < existing.length; i++) {
                    if (userId === existing[i]) {
                        console.log(`신규: ${userId}, 기존: ${existing[i]}`)
                        isExisting = true;
                    }
                }
                if (isExisting) alert("중복된 아이디입니다.");
                else alert("사용 가능한 아이디입니다.");
            });
        }
    };

    const validatePassword = (_, value) => {
        if (!value || checkPassword(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('최소 10자리 영문(대소문자), 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.'));
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

    const genExtra = key => {
        return <Checkbox value={key} onClick={(event) => event.stopPropagation()}/>;
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
        user.doc(values.user.id).set(values.user);
        navigate('/login');
    };

    const onReset = () => form.resetFields();

    return (
        <div className="join-wrap">
            <Form
                {...layout}
                name="nest-messages"
                form={form}
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
                            validator: (_, value) => {
                                if (!value || checkId(value)) {
                                    console.log(value + " : '' 일 때 성공 처리 맞음?");
                                    setUserId(value);
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('4~20자의 영문, 숫자와 특수문자 \'_\'만 사용해주세요.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="아이디를 입력해주세요." />
                    <Button htmlType="button" onClick={onDuplicationCheck}>중복체크</Button>
                </Form.Item>
                <Form.Item
                    name={["user", "password"]}
                    label="password"
                    rules={[
                        {
                            required: true
                        },
                        {
                            validator: validatePassword
                        }
                    ]}
                >
                    <Input placeholder="비밀번호를 입력해주세요." />
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
                        <Collapse style={{width: '20em'}}>
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
                <Form.Item wrapperCol={{ span: 24 }} style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Join;
