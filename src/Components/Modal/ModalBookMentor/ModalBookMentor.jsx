import { Button, DatePicker, Modal, Tabs } from "antd";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import './ModalBookMentor.scss';

function ModalBookMentor({ modalOpen, setModalOpen, currentIdMentor }) {
     const [tab, setTab] = useState('2');
     const [dateCustom, setDateCustom] = useState({ date: '0000-00-00', time: '00:00:00' });
     const [displayDate, setDisplayDate] = useState({ date: 'DD-MM-YYYY', time: '00:00' });
     const { currentUser, setCurrentUser } = useContext(AuthContext);

     const onChangeTabs = (key) => {
          setTab(key);
     };

     const handleDatePick = (date, dateString) => {
          setDisplayDate({ ...displayDate, date: dateString });
          const [day, month, year] = dateString.split('-');
          const formattedDate = `${year}-${month}-${day}`;
          setDateCustom({ ...dateCustom, date: formattedDate });
     };

     const handleTimePick = (time, timeString) => {
          setDisplayDate({ ...displayDate, time: timeString })
          setDateCustom({ ...dateCustom, time: timeString });
     }

     const handleBookMentor = () => {
          console.log(`Time booking: ${dateCustom.date} ${dateCustom.time}`);
          console.log('StudentID: ' + currentUser.id);
          console.log('MentorID: ' + currentIdMentor);
          setCurrentUser({ ...currentUser, point: currentUser.point - 10 });
          setModalOpen(false);
     }

     const itemTabs = [
          {
               key: '1',
               label: 'Available Schedule',
          },
          {
               key: '2',
               label: 'Custom Schedule',
          }
     ];

     return (
          <div className="modal-book-mentor">
               <Modal
                    title='Book mentor'
                    centered
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    footer={false}
               >
                    <div className="inside-modal-book">
                         <Tabs style={{ width: '100%' }} defaultActiveKey="2" items={itemTabs} onChange={onChangeTabs} />

                         <div className="select-time-block" >
                              {tab === '1'
                                   ?
                                   <div className="available-block" >
                                        <h1 className="title">Available time</h1>
                                        <div className="date-block">
                                        </div>
                                   </div>
                                   :
                                   <div className="custom-block">
                                        <h1 className="title">Select Date & Time</h1>

                                        <p className="time-view">Scheduled for <b>{displayDate.date}</b> at <b>{displayDate.time}</b></p>

                                        <div className='select-block'>
                                             <DatePicker format='DD-MM-YYYY' className='pick-date' onChange={handleDatePick} />
                                             <DatePicker className='pick-time' picker='time' onChange={handleTimePick} />
                                        </div>
                                   </div>
                              }
                         </div>

                         <div className="btn-block">
                              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                              <Button type="primary" disabled={currentUser.point < 10} onClick={handleBookMentor}>Book</Button>
                         </div>
                    </div>
               </Modal>
          </div>
     );
}

export default ModalBookMentor;

ModalBookMentor.propTypes = {
     modalOpen: PropTypes.bool,
     setModalOpen: PropTypes.func,
     currentIdMentor: PropTypes.any
}