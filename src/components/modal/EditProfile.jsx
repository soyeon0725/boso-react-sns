import {useSelector} from 'react-redux';
import {selectUserProfile} from '../../app/slice';
import {Form, Input, Button, Radio} from 'antd';
import {GiftOutlined, MailOutlined, PhoneOutlined, UserOutlined} from '@ant-design/icons';
import '../../assets/css/styles.css';
import {checkName, checkBirth, checkPhoneNumber} from '../../utils/utilCommon';
import {updateProfileApi} from '../../api/adaptor.api';

const iconStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
}

const EditProfile = () => {
    console.log('EditProfile 팝업');
    const userProfile = useSelector(selectUserProfile);
    const {name, email, birth, phone, photoNum} = userProfile;
    const imageArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

    // antd layout object
    const layout = {
        labelCol: {
            span: 4,
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
        console.log(values.user);
        updateProfileApi(values);
    };

    console.log(photoNum)

    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    user: {
                        name,
                        email,
                        birth,
                        phone,
                        photo: photoNum
                    }
                }}
                validateMessages={validateMessages}
                onFinish={onFinish}
            >
                <Form.Item
                    name={['user', 'name']}
                    label='Name'
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
                    <Input placeholder='이름을 입력해 주세요.' prefix={<UserOutlined style={iconStyle} />} />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label='Email'
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
                    name={['user', 'photo']}
                    label='Photo'
                    rules={[
                        {
                            required: true,
                        },
                        // {
                        //     type: 'photo',
                        //     message: '프로필 이미지를 선택해주세요.'
                        // }
                    ]}
                >
                    <Radio.Group className='radio-custom'>
                        {
                            imageArray.map((item, index) => (
                                <Radio key={index} value={item}>
                                    <img src={require(`../../assets/images/photo_${item}.png`)} alt={`프로필 이미지_${item}`} />
                                </Radio>
                            ))
                        }
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={['user', "birth"]}
                    label='Birth'
                    rules={[
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
                            validator: validatePhone,
                            message: '숫자만 입력해주세요.'
                        }
                    ]}
                >
                    <Input placeholder='휴대폰 번호를 입력해주세요.' prefix={<PhoneOutlined style={iconStyle} />} />
                </Form.Item>
                <Form.Item
                    name='submit'
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 4
                    }}
                >
                    <Button type='primary' htmlType='submit'>
                        Edit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default EditProfile;
