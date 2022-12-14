import { Button, Form, Input } from "antd";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const SimpleSignUp = () => {
    // antd validateMessages object
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        }
    };

    // Login failed
    const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

    // Authentication Join With Email And Password (12/6)
    const auth = getAuth();
    // Authentication Join
    const createUser = async (value) => {
        const {email, password} = value;
        // 1. 신규 사용자 가입
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("createUserWithEmailAndPassword success ⭕️");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("createUserWithEmailAndPassword error ❌");
                console.log(errorCode, errorMessage);
            })

        await updateProfile(auth.currentUser, {
            displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            // Profile updated!
            console.log("updateProfile success ⭕️");
        }).catch((error) => {
            // An error occurred
            console.log("updateProfile error ❌");
            console.log(error);
        });

    };
    return (
        <div className='simple-signup'  style={{ paddingTop: '40px' }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                validateMessages={validateMessages}
                onFinish={createUser}
                onFinishFailed={onFinishFailed}
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
                    <Input />
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
                        }
                    ]}
                >
                    <Input />
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
                    <Input.Password />
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
        </div>
    )
};
export default SimpleSignUp;
