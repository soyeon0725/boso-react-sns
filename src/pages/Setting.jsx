import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectUserProfile} from '../app/slice';
import {Tabs, Button, Form, Input} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import {checkPassword} from '../utils/utilCommon';
import {deleteUserApi, updatePasswordApi} from '../api/adaptor.api';

const changeFormStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    // marginTop : '3%'
};

const deleteFormStyle = {
    display: 'grid',
    justifyContent: 'center',
    // marginTop : '3%'
}


const iconStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
};

const Setting = () => {
    useEffect(() => {
        console.log('Setting 화면');
    }, []);

    const userProfile = useSelector(selectUserProfile);

    // antd layout object
    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 13,
        },
    };

    // antd validateMessages object
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        }
    };

    const change = async (values) => {
        console.log('Received values of form: ', values.password);
        await updatePasswordApi(values.password);
    };

    const changeForm = (
        <Form
            {...layout}
            name='normal_login'
            className='login-form'
            style={changeFormStyle}
            initialValues={{remember: true}}
            validateMessages={validateMessages}
            onFinish={change}

        >
            <Form.Item
                name={['password', 'current']}
                label='Current PW'
                rules={[
                    {
                        required: true,
                        message: '비밀번호를 입력해주세요',
                    },
                    {
                        validator: (_, value) => {
                            if (!value || value === userProfile.password) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('현재 비밀번호를 입력해주세요.'));
                        }
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
                name={['password', 'newPw']}
                label='New PW'
                rules={[
                    {
                        required: true,
                        message: '새 비밀번호를 입력해주세요.',
                    },
                    {
                        validator: (_, value) => {
                            if (!value || (value !== userProfile.password && checkPassword(value))) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('최소 10자리 영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합'));
                        }
                    }
                ]}
            >
                <Input.Password
                    placeholder='새 비밀번호를 입력해주세요.'
                    type='password'
                    autoComplete='on'
                    prefix={<LockOutlined style={iconStyle} />}
                />
            </Form.Item>
            <Form.Item
                name={['password', 'confirmNewPw']}
                label='Confirm New PW'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '새 비밀번호를 다시 입력해주세요.',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || (getFieldValue(['password', 'newPw']) === value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('입력한 두 개의 비밀번호가 일치하지 않습니다.'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    placeholder='새 비밀번호를 다시 입력해주세요.'
                    type='password'
                    autoComplete='on'
                    prefix={<LockOutlined style={iconStyle} />}
                />
            </Form.Item>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 7}}>
                <Button type="primary" htmlType="submit">
                    Change PW
                </Button>
            </Form.Item>
        </Form>
    );

    const deleteForm = (
        <div style={deleteFormStyle}>
            <p><b >⚠️ 계정 삭제는 영구적입니다.</b></p>
            <p style={{marginBottom: '5px'}}>그 동안 BOSO를 이용해주신 회원님께 진심으로 감사드립니다.</p>
            <p style={{marginBottom: '20px'}}>아래 회원 탈퇴 버튼을 누르시면, 탈퇴가 정상적으로 완료됩니다.</p>
            <Button onClick={() => deleteUserApi()}>
                회원 탈퇴
            </Button>
        </div>
    );

    return (
        <Tabs
            size='large'
            centered
            tabBarGutter={100}
            defaultActiveKey='1'
            items={[
                {
                    label: `비밀번호 변경`,
                    key: '1',
                    children: changeForm,
                },
                {
                    label: `회원 탈퇴`,
                    key: '2',
                    children: deleteForm,
                },
            ]}
        />
    )
}
export default Setting;
