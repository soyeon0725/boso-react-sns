import {useDispatch, useSelector} from 'react-redux';
import {selectUserInfo, setConfirmModal, setDefaultModal, setUserInfo} from '../app/slice';

import {Form, Input, Upload, message, Button} from 'antd';
import {GiftOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {checkBirth, checkPhoneNumber} from "../utils/utilCommon";
import {useState} from "react";
import store from "../app/store";
import {firestore} from "../firebase/Firebase";
import {getAuth} from "firebase/auth";



const EditProfile = (props) => {
    console.log('EditProfile 팝업');
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const [imageUrl, setImageUrl] = useState(userInfo.photoUrl);

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            // setLoading(false);
            console.log(url)
            setImageUrl(url);
        });
    };

    const onFinish = (values) => {
        // Cloud Firestore - doc update
        const auth = getAuth();
        const user = auth.currentUser;
        const userStore = firestore.collection("user");
        console.log({...values.editUser});
        if (values.editUser.birth === undefined) values.editUser.birth = '';
        if (values.editUser.phone === undefined) values.editUser.phone = '';
        console.log({...values.editUser});
        userStore.doc(user?.uid).update({...values.editUser}).then(() => {
            dispatch(setDefaultModal({show: true, type: 'edit-profile'}));
            dispatch(setConfirmModal({show: false, type: ''}));
        });
    }

    return (
        <>
            {/*<div>
                <Button shape="circle" icon={<SearchOutlined />} size="large">
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                </Button>
            </div>*/}
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
            </Upload>
            <Form
                name="basic"
                initialValues={{ editUser: {name: userInfo.name, email: userInfo.email, birth: userInfo.birth, phone: userInfo.phone }}}
                onFinish={onFinish}
            >
                <Form.Item
                    name={["editUser", "name"]}
                    label="Name"
                    defaultValue={userInfo.name}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        }
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요." prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    name={["editUser", "email"]}
                    label="Email"
                    defaultValue={userInfo.email}
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
                    <Input placeholder="이메일을 입력해주세요." prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
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
                                return Promise.reject(new Error('생년월일은 \'YYYYMMDD\' 형식으로 숫자만 입력해주세요.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="생년월일을 입력해주세요." prefix={<GiftOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
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
                                return Promise.reject(new Error('\'-\'빼고 숫자만 입력해주세요.'));
                            }
                        }
                    ]}
                >
                    <Input placeholder="휴대폰을 입력해주세요." prefix={<PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
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
