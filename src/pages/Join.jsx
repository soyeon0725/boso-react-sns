import React, {useEffect, useState} from "react";
import { Button, Form, Input, InputNumber } from 'antd';
import {firestore} from "../firebase/Firebase"

/* eslint-enable no-template-curly-in-string */

const Join = () => {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    /* eslint-disable no-template-curly-in-string */
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
    const onFinish = (values) => {
        console.log(values.user)
        console.log(firestore);
        const user = firestore.collection("user");
        user.doc(values.user.id).set(values.user);

    };
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'id']}
                label="Id"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'password']}
                label="Password"
                rules={[
                    {

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'name']}
                label="Name"
                rules={[
                    {

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'birth']}
                label="Birthday"
                rules={[
                    {

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'phone']}
                label="Phone"
                rules={[
                    {

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'expired']}
                label="Info"
                rules={[
                    {

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Join;
