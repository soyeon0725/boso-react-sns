import React from "react";
import { Button, Checkbox, Form, Input, Radio, Collapse } from 'antd';
import {firestore} from "../firebase/Firebase"
const { Panel } = Collapse;

const Join = () => {
    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    const genExtra = (key) => {
        console.log(typeof key)
        console.log(key)
        return (
            <Checkbox value={key} onClick={(event) => event.stopPropagation()}/>
        );
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(values.user)
        console.log(firestore);
        const user = firestore.collection("user");
        user.doc(values.user.id).set(values.user);

    };
    return (
        <div >
            <h2 style={{paddingTop: '30px', textAlign: 'center'}}>SNS 회원가입</h2>
            <p style={{textAlign: 'center'}}>친구들의 사진과 동영상을 보려면 가입하세요.</p>
            <Form
                name="normal_login"
                className="login-form"
                style={{maxWidth: '400px', margin: '0 auto', paddingTop: '20px'}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name={["user", "id"]}
                    label="아이디"
                    rules={[{
                        required: true,
                        message: '4~20자의 영문, 숫자와 특수문자 \'_\'만 사용해주세요.!'
                    }]}
                >
                    <Input placeholder="4~20자의 영문, 숫자와 특수문자 '_'만 사용해주세요." />
                </Form.Item>
                <Form.Item
                    name={["user", "password"]}
                    label="비밀번호"
                    rules={[{
                        required: true,
                        message: '8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.'
                    }]}
                >
                    <Input
                        type="password"
                        placeholder="8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요."
                    />
                </Form.Item>
                <Form.Item
                    name={["user", "name"]}
                    label="이름"
                    rules={[{
                        required: true,
                        message: '이름은 필수 입력 정보입니다.'
                    }]}
                >
                    <Input placeholder="이름을 입력해주세요. (숫자, 특수문자 입력 불가)" />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="이메일"
                    rules={[{
                        required: true,
                        message: '이메일은 필수 입력 정보입니다.',
                        type: 'email'
                    }]}
                >
                    <Input placeholder="email@gmail.com" />
                </Form.Item>
                <Form.Item
                    name={["user", "birth"]}
                    label="생년월일"
                    rules={[{
                        required: true,
                        message: '생년월일은 필수 입력 정보입니다.'
                    }]}
                >
                    <Input placeholder="YYYYMMDD" />
                </Form.Item>
                <Form.Item
                    name={["user", "phone"]}
                    label="휴대폰"
                    rules={[{
                        required: true,
                        message: '휴대폰은 필수 입력 정보입니다.'
                    }]}
                >
                    <Input placeholder="'-'빼고 숫자만 입력해주세요." />
                </Form.Item>
                <Form.Item
                    name={["user", "agree"]}
                    label="약관"
                    rules={[{
                        required: true,
                        message: '약관 동의는 필수 입력 정보입니다.'
                    }]}
                >
                    <Checkbox.Group>
                        <Collapse accordion style={{width: '350px'}}>
                            <Panel showArrow={false} header="(필수) 개인회원 약관에 동의" key="1" extra={genExtra("A")}>
                                <p>{text}</p>
                            </Panel>
                            <Panel showArrow={false} header="(필수) 개인정보 수집 및 이용에 동의" key="2" extra={genExtra("B")}>
                                <p>{text}</p>
                            </Panel>
                            <Panel showArrow={false} header="(선택) 위치기반서비스 이용약관에 동의" key="3" extra={genExtra("C")}>
                                <p>{text}</p>
                            </Panel>
                            <Panel showArrow={false} header="(선택) 마케팅 정보 수신 동의 - 이메일" key="4" extra={genExtra("D")}>
                                <p>{text}</p>
                            </Panel>
                            <Panel showArrow={false} header="(선택) 마케팅 정보 수신 동의 - SMS/MMS" key="5" extra={genExtra("E")}>
                                <p>{text}</p>
                            </Panel>
                        </Collapse>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    name={["user", "expired"]}
                    label="정보보유기간"
                    rules={[{
                        required: true,
                        message: '정보보유기간 선택은 필수 입력 정보입니다.'
                    }]}
                >
                    <Radio.Group>
                        <Radio value="1">1년</Radio>
                        <Radio value="3">3년</Radio>
                        <Radio value="5">5년</Radio>
                    </Radio.Group>
                </Form.Item>
                {/*<Form.Item style={{textAlign: 'center'}}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>*/}
                <Form.Item style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Join;
