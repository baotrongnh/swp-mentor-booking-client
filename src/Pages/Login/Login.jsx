import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserInformation } from '../../apis/authentication';
import background from '../../assets/Photos/background/login-img2.jpg';
import logo from '../../assets/Photos/logo/logo.png'
import { AuthContext } from '../../Contexts/AuthContext';
import { getToken } from '../../utils/storageUtils';
import './Login.scss';


function Login() {
     const navigate = useNavigate();
     const { data: userInfor, refetch } = useQuery({ queryKey: ['currentUser'], queryFn: getUserInformation, enabled: false });
     const { setCurrentUser } = useContext(AuthContext);

     useEffect(() => {
          console.log(userInfor);
          if (userInfor && userInfor.user) {
               sessionStorage.setItem('currentUser', JSON.stringify(userInfor.user));
               setCurrentUser(userInfor.user);
          }
     }, [userInfor]);

     const handleGoogleLogin = () => {
          window.open('http://localhost:3000/auth/google', '_self');
     }

     const fetchUserData = async () => {
          refetch();
     }

     useEffect(() => {
          const params = new URLSearchParams(window.location.search);
          const token = params.get('token');
          if (token) {
               localStorage.setItem('token', token);
               fetchUserData();
               navigate('/student/profile');
          }
     }, []);

     useEffect(() => {
          const token = getToken();
          if (token) {
               fetchUserData();
               navigate('/student/profile');
          }
     }, []);

     return (
          <div className="login-page">
               <div className="container">
                    <Row align='center' className="login-block">
                         <Col xs={0} md={0} lg={12} className='side-information'>
                              <img src={background} alt="login-image" />

                         </Col>
                         <Col xs={24} md={18} lg={12}>
                              <form className='login-form'  >
                                   <img src={logo} alt="logo" className='logo' />
                                   <div className="line"></div>
                                   <h1 className='title'>Welcome Back!</h1>
                                   <p className='welcome-content'>We are glad to see you back.</p>


                                   <a className="button-google" onClick={handleGoogleLogin}>
                                        <Icon className='icon-google' icon="logos:google-icon" />
                                        <span>Log in with Google</span>
                                   </a>

                              </form>
                         </Col>
                    </Row>
               </div>
          </div>
     );
}

export default Login;
