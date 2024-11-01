import { DownOutlined, SettingOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Badge, Button, Col, Drawer, Dropdown, Flex, Input, Row, Select, Switch } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import defaultAvatar from '../../assets/Photos/avatar/default_avatar.jpg'
import logo from '../../assets/Photos/logo/logo.png'
import { AppContext } from '../../Contexts/AppContext'
import { AuthContext } from '../../Contexts/AuthContext'
import useDebounce from '../../hooks/useDebounce'
import { deleteToken } from '../../utils/storageUtils'
import { HeaderMentor } from "../index.js"
import { ModalBecomeMentor } from '../Modal'
import './Header.scss'

function Header() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const { setFilterMentor, filterMentor, setTheme, theme, defaultLanguage } = useContext(AppContext)
    const { currentUser, setCurrentUser } = useContext(AuthContext)
    const [searchValue, setSearchValue] = useState(null)
    const debounceSearchValue = useDebounce(searchValue, 800)
    const [openModalBeMentor, setOpenModalBeMentor] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openDropDownAccount, setOpenDropDownAccount] = useState(false)

    const handleMenuAccountClick = (e) => {
        if (e.key !== '4' && e.key !== '5') {
            setOpenDropDownAccount(false)
        }
    }

    const handleOpenAccountChange = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setOpenDropDownAccount(nextOpen)
        }
    }

    const onSearch = (value) => {
        const url = '/browser-mentors'
        if (location.pathname !== url) {
            navigate(url)
        }
        setFilterMentor({ ...filterMentor, search: value })
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleLogout = () => {
        setCurrentUser(undefined)
        deleteToken()
        sessionStorage.removeItem('currentUser')
    }

    const handleChangeTheme = (status) => {
        if (status) {
            setTheme('dark-theme')
            localStorage.setItem('theme', 'dark-theme')
        } else {
            setTheme('light-theme')
            localStorage.setItem('theme', 'light-theme')
        }
    }

    const handleChangeLanguage = (value) => {
        i18n.changeLanguage(value)
        localStorage.setItem('language', value)
    }

    useEffect(() => {
        if (debounceSearchValue !== null) {
            setFilterMentor({ ...filterMentor, search: debounceSearchValue })
        }
    }, [debounceSearchValue])

    const moreMenuDropDown = [
        {
            label:
                <Link onClick={() => setOpenModalBeMentor(true)}>
                    {t('become a mentor')}
                </Link>,
            key: '0',
        },
        {
            label:
                <Link to='/gift'>
                    {t('Donation history')}
                </Link>,
            key: '1',
        },
        {
            label:
                <Link to='/pending-accept'>
                    {t('Invitation Pending')}
                </Link>,
            key: '2',
        }
    ]

    const accountMenuDropDown = [
        { type: 'divider' },
        {
            label: <Link to="/student/profile">{t('profile')}</Link>,
            key: '0',
        },
        {
            label:
                <Link to='/wallet'>
                    <Flex gap='small' align='center'>
                        {t('wallet')}: <Icon icon="twemoji:coin" /><p> {currentUser?.point}</p>
                    </Flex>
                </Link>,
            key: '1',
        },
        {
            label:
                <Link onClick={() => setOpenModalBeMentor(true)}>
                    {t('become a mentor')}
                </Link>,
            key: '2',
        },
        { type: 'divider' },
        {
            label:
                <Flex gap='small' justify='space-between'>
                    {t('theme')}:
                    <Switch
                        defaultChecked={theme === 'dark-theme'}
                        onChange={handleChangeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </Flex>,
            key: '4'
        },
        {
            label:
                <Flex gap='small' align='center' justify='space-between'>
                    {t('language')}:
                    <Select
                        defaultValue={defaultLanguage}
                        onChange={handleChangeLanguage}
                        options={[
                            {
                                value: 'en',
                                label: 'EN',
                            },
                            {
                                value: 'vi',
                                label: 'VN',
                            }
                        ]}
                    />
                </Flex>,
            key: '5'
        },
        { type: 'divider' },
        {
            label: <Link onClick={handleLogout}>{t('logout')}</Link>,
            key: '3',
            danger: true
        },
    ]

    const guestMenuDropDown = [
        { type: 'divider' },
        {
            label:
                <Flex gap='small' justify='space-between'>
                    {t('theme')}: <Switch
                        defaultChecked={theme === 'dark-theme'}
                        onChange={handleChangeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </Flex>,
            key: '4'
        },
        {
            label:
                <Flex gap='small' align='center' justify='space-between'>
                    {t('language')}: <Select
                        defaultValue={defaultLanguage}
                        onChange={handleChangeLanguage}
                        options={[
                            {
                                value: 'en',
                                label: 'EN',
                            },
                            {
                                value: 'vi',
                                label: 'VN',
                            }
                        ]}
                    />
                </Flex>,
            key: '5'
        },
        { type: 'divider' },
        {
            label: <Link onClick={handleLogout}>{t('Contact')}</Link>,
            key: '3',
        },
    ]

    if (currentUser?.isMentor !== 0 && currentUser) return <HeaderMentor />

    return (
        <div className="header">
            <div className="container">
                <Row className='header-block'>
                    <Col className='logo-block' xs={12} sm={6} md={4} lg={5}>
                        <Link to='/'>
                            <img className='logo-img' src={logo} alt="" />
                        </Link>
                    </Col>

                    <Col xs={12} sm={0} className='btn-navbar-mobile'>
                        <Button onClick={() => setOpenDrawer(true)} type='text'>
                            <Icon className='icon' icon="ic:round-menu" />
                        </Button>
                    </Col>

                    <Col className='search-block' xs={24} sm={14} md={17} lg={7} xl={9}>
                        <Input.Search
                            placeholder={t('find mentors')}
                            onSearch={onSearch}
                            style={{ width: '100%', }}
                            size='large'
                            allowClear
                            onClear={() => setFilterMentor({ ...filterMentor, search: '' })}
                            onChange={e => handleChange(e)}
                            enterButton
                        />
                    </Col>

                    <Col xs={0} sm={4} md={3} lg={0} className='btn-navbar-mobile'>
                        <Button onClick={() => setOpenDrawer(true)} type='text'>
                            <Icon className='icon' icon="ic:round-menu" />
                        </Button>
                    </Col>

                    <Col xs={0} md={0} lg={12} xl={10}>
                        {currentUser
                            ?
                            <div className='btn-block'>
                                <NavLink to='/browser-mentors' className='navbar-link'>{t('browser mentors')}</NavLink>
                                <NavLink to={`/schedule`} className='navbar-link'>{t('schedule')}</NavLink>
                                <Dropdown
                                    menu={{ items: moreMenuDropDown }}
                                    placement='bottom'
                                    trigger={['click']}
                                >
                                    <Link className='navbar-link' onClick={(e) => e.preventDefault()}>
                                        {t('more')}<DownOutlined />
                                    </Link>
                                </Dropdown>

                                <NavLink to='/notification' className='navbar-link'>
                                    <Badge size='small' count={7} showZero color="#faad14" >
                                        <Icon style={{ fontSize: '3rem' }} icon="material-symbols-light:notifications-outline" />
                                    </Badge>
                                </NavLink>

                                <div>
                                    <Flex align='center'>
                                        <Link
                                            to={currentUser.isMentor === 0 ? '/student/profile' : `/mentor/profile/${currentUser.accountId}`}
                                            className='navbar-link account'>
                                            {currentUser?.imgPath
                                                ? <img className='avatar' src={currentUser?.imgPath} alt=""
                                                    onError={(e) => e.target.src = defaultAvatar} />
                                                : <Icon className='icon' icon="material-symbols-light:account-circle" />
                                            }
                                        </Link>
                                        <Dropdown
                                            menu={{ items: accountMenuDropDown, onClick: handleMenuAccountClick }}
                                            placement='bottomRight'
                                            trigger={['click']}
                                            arrow={true}
                                            onOpenChange={handleOpenAccountChange}
                                            open={openDropDownAccount}
                                        >
                                            <div>
                                                <Icon style={{ cursor: 'pointer' }} icon="icon-park-outline:down" />
                                            </div>
                                        </Dropdown>
                                    </Flex>
                                </div>
                            </div>
                            :
                            <div className='btn-block guest'>
                                <NavLink to='/browser-mentors' className='navbar-link'>{t('browser mentors')}</NavLink>

                                <Flex align='center' gap='middle'>
                                    <Link to='/login'><Button type='primary'>{t('Login')}</Button></Link>
                                    <Dropdown
                                        menu={{ items: guestMenuDropDown, onClick: handleMenuAccountClick }}
                                        placement='bottomRight'
                                        trigger={['click']}
                                        arrow={true}
                                        onOpenChange={handleOpenAccountChange}
                                        open={openDropDownAccount}
                                    >
                                        <Link className='navbar-link' onClick={(e) => e.preventDefault()}>
                                            <SettingOutlined />
                                        </Link>
                                    </Dropdown>
                                </Flex>
                            </div>
                        }
                    </Col>
                </Row>
            </div>

            <Drawer
                className='navbar-drawer'
                placement='right'
                width={350}
                title={currentUser ? `Welcome, ${currentUser?.fullName}` : ''}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >

                <Flex gap='small' align='center' justify='space-between'>
                    {t('language')}: <Select
                        defaultValue={defaultLanguage}
                        onChange={handleChangeLanguage}
                        options={[
                            {
                                value: 'en',
                                label: 'EN',
                            },
                            {
                                value: 'vi',
                                label: 'VN',
                            }
                        ]}
                    />
                    <hr />
                    {t('theme')}: <Switch
                        defaultChecked={theme === 'dark-theme'}
                        onChange={handleChangeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </Flex>

                <hr />

                <div className="navbar-mobile-block">
                    <Link
                        onClick={() => setOpenDrawer(false)}
                        to='/browser-mentors'
                        className='link-item'
                    >
                        {t('browser mentors')}
                    </Link>

                    {currentUser
                        ?
                        <>
                            <Link
                                onClick={() => setOpenDrawer(false)}
                                to='/notification'
                                className='link-item'
                            >
                                {t('Notification')}
                            </Link>

                            <Link
                                onClick={() => setOpenDrawer(false)}
                                to='/schedule'
                                className='link-item'
                            >
                                {t('schedule')}
                            </Link>

                            <Link
                                onClick={() => setOpenDrawer(false)}
                                to='/schedule'
                                className='link-item'
                            >
                                {t('schedule')}
                            </Link>

                            <Link
                                onClick={() => setOpenDrawer(false)}
                                to='/wallet'
                                className='link-item'
                            >
                                <Flex gap='small'>{t('wallet')}: <Icon icon="twemoji:coin" /> <p> {currentUser?.point}</p></Flex>
                            </Link>
                        </>
                        :
                        <Link
                            onClick={() => setOpenDrawer(false)}
                            to='/login'
                            className='link-item'
                        >
                            {t('Login')}
                        </Link>
                    }

                    {currentUser &&
                        <>
                            <Link
                                onClick={() => setOpenDrawer(false)}
                                to='/gift'
                                className='link-item'
                            >
                                {t('Donation history')}
                            </Link>

                            <hr style={{ width: '100%' }} />

                            <Link
                                onClick={() => setOpenDrawer(false)}
                                to='/student/profile'
                                className='link-item'
                            >
                                {t('Your profile')}
                        </Link>
                        
                        <Link
                            onClick={() => {
                                setOpenDrawer(false)
                                setOpenModalBeMentor(true)
                            }}
                            className='link-item'
                        >
                            {t('become a mentor')}
                        </Link>

                            <Link className='link-item' style={{ color: 'red' }} onClick={handleLogout}>{t('logout')}</Link>
                        </>
                    }
                </div>
            </Drawer>

            <ModalBecomeMentor modalOpen={openModalBeMentor} setModalOpen={setOpenModalBeMentor} />
        </div>
    )
}

export default Header