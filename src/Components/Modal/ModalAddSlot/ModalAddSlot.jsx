import { DatePicker, Flex, Modal, TimePicker } from "antd"
import PropTypes from "prop-types"
import { useState } from "react"
import { disabledDateInPast, disableNotThing, disableTime, getDateNow } from "../../../utils/validate"

export default function ModalAddSlot({ modalOpen, setModalOpen }) {
     const [dateCustom, setDateCustom] = useState({ date: '0000-00-00', time: '00:00:00' })
     const [displayDate, setDisplayDate] = useState({ date: 'DD-MM-YYYY', time: '00:00' })

     const handleAdd = () => {

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

     return (
          <div>
               <Modal
                    title="Add your schedule"
                    centered
                    open={true}
                    okText='Add'
                    onOk={handleAdd}
                    onCancel={() => setModalOpen(false)}
               >
                    <h1 className="title">Select Date & Time</h1>

                    <p className="time-view">Scheduled
                         for <b>{displayDate.date}</b> at <b>{displayDate.time}</b></p>

                    <Flex justify="center" gap='middle'>
                         <DatePicker
                              disabledDate={disabledDateInPast}
                              format='DD-MM-YYYY'
                              className='pick-date'
                              onChange={handleDatePick}
                         />
                         <TimePicker
                              className='pick-time'
                              picker='time'
                              onChange={handleTimePick}
                              format='HH:mm'
                              disabledTime={dateCustom.date === getDateNow() ? disableTime : disableNotThing}
                         />
                    </Flex>
               </Modal>
          </div>
     )
}

ModalAddSlot.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func,
}
