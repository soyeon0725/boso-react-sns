import { useSelector } from 'react-redux';
import { selectUserInfo } from '../app/slice';

import {Avatar, Button, Form, Input, Modal} from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";

const EditProfile = (props) => {
    console.log('EditProfile 팝업');
    const userInfo = useSelector(selectUserInfo);
    const { editProfile, setEditProfile } = props;
    const reset = () => setEditProfile({show: false, type: ''});
    const handleOk = () => reset();
    const handleCancel = () => reset();
    return (
        <Modal
            title="프로필 편집"
            open={editProfile.show}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <div>
                <Avatar
                    style={{ verticalAlign: 'middle' }}
                    size={100}
                    gap={4}
                    src={userInfo.photoUrl}
                />
            </div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                // validateMessages={validateMessages}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
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
                    label="Email"
                    name="email"
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
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="비밀번호를 입력해주세요." prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
export default EditProfile;
