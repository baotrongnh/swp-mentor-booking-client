import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { loginAdmin } from '../../../apis/authentication'
import logo from '../../../assets/Photos/logo/logo.png'
import './LoginAdmin.scss'

function LoginAdmin() {
     const mutation = useMutation({ mutationFn: (values) => loginAdmin(values) })

     const onFinish = (values) => {
          console.log('Success:', values)
          mutation.mutate(values)
     }

     const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo)
     }
     
     return (
          <div className='login-admin-page'>
               <div className="login-block">
                    <img className='logo' src={logo} alt="" />
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
                                   Login
                              </Button>
                         </Form.Item>
                    </Form>
               </div>
          </div>
     )
}

export default LoginAdmin