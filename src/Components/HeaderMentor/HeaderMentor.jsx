import { Icon } from '@iconify/react/dist/iconify.js'
import { Badge, Button, Col, Drawer, Dropdown, Flex, Row, Select, Switch } from 'antd'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import defaultAvatar from '../../assets/Photos/avatar/default_avatar.jpg'
import logo from '../../assets/Photos/logo/logo.png'
import { AppContext } from '../../Contexts/AppContext'
import { AuthContext } from '../../Contexts/AuthContext'
import { deleteToken } from '../../utils/storageUtils'
import { ModalAddSlot } from '../Modal'
import './HeaderMentor.scss'

function HeaderMentor({ dataUnread }) {
     const { t, i18n } = useTranslation()
     const { setTheme, theme, defaultLanguage } = useContext(AppContext)
     const { currentUser, setCurrentUser } = useContext(AuthContext)
     const [openDrawer, setOpenDrawer] = useState(false)
     const [openDropDownAccount, setOpenDropDownAccount] = useState(false)
     const [openModalAddSkill, setOpenModalAddSkill] = useState(false)

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

     const accountMenuDropDown = [
          { type: 'divider' },
          {
               label: <Link to={`/mentor/profile/${currentUser?.accountId}`}>{t('profile')}</Link>,
               key: '0',
          },
          {
               label: <Link to='/wallet'><Flex gap='small' align='center'>{t('wallet')}: <Icon icon="twemoji:coin" /><p> {currentUser?.point}</p></Flex></Link>,
               key: '1',
          },
          {
               label: <Flex onClick={() => setOpenModalAddSkill(true)} gap='small' align='center'>Add schedule</Flex>,
               key: '9',
          },
          { type: 'divider' },
          {
               label: <Flex gap='small' justify='space-between'>
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
               label: <Flex gap='small' align='center' justify='space-between'>
                    {t('language')}: <Select
                         defaultValue="en"
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

     return (
          <div className="header-mentor">
               <div className="container">
                    <Row className='header-block'>
                         <Col className='logo-block' xs={12} sm={12} md={12} lg={12}>
                              <Link to='/'>
                                   <img className='logo-img' src={logo} alt="" />
                              </Link>
                         </Col>

                         <Col xs={12} lg={0} className='btn-navbar-mobile'>
                              <Button onClick={() => setOpenDrawer(true)} type='text'>
                                   <Icon className='icon' icon="ic:round-menu" />
                              </Button>
                         </Col>

                         <Col xs={0} md={0} lg={12}>
                              <div className='btn-block'>
                                   <NavLink to='/gift' className='navbar-link'>{t('Gift')}</NavLink>
                                   <NavLink to='/schedule' className='navbar-link'>{t('schedule')}</NavLink>
                                   <NavLink to={`/mentor/profile/${currentUser?.accountId}`} className='navbar-link'>{t('Manager slot')}</NavLink>

                                   <NavLink to='/notification' className='navbar-link'>
                                        <Badge size='small' count={dataUnread?.numberOfUnreadNotifications} showZero color="#faad14" >
                                             <Icon style={{ fontSize: '3rem' }} icon="material-symbols-light:notifications-outline" />
                                        </Badge>
                                   </NavLink>

                                   <div >
                                        <Flex align='center'>
                                             <Link to={`/mentor/profile/${currentUser?.accountId}`} className='navbar-link account'>
                                                  {currentUser?.imgPath
                                                       ? <img className='avatar' src={currentUser?.imgPath} alt="" onError={(e) => e.target.src = defaultAvatar} />
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
                         </Col>
                    </Row>
               </div>

               <Drawer
                    className='navbar-drawer'
                    placement='right'
                    width={350}
                    title="Basic Drawer"
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
                              to='/gift'
                              className='link-item'
                         >
                              {t('Gift')}
                         </Link>

                         <Link
                              onClick={() => setOpenDrawer(false)}
                              to={`/schedule`}
                              className='link-item'
                         >
                              {t('schedule')}
                         </Link>

                         <Link
                              onClick={() => setOpenDrawer(false)}
                              to='/wallet'
                              className='link-item'
                         >
                              {t('Wallet')}
                         </Link>

                         <hr style={{ width: '100%' }} />

                         <Link
                              onClick={() => setOpenDrawer(false)}
                              to={`/mentor/profile/${currentUser?.accountId}`}
                              className='link-item'
                         >
                              {t('Profile')}
                         </Link>

                         <Link className='link-item' style={{ color: 'red' }} onClick={handleLogout}>{t('logout')}</Link>
                    </div>
               </Drawer>

               <ModalAddSlot modalOpen={openModalAddSkill} setModalOpen={setOpenModalAddSkill} />
          </div>
     )
}

export default HeaderMentor

HeaderMentor.propTypes = {
     dataUnread: PropTypes.object
}