//import { useEffect } from "react";
import { Form, Input, Button, Layout } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';

import { useNavigate } from "react-router-dom";

var axios = require('axios');

const { Content } = Layout;


const Login = () => {

    const url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BASE_PATH;

    var navigate = useNavigate();

    const onFinish = (data) => {

        var config = {
            method: 'post',
            url: url + '/auth/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                navigate("/");
            });

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout style={{ minHeight: '100vh' }} className="site-layout">
            <Content className="site-layout-background">
                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    {/* Username */}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Ingrese el nombre de usuario' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Ingrese la contraseña' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="input password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Content>

        </Layout>

    );
};

export default Login;