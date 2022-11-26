import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase/Firebase';

import {checkId, checkPassword, checkBirth, checkName, checkPhoneNumber} from '../utils/utilCommon';

import { Button, Checkbox, Form, Input, Radio, Collapse } from 'antd';
import Default from "../modal/Default";
const { Panel } = Collapse;

const Join = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [inputId, setInputId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalValues, setModalValues] = useState({
        type: '',
        message: ''
    })

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 11 },
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

    const idCheck = async id => {
        console.log(id);
        const user = firestore.collection("user");
        let userIdList = [];
        const result = await user.get().then((docs) => {
            docs.forEach((doc) => {
                userIdList.push(doc.data().id);
            })
            let isDuplicationId = false;
            for (let i = 0; i < userIdList.length; i++) {
                if (id === userIdList[i]) {
                    isDuplicationId = true;
                }
            }
            if (isDuplicationId) {
                console.log("아이디 사용 불가능");
                return true;
            }
            else {
                console.log("아이디 사용 가능");
                return false;
            }
        });
        return result;
    }

    const duplicationCheck = e => {
        e.preventDefault();
        // Todo 아이디 중복 체크 여부 판단 값 생성하기
        idCheck(inputId).then(duplication => {
            console.log(duplication);
            // Todo Default 팝업 연동 (타입 : id-not-available 중복된 아이디입니다.)
            // Todo Default 팝업 연동 (타입 : id-available 사용 가능한 아이디입니다.)
            if (duplication) {
                console.log("Todo Default 팝업 연동 (타입 : id-not-available 중복된 아이디입니다.)");
                setModalOpen(true);
                setModalValues({
                    type: 'id-not-available',
                    message: '중복된 아이디입니다.'
                });
            }
            else {
                console.log("Todo Default 팝업 연동 (타입 : id-available 사용 가능한 아이디입니다.)")
                setModalOpen(true);
                setModalValues({
                    type: 'id-available',
                    message: '사용 가능한 아이디입니다.'
                });
            }
        });
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
        // Todo Default 팝업 연동 (타입 : join-fail 아이디 중복 체크가 필요합니다.)

        idCheck(values.user.id).then(duplication => {
            console.log(duplication)
            // Todo Default 팝업 연동 (타입 : id-not-available 중복된 아이디입니다.)
            // Todo Confirm 팝업 연동 (타입 : join-success 회원가입이 완료되었습니다.)
            if (duplication) {
                console.log("Todo Default 팝업 연동 (타입 : id-not-available 중복된 아이디입니다.)");
                setModalOpen(true);
            }
            else {
                console.log("Todo Confirm 팝업 연동 (타입 : join-success 회원가입이 완료되었습니다.)")
            }
        });
    };

    const onReset = () => form.resetFields();

    return (
        <div style={{ paddingTop: '50px' }}>
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
                                    setInputId(value);
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('4~20자의 영문, 숫자와 특수문자 \'_\'만 사용해주세요.'));
                            }
                        }
                    ]}
                >
                    <div style={{display: 'flex'}}>
                        <Input placeholder="아이디를 입력해주세요." />
                        <Button htmlType="button" onClick={duplicationCheck} disabled={!inputId && true}>중복체크</Button>
                        {modalOpen ? (
                            <Default
                                values={modalValues}
                                isDefaultOpen={modalOpen}
                            />
                        ) : null}
                    </div>
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
                        <Collapse style={{width: '26em'}}>
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
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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
