import { useQuery } from '@tanstack/react-query'
import { Breadcrumb, Button, Empty, Flex } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { getListGift } from '../../apis/items'
import { formatCurrencyVND } from '../../utils/format'
import { useTranslation } from 'react-i18next';
import { getTotalDonation } from '../../apis/payment'

const Gift = () => {
     const { currentUser } = useContext(AuthContext)
     const [isMentor, setIsMentor] = useState(false)
     const [selectedGift, setSelectedGift] = useState(null)
     const { t } = useTranslation();

     const { data: dataGift } = useQuery({
          queryKey: ['gift'], queryFn: () => getListGift(currentUser?.isMentor === 0 ? 'student' : 'mentor', currentUser?.accountId)
     })

     const { data: totalDonation } = useQuery({
          queryKey: ['total-donation'],
          queryFn: () => getTotalDonation(currentUser?.accountId)
     })

     useEffect(() => {
          if (currentUser?.isMentor === 0) {
               setIsMentor(false)
          } else {
               setIsMentor(true)
          }
     }, [currentUser])

     console.log(isMentor);

     return (
          <div className='container'>
               {!isMentor && (
                    <Breadcrumb
                         style={{ padding: '20px 0' }}
                         items={[
                              {
                                   title: <Link to='/'>{t('Home')}</Link>,
                              },
                              {
                                   title: <Link to='/browser-mentors'>{t('Browse mentors')}</Link>,
                              },
                              {
                                   title: isMentor ? t('Gift') : t('Donation history'),
                              },
                         ]}
                    />
               )}
               {dataGift?.donates.length === 0
                    ?
                    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Empty /></div>
                    :
                    <div style={{
                         fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                         minHeight: '100vh',
                         padding: '2rem',
                         boxSizing: 'border-box',
                    }}>
                         <h1 style={{
                              color: '#3498db',
                              fontSize: '3.5rem',
                              textAlign: 'center',
                              marginBottom: '1rem',
                              fontWeight: '300',
                              textTransform: 'uppercase',
                              letterSpacing: '2px',
                         }}>
                              {isMentor ? t('Gifts Received from Donations') : t('History of sent gifts')}
                         </h1>
                         <p style={{
                              textAlign: 'center',
                              color: '#7f8c8d',
                              marginBottom: '2rem',
                              fontSize: '1.2rem',
                         }}>
                              {t('Total Value')}: {formatCurrencyVND(totalDonation?.totalAmount)}
                         </p>

                         <Flex justify='end'><Button style={{margin: '20px 0'}}>Withdraw all</Button></Flex>
                         <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              maxWidth: '1200px',
                              margin: '0 auto',
                         }}>
                              <ul style={{
                                   listStyle: 'none',
                                   padding: 0,
                                   margin: 0,
                                   width: '60%',
                              }}>
                                   {dataGift?.donates.map((gift) => (
                                        <li key={gift.id} style={{
                                             backgroundColor: '#b8b8b83b',
                                             borderRadius: '10px',
                                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                             overflow: 'hidden',
                                             marginBottom: '2rem',
                                             display: 'flex',
                                             transition: 'all 0.3s ease-in-out',
                                             cursor: 'pointer',
                                             border: selectedGift && selectedGift.id === gift.id ? '2px solid #3498db' : '2px solid transparent',
                                        }}
                                             onClick={() => setSelectedGift(gift)}
                                             onMouseEnter={(e) => {
                                                  e.currentTarget.style.transform = 'translateY(-5px)';
                                                  e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
                                             }}
                                             onMouseLeave={(e) => {
                                                  e.currentTarget.style.transform = 'translateY(0)';
                                                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                                             }}
                                        >
                                             <img src={gift.item.imgPath} alt={gift.item.name} style={{
                                                  width: '150px',
                                                  height: '150px',
                                                  objectFit: 'cover',
                                             }} />
                                             <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                                                  <h2 style={{
                                                       color: '#3498db',
                                                       fontSize: '2.5rem',
                                                       marginBottom: '0.5rem',
                                                       fontWeight: '500',
                                                  }}>
                                                       {gift.item.name}
                                                  </h2>
                                                  <p style={{
                                                       fontSize: '1.8rem',
                                                       fontWeight: 'bold',
                                                       marginBottom: '0.5rem',
                                                  }}>
                                                       {formatCurrencyVND(gift.item.price)}
                                                  </p>
                                                  <p style={{
                                                       color: '#7f8c8d',
                                                       fontSize: '1.3rem',
                                                       marginBottom: '0.5rem',
                                                  }}>
                                                       {!isMentor ? (
                                                            <>{t('Send')}: {gift?.createdAt}</>
                                                       ) : (
                                                            <>{t('Received')}: {gift.createdAt}</>
                                                       )}
                                                  </p>
                                                  <p style={{
                                                       color: '#3498db',
                                                       fontSize: '1.4rem',
                                                       fontStyle: 'italic',
                                                  }}>
                                                       {!isMentor ? (
                                                            <>{t('To')}: {gift?.mentor?.fullName}</>
                                                       ) : (
                                                            <>{t('From')}: {gift?.student.fullName}</>
                                                       )}
                                                  </p>
                                             </div>
                                        </li>
                                   ))}
                              </ul>
                              <div style={{
                                   width: '35%',
                                   position: 'sticky',
                                   top: '2rem',
                                   alignSelf: 'flex-start',
                                   backgroundColor: '#b8b8b83b',
                                   borderRadius: '10px',
                                   padding: '1.5rem',
                                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                              }}>
                                   {selectedGift ? (
                                        <>
                                             <h2 style={{
                                                  color: '#3498db',
                                                  fontSize: '1.8rem',
                                                  marginBottom: '1rem',
                                                  fontWeight: '500',
                                             }}>
                                                  {selectedGift.item.name}
                                             </h2>
                                             <img src={selectedGift.item.imgPath} alt={selectedGift.name} style={{
                                                  width: '100%',
                                                  height: '200px',
                                                  objectFit: 'cover',
                                                  borderRadius: '5px',
                                                  marginBottom: '1rem',
                                             }} />
                                             <p style={{
                                                  fontSize: '1.75rem',
                                                  fontWeight: 'bold',
                                                  marginBottom: '0.5rem',
                                             }}>
                                                  {formatCurrencyVND(selectedGift.item.price)}
                                             </p>
                                             <p style={{
                                                  color: '#7f8c8d',
                                                  fontSize: '1.3rem',
                                                  marginBottom: '0.5rem',
                                             }}>
                                                  {!isMentor ? (
                                                       <>{t('Send')}: {selectedGift.createdAt}</>
                                                  ) : (
                                                       <>{t('Received')}: {selectedGift.createdAt}</>
                                                  )}
                                             </p>
                                             <p style={{
                                                  color: '#3498db',
                                                  fontSize: '1.6rem',
                                                  fontStyle: 'italic',
                                                  marginBottom: '1rem',
                                             }}>
                                                  {!isMentor ? (
                                                       <>{t('To')}: {selectedGift.mentor.fullName}</>
                                                  ) : (
                                                       <>{t('From')}: {selectedGift.student.fullName}</>
                                                  )}
                                             </p>
                                             <p style={{
                                                  fontSize: '1.5rem',
                                                  lineHeight: '1.5',
                                             }}>
                                                  {t('No description')}
                                             </p>
                                        </>
                                   ) : (
                                        <p style={{
                                             fontSize: '1.8rem',
                                             textAlign: 'center',
                                        }}>
                                             {t('Select a gift to view details')}
                                        </p>
                                   )}
                              </div>
                         </div>
                    </div>
               }
          </div>
     )
}

export default Gift