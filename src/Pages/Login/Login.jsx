import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { Col, Row } from 'antd'
import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { getUserInformation } from '../../apis/authentication'
import background from '../../assets/Photos/background/login-img2.jpg'
import logo from '../../assets/Photos/logo/logo.png'
import { AuthContext } from '../../Contexts/AuthContext'
import { getToken } from '../../utils/storageUtils'
import './Login.scss'
import toast from 'react-hot-toast'
import { AppContext } from '../../Contexts/AppContext'


function Login() {
    const navigate = useNavigate()
    const { setCurrentUser } = useContext(AuthContext)
    const { t } = useContext(AppContext)

    const { data: userInfor, refetch } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getUserInformation,
        enabled: !!getToken()
    })

    const handleGoogleLogin = () => {
        window.open(`${import.meta.env.VITE_APP_API_URL}/auth/google`, '_self')
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        if (token) {
            localStorage.setItem('token', token)
            refetch()
            if (userInfor && userInfor.user) {
                toast.success(`Welcome ${userInfor?.user.fullName}!`)
                navigate('/')
                return
            }
        } else if (getToken()) {
            const token = getToken()
            if (token) {
                refetch()
                if (userInfor) {
                    console.log(userInfor.user)
                    toast.success(`Welcome ${userInfor?.user.fullName}!`)
                    sessionStorage.setItem('currentUser', JSON.stringify(userInfor.user))
                    setCurrentUser(userInfor.user)
                    navigate('/')
                    return
                } else {
                    localStorage.removeItem('token')
                    toast.error('Something went wrong, please login again!')
                }
            }
        }
    }, [userInfor])

    return (
        <div className="login-page">
            <div className="container">
                <Row align='center' className="login-block">
                    <Col xs={0} md={0} lg={12} className='side-information'>
                        <img src={background} alt="login-image" />

                    </Col>
                    <Col xs={24} md={18} lg={12}>
                        <form className='login-form'>
                            <img src={logo} alt="logo" className='logo' />
                            <div className="line"></div>
                            <h1 className='title'>{t("welcome back")}</h1>
                            <p className='welcome-content'>{t("We are glad")}</p>
                            <a className="button-google" onClick={handleGoogleLogin}>
                                <Icon className='icon-google' icon="logos:google-icon" />
                                <span>{t("login")}</span>
                            </a>
                        </form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Login
