import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DatePicker, Flex, Modal, TimePicker } from "antd"
import PropTypes from "prop-types"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from 'react-i18next'
import { createSchedule } from "../../../apis/mentor"
import { AuthContext } from "../../../Contexts/AuthContext"
import { disabledDateInPast, disableNotThing, disableTime, getDateNow } from "../../../utils/validate"

export default function ModalAddSlot({ modalOpen, setModalOpen }) {
     const { t } = useTranslation()
     const queryClient = useQueryClient()
     const { currentUser } = useContext(AuthContext)

     const [dateCustom, setDateCustom] = useState({ date: '0000-00-00', time: '00:00:00' })
     const [displayDate, setDisplayDate] = useState({ date: 'DD-MM-YYYY', time: '00:00' })

     const mutation = useMutation({
          mutationFn: ({ mentorId, slotStart, description }) => createSchedule(mentorId, description, slotStart),
          onSuccess: () => {
               toast.success(t('slot created success'))
               setModalOpen(false)
               queryClient.invalidateQueries(`available-slot-${currentUser.accountId}`)
          },
          onError: (error) => {
               toast.error(error.response.data.message)
          }
     })

     const handleAdd = () => {
          console.log(`${dateCustom.date} ${dateCustom.time}`);
          mutation.mutate({ mentorId: currentUser.accountId, slotStart: `${dateCustom.date} ${dateCustom.time}`, description: '' })
     }

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

     const handleAfterClose = () => {
          setDateCustom({ date: '0000-00-00', time: '00:00:00' })
          setDisplayDate({ date: 'DD-MM-YYYY', time: '00:00' })
     }

     return (
          <div>
               <Modal
                    title={<h2 style={{ margin: 0, color: '#1890ff' }}>{t('add your schedule')}</h2>}
                    centered
                    open={modalOpen}
                    okText={t('add slot')}
                    onOk={handleAdd}
                    okButtonProps={{ disabled: dateCustom.date === '0000-00-00' || dateCustom.time === '00:00:00' }}
                    onCancel={() => setModalOpen(false)}
                    confirmLoading={mutation.isPending}
                    width={400}
                    styles={{
                         body: {
                              padding: '24px'
                         }
                    }}
                    afterClose={handleAfterClose}
                    destroyOnClose
               >
                    <div style={{ textAlign: 'center' }}>
                         <h3 style={{
                              marginBottom: 20,
                              color: '#666',
                              fontSize: '16px',
                              fontWeight: 500
                         }}>
                              {t('select date and time')}
                         </h3>

                         <p style={{
                              marginBottom: 24,
                              fontSize: '15px',
                              color: '#333'
                         }}>
                              {t('scheduled for')}{' '}
                              <span style={{ fontWeight: 600, color: '#1890ff' }}>
                                   {displayDate.date}
                              </span>{' '}
                              {t('at')}{' '}
                              <span style={{ fontWeight: 600, color: '#1890ff' }}>
                                   {displayDate.time}
                              </span>
                         </p>

                         <Flex
                              justify="center"
                              gap='middle'
                              style={{ marginTop: '16px' }}
                         >
                              <DatePicker
                                   disabledDate={disabledDateInPast}
                                   format='DD-MM-YYYY'
                                   style={{ width: '160px' }}
                                   onChange={handleDatePick}
                                   placeholder={t('select date placeholder')}
                                   allowClear={false}
                              />
                              <TimePicker
                                   picker='time'
                                   onChange={handleTimePick}
                                   format='HH:mm'
                                   style={{ width: '120px' }}
                                   disabledTime={dateCustom.date === getDateNow() ? disableTime : disableNotThing}
                                   placeholder={t('select time placeholder')}
                                   allowClear={false}
                                   needConfirm={false}
                              />
                         </Flex>
                    </div>
               </Modal>
          </div>
     )
}

ModalAddSlot.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func
}
