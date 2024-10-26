import { useMutation, useQuery } from "@tanstack/react-query"
import { Button, DatePicker, Empty, Modal, Select, Tabs, Typography } from "antd"
import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react"
import { bookingMentor } from "../../../apis/booking"
import { getAvailableSlot } from "../../../apis/mentor"
import { AppContext } from "../../../Contexts/AppContext"
import { AuthContext } from "../../../Contexts/AuthContext"
import './ModalBookMentor.scss'
import { disabledDateInPast } from "../../../utils/validate"

function ModalBookMentor({ modalOpen, setModalOpen, currentIdMentor }) {
     const [isValidate, setIsValidate] = useState(false)
     const [tab, setTab] = useState('1')
     const [dateCustom, setDateCustom] = useState({ date: '0000-00-00', time: '00:00:00' })
     const [displayDate, setDisplayDate] = useState({ date: 'DD-MM-YYYY', time: '00:00' })
     const [slotAvailableSelect, setSlotAvailableSelect] = useState()
     const { currentUser, setCurrentUser } = useContext(AuthContext)
     const { t } = useContext(AppContext)
     
     const mutation = useMutation({
          mutationFn: ({ mentorId, studentId, startTime }) => bookingMentor(mentorId, studentId, startTime),
          onError: (error) => {
               console.log(error)
          },
          onSuccess: (data) => {
               console.log(data)
          },
     })

     const { data: listAvailableSlot } = useQuery({
          queryKey: [`available-slot-${currentIdMentor}`, currentIdMentor],
          queryFn: () => getAvailableSlot(currentIdMentor),
          enabled: !!currentIdMentor
     })

     const onChangeTabs = (key) => {
          setTab(key)
          setDateCustom({ date: '0000-00-00', time: '00:00:00' })
     }

     useEffect(() => {
          if (tab === '2') {
               if ((dateCustom.date !== '0000-00-00' && dateCustom.time !== '00:00:00')) {
                    setIsValidate(true)
               } else {
                    setIsValidate(false)
               }
          } else {
               if (slotAvailableSelect) {
                    setIsValidate(true)
               } else {
                    setIsValidate(false)
               }
          }
     }, [dateCustom, tab, slotAvailableSelect])

     const handleDatePick = (date, dateString) => {
          setDisplayDate({ ...displayDate, date: dateString })
          const [day, month, year] = dateString.split('-')
          const formattedDate = `${year}-${month}-${day}`
          setDateCustom({ ...dateCustom, date: formattedDate })
     }

     const handleTimePick = (time, timeString) => {
          setDisplayDate({ ...displayDate, time: timeString })
          setDateCustom({ ...dateCustom, time: timeString })
     }

     const handleBookMentor = () => {
          console.log(`Time booking: ${dateCustom.date} ${dateCustom.time}`)
          console.log('StudentID: ' + currentUser.accountId)
          console.log('MentorID: ' + currentIdMentor)
          mutation.mutate({
               mentorId: currentIdMentor,
               studentId: currentUser.accountId,
               startTime: tab === '1' ? slotAvailableSelect : `${dateCustom.date} ${dateCustom.time}`,
          })
          setCurrentUser({ ...currentUser, point: currentUser.point - 10 })
          setModalOpen(false)
     }

     const itemTabs = [
          {
               key: '1',
               label: t('Available Schedule'),
          },
          {
               key: '2',
               label: t('Custom Schedule'),
          }
     ]

     const handleSelectSlotAvailable = (value, object) => {
          setSlotAvailableSelect(object.label)
          // setSlotAvailableSelect(value)
          // console.log(e)
     }

     return (
          <div className="modal-book-mentor">
               <Modal
                    title={t('Book mentor')}
                    centered
                    open={modalOpen}
                    onCancel={() => {
                         setModalOpen(false)
                         setSlotAvailableSelect(null)
                    }}
                    footer={false}
               >
                    <div className="inside-modal-book">
                         <Tabs style={{ width: '100%' }} defaultActiveKey="1" items={itemTabs} onChange={onChangeTabs} />

                         <div className="select-time-block" >
                              {tab === '1'
                                   ?
                                   <div className="available-block">
                                        {listAvailableSlot?.slots.length > 0
                                             ?
                                             <>
                                                  <h1 className="title">{t('Available time')}</h1>
                                                  <Select
                                                       showSearch
                                                       placeholder={t('Select a slot')}
                                                       value={slotAvailableSelect}
                                                       filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                       }
                                                       options={
                                                            listAvailableSlot?.slots.map((slot) => (
                                                                 {
                                                                      value: slot.id,
                                                                      label: slot.slotStart,
                                                                 }
                                                            ))
                                                       }
                                                       defaultActiveFirstOption
                                                       onChange={handleSelectSlotAvailable}
                                                       style={{ width: '100%', marginTop: '10px' }}
                                                       allowClear
                                                  />
                                             </>
                                             :
                                             <>
                                                  <Empty
                                                       image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                       imageStyle={{
                                                            height: 60,
                                                       }}
                                                       description={
                                                            <Typography.Text>
                                                                 {t('This Mentor has no available slot.')}
                                                            </Typography.Text>
                                                       }
                                                  ></Empty>
                                             </>
                                        }
                                   </div>
                                   :
                                   <div className="custom-block">
                                        <h1 className="title">Select Date & Time</h1>

                                        <p className="time-view">Scheduled for <b>{displayDate.date}</b> at <b>{displayDate.time}</b></p>

                                        <div className='select-block'>
                                             <DatePicker disabledDate={disabledDateInPast} format='DD-MM-YYYY' className='pick-date' onChange={handleDatePick} />
                                             <DatePicker className='pick-time' picker='time' onChange={handleTimePick} />
                                        </div>
                                   </div>
                              }
                         </div>

                         <div className="btn-block">
                              <Button onClick={() => setModalOpen(false)}>{t('Cancel')}</Button>
                              <Button type="primary" disabled={currentUser?.point < 10 || !isValidate} onClick={handleBookMentor}>{t('book')}</Button>
                         </div>
                    </div>
               </Modal>
          </div>
     )
}

export default ModalBookMentor

ModalBookMentor.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func,
     currentIdMentor: PropTypes.any
}