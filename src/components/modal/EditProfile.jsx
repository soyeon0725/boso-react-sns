import {useDispatch, useSelector} from 'react-redux';

import {selectUserInfo, setUserInfo} from '../../app/slice';
import {Form, Input, Button, Radio} from 'antd';
import {GiftOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {checkBirth, checkPhoneNumber} from "../../utils/utilCommon";
import {updateUserApi} from "../../api/adaptor.api";

const EditProfile = () => {
    console.log('EditProfile 팝업');
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    const onFinish = (values) => {
        console.log(values.editUser);
        updateUserApi(values.editUser);
    };

    return (
        <>
            <Form
                name="basic"
                initialValues={{
                    editUser: {
                        name: userInfo.name,
                        email: userInfo.email,
                        birth: userInfo.birth,
                        phone: userInfo.phone,
                        photo: userInfo.photoNum
                    }
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name={["editUser", "name"]}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        }
                    ]}
                >
                    <Input placeholder="이름을 입력해 주세요." prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={["editUser", "email"]}
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'email',
                            message: '이메일 형식에 맞게 작성해 주세요.'
                        }
                    ]}
                >
                    <Input placeholder="이메일을 입력해 주세요." prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={["editUser", "photo"]}
                    label="Photo"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'photo',
                            message: '프로필 이미지를 선택해 주세요.'
                        }
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value='0'>
                            <img src={require('../../assets/image/photo-0.png')} />
                        </Radio.Button>
                        <Radio.Button value='1'>
                            <img src={require('../../assets/image/photo-1.png')} />
                        </Radio.Button>
                        <Radio.Button value='2'>
                            <img src={require('../../assets/image/photo-2.png')} />
                        </Radio.Button>
                        <Radio.Button value='3'>
                            <img src={require('../../assets/image/photo-3.png')} />
                        </Radio.Button>
                        <Radio.Button value='4'>
                            <img src={require('../../assets/image/photo-4.png')} />
                        </Radio.Button>
                        <Radio.Button value='5'>
                            <img src={require('../../assets/image/photo-5.png')} />
                        </Radio.Button>
                        <Radio.Button value='6'>
                            <img src={require('../../assets/image/photo-6.png')} />
                        </Radio.Button>
                        <Radio.Button value='7'>
                            <img src={require('../../assets/image/photo-7.png')} />
                        </Radio.Button>
                        <Radio.Button value='8'>
                            <img src={require('../../assets/image/photo-8.png')} />
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={["editUser", "birth"]}
                    label="Birth"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value || checkBirth(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('생년월일은 \'YYYYMMDD\' 형식으로 숫자만 입력해 주세요.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="생년월일을 입력해 주세요." prefix={<GiftOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={["editUser", "phone"]}
                    label="Phone"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value || checkPhoneNumber(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('\'-\'빼고 숫자만 입력해 주세요.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="휴대폰을 입력해 주세요." prefix={<PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default EditProfile;
