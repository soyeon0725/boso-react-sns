import {useEffect} from 'react';
import {Button, Form, Input} from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {checkPassword, checkName} from '../../utils/utilCommon';
import {createUserWithEmailAndPasswordApi} from '../../api/adaptor.api';

const simpleFormStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    paddingTop: '40px'
};

const iconStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
}

const Simple = () => {
    // antd layout object
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };
    // antd validateMessages object
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        }
    };

    // 간편 회원가입 화면
    useEffect(()=> {
        console.log('Simple 회원가입');
    },[]);

    const validatePassword = (_, value) => {
        if (!value || checkPassword(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    };

    const validateName = (_, value) => {
        if (!value || checkName(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    };

    const register = async (values) => {
        console.log('Received values of form: ', values);
        await createUserWithEmailAndPasswordApi(values);
    };

    const registerFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name='normal_login'
            className='login-form'
            style={simpleFormStyle}
            initialValues={{remember: true}}
            validateMessages={validateMessages}
            onFinish={register}
            onFinishFailed={registerFailed}
        >
            <Form.Item
                label='Name'
                name={['user', 'name']}
                rules={[
                    {
                        required: true,
                        // message: 'Please input your name!',
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
                label='Email'
                name={['user', 'email']}
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
                <Input placeholder='이메일을 입력해주세요.' prefix={<MailOutlined style={iconStyle} />} />
            </Form.Item>
            <Form.Item
                label='Password'
                name={['user', 'password']}
                rules={[
                    {
                        required: true,
                        // message: 'Please input your password!',
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
                    prefix={<LockOutlined style={iconStyle} />} />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    CreateUser
                </Button>
            </Form.Item>
        </Form>
    )
};
export default Simple;
