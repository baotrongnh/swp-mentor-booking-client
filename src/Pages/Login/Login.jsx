import { Icon } from '@iconify/react';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
// import { TypeAnimation } from 'react-type-animation';
import loginImage from '../../assets/Photos/background/logo-color.svg';
import { getUserInformation } from '../../apis/authentication';
import './Login.scss';
import { useNavigate } from "react-router-dom";

function Login() {
     const [isValidate, setIsValidate] = useState(false);
     const [formData, setFormData] = useState({ username: '', password: '' });
     const [showPassword, setShowPassword] = useState(false)
     const navigate = useNavigate();

     const handleShowPassword = () => {
          setShowPassword(prev => !prev);

     }

     const handleChangeInput = (e) => {
          console.log(e.target.value)
          setFormData({ ...formData, [e.target.name]: e.target.value })
     }

     useEffect(() => {
          if (formData.username !== '' && formData.password !== '') {
               setIsValidate(true)
               console.log(isValidate)
               document.getElementById('info').innerHTML = ''
               document.getElementById('username').style.borderColor = '';
               document.getElementById('password').style.borderColor = '';
          } else {
               setIsValidate(false)
               console.log(isValidate)
          }
     }, [formData])

     const handleLogin = (e) => {
          e.preventDefault()
          if (isValidate) {
               console.log('Form Data:', formData);
          } else {
               if (formData.username === '') {
                    document.getElementById('username').style.borderColor = 'red';
               }
               if (formData.password === '') {
                    document.getElementById('password').style.borderColor = 'red';
               }
          }
     }

     const handleGoogleLogin = () => {
          window.open('http://localhost:3000/auth/google', '_self');
     }

     // const checkUserData = async (token) => {
     //      localStorage.setItem('token', token);
     //      const { data } = await getUserInformation();
     //      sessionStorage.setItem('userLogin', JSON.stringify(data.user));
     // }

     useEffect(() => {
          const params = new URLSearchParams(window.location.search);
          const token = params.get('token');
          if (token) {
               localStorage.setItem('token', token);
               console.log(token);
               navigate('/profile')
          }
     }, []);

     return (
          <div className="login-page">
               <div className="container">
                    <Row align='center' className="login-block">
                         <Col xs={0} md={12} className='side-information'>
                              <img src={loginImage} alt="login-image" />
                              {/* <div className="animation-container">
                                   <TypeAnimation
                                        sequence={[
                                             'Welcome to MentorMatch!',
                                             2000,
                                             'Connect with the best Mentor!',
                                             2000,
                                             'Log in to access your account...',
                                             2000,
                                             'MentorMatch: Your Career Partner!',
                                             2000
                                        ]}
                                        wrapper="span"
                                        speed={40}
                                        repeat={Infinity}
                                   />
                              </div> */}
                         </Col>
                         <Col xs={24} md={12}>
                              {/* <form className='login-form' onSubmit={handleLogin}> */}
                              <form className='login-form' onSubmit={handleLogin} >
                                   <h1 className='title'>Welcome Back!</h1>
                                   <p className='welcome-content'>We are glad to see you back.</p>
                                   <div className='input-block'>
                                        <input
                                             type="text"
                                             className="input username"
                                             id='username'
                                             // value={formData.username}
                                             name='username'
                                             onChange={(e) => handleChangeInput(e)}
                                             placeholder=" "

                                        />
                                        <label htmlFor="username" className='label username'>Username <span id="input-username-error" style={{ color: 'red' }}></span></label>
                                   </div>

                                   <div className='input-block'>
                                        <input
                                             // type={showPassword ? "text" : "password"}
                                             className="input password"
                                             id='password'
                                             // value={formData.password}
                                             name='password'
                                             onChange={(e) => handleChangeInput(e)}
                                             type={showPassword ? 'text' : 'password'}
                                             placeholder=" "
                                        />
                                        <label htmlFor="password" className='label password'>Password <span id="input-password-error" style={{ color: 'red' }}></span></label>
                                        {showPassword ? (
                                             <Icon
                                                  id='icon1'
                                                  icon="mdi:eye"
                                                  className='icon'
                                                  onClick={handleShowPassword}
                                                  title='Hide Password'
                                             />
                                        ) : (
                                             <Icon
                                                  id='icon2'
                                                  icon="mdi:eye-off"
                                                  className='icon'
                                                  onClick={handleShowPassword}
                                                  title='Show Password'
                                             />
                                        )}

                                   </div>
                                   <div id='info' style={{ color: 'red', textAlign: 'center', fontWeight: 700 }}></div>

                                   <button className='button-login'>Log in</button>

                                   <div id="info"></div>
                                   <div className="line"></div>
                                   <p className='text-or'>or</p>

                                   <a className="button-google" onClick={handleGoogleLogin}>
                                        <Icon className='icon-google' icon="logos:google-icon" />
                                        <span>Log in with Google</span>
                                   </a>
                                   <p className='login-text'>
                                        {/* <Link className='login-link' to='/signup'>Sign up</Link> */}
                                        Do not have an account? <span className='login-link'>Sign up</span>
                                   </p>
                              </form>
                         </Col>
                    </Row>
               </div>
          </div>
     );
}

export default Login;
