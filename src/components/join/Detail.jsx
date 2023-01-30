import {useEffect} from 'react';
import {Button, Checkbox, Form, Input, Radio, Collapse} from 'antd';
import {LockOutlined, MailOutlined, UserOutlined, PhoneOutlined, GiftOutlined} from '@ant-design/icons';
import {checkPassword, checkBirth, checkName, checkPhoneNumber} from '../../utils/utilCommon';
import {createUserWithEmailAndPasswordApi} from '../../api/adaptor.api';

const { Panel } = Collapse;

const simpleFormStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    paddingTop: '40px'
};

const iconStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
}

const Detail = () => {
    // antd layout object
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
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

    // 상세 회원가입 화면
    useEffect(()=> {
        console.log('Detail 회원가입');
    },[]);

    const genExtra = key => <Checkbox value={key} onClick={(event) => event.stopPropagation()} />;

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

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        // Authentication Join
        await createUserWithEmailAndPasswordApi(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            style={simpleFormStyle}
            name='nest-messages'
            validateMessages={validateMessages}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name={['user', 'name']}
                label='Name'
                rules={[
                    {
                        required: true
                    },
                    {
                        validator: validateName,
                        message: '이름에 숫자, 특수문자는 사용할 수 없습니다.'
                    }
                ]}
            >
                <Input placeholder='이름을 입력해주세요.' prefix={<UserOutlined style={iconStyle} />} />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label='Email'
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
                <Input placeholder='이메일을 입력해주세요.' prefix={<MailOutlined style={iconStyle} />} />
            </Form.Item>
            <Form.Item
                name={['user', 'password']}
                label='Password'
                rules={[
                    {
                        required: true
                    },
                    {
                        validator: validatePassword,
                        message: '최소 10자리 영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합'
                    }
                ]}
            >
                <Input.Password
                    placeholder='비밀번호를 입력해주세요.'
                    type='password'
                    autoComplete='on'
                    prefix={<LockOutlined style={iconStyle} />}
                />
            </Form.Item>
            <Form.Item
                name={['user', 'birth']}
                label='Birth'
                rules={[
                    {
                        required: true
                    },
                    {
                        validator: validateBirth,
                        message: '생년월일은 \'YYYYMMDD\' 형식으로 숫자만 입력해주세요.'
                    }
                ]}
            >
                <Input placeholder='생년월일을 입력해주세요.' prefix={<GiftOutlined style={iconStyle} />} />
            </Form.Item>
            <Form.Item
                name={['user', 'phone']}
                label='Phone'
                rules={[
                    {
                        required: true
                    },
                    {
                        validator: validatePhone,
                        message: '숫자만 입력해주세요.'
                    }
                ]}
            >
                <Input placeholder='휴대폰 번호를 입력해주세요.' prefix={<PhoneOutlined style={iconStyle} />} />
            </Form.Item>
            <Form.Item
                name={['user', 'agree']}
                label='Agree'
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Checkbox.Group>
                    <Collapse style={{width: '400px'}}>
                        <Panel
                            showArrow={false}
                            header='(필수) 개인회원 약관에 동의'
                            key='1'
                            extra={genExtra('A')}
                        >
                            <p>개인회원 약관에 동의 (상세)</p>
                        </Panel>
                    </Collapse>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item
                name={['user', 'expired']}
                label='Expired'
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Radio.Group>
                    <Radio value='1'>1년</Radio>
                    <Radio value='3'>3년</Radio>
                    <Radio value='5'>5년</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name='submit'
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 6
                }}
            >
                <Button type='primary' htmlType='submit'>
                    Join
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Detail;
