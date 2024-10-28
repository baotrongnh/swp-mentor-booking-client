import {useMutation} from '@tanstack/react-query'
import {Button, Form, Input} from 'antd'
import {loginAdmin} from '../../../apis/authentication'
import logo from '../../../assets/Photos/logo/logo.png'
import './LoginAdmin.scss'
import toast from 'react-hot-toast'
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../../Contexts/AppContext.jsx";
import {AuthContext} from "../../../Contexts/AuthContext.jsx";

function LoginAdmin() {
    const [statusLogin, setStatusLogin] = useState('')
    const navigate = useNavigate()
    const {authChannel} = useContext(AppContext)

    const loginSuccessAction = () => {
        sessionStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        toast.success('Login successfully')
        navigate('/admin/mentor/all')
    }

    const mutation = useMutation({
        mutationFn: (values) => loginAdmin(values),
        onSuccess: (values) => {
            const errorCode = values.data.error_code
            if (errorCode === 0) {
                authChannel.postMessage({type: 'LOGIN', errorCode: 0})
                localStorage.setItem('tokenAdmin', values.data.token)
                loginSuccessAction()
            } else if (errorCode === 1) {
                toast.error('Passwords do not match')
                setStatusLogin('error')
            } else {
                toast.error('Something went wrong')
            }
        }
    })

    authChannel.onmessage = (event) => {
        console.log(event)
        if (event.data.type === 'LOGIN') {
            const errorCode = event.data.errorCode;
            if (localStorage.getItem('tokenAdmin') && errorCode === 0) {
                loginSuccessAction()
            }
        }
    }

    const onFinish = (values) => {
        mutation.mutate(values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
        setStatusLogin('error')
    }

    return (
        <div className='login-admin-page'>
            <div className="login-block">
                <img className='logo' src={logo} alt=""/>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,

                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
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
                        validateStatus={statusLogin}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginAdmin