import { Col, Menu, Row } from "antd";
import ShowCalendar from "./Components/Calendar/Calendar.jsx";
import CommingBooking from "./Components/CommingBooking/CommingBooking.jsx";
import AllBooking from "./Components/AllBooking/AllBooking.jsx";
import './Schedule.scss';
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../Contexts/AppContext.jsx";
import CompletedBooking from "./Components/CompletedBooking/CompletedBooking.jsx";

function Schedule() {
     const [currentTab, setCurrentTab] = useState('comming');
     const [selectedDate, setSelectedDate] = useState(null);
     const [bookingDates, setBookingDates] = useState([]);
     const { t } = useContext(AppContext)

     const onClick = (e) => {
          console.log('click ', e);
          setCurrentTab(e.key);
          setSelectedDate(null)
     };

     const handleBookingDate = useCallback((date) => {
          setBookingDates(date)
     }, [])

     const handleDateSelected = (day) => {
          setSelectedDate(day)
     }

     const items = [
          {
               label: `${t('comming booking')}`,
               key: 'comming',
          },
          {
               label: `${t('completed booking')}`,
               key: 'completed',
          },
          {
               label: `${t('all booking')}`,
               key: 'all',
          },
     ];

     return (
          <div className="schedule">
               <div className="container">
                    <h1 className="title">{t('booking list')}</h1>
                    <Row align="top" gutter={[16, 16]}>
                         <Col
                              span={17}
                              xs={24}
                              md={17}
                              className="content"
                         >
                              <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                              <div className="booking-list">
                                   {currentTab === 'comming' && <CommingBooking selectedDate={selectedDate} onBookingDatesChange={handleBookingDate} />}
                                   {currentTab === 'completed' && <CompletedBooking selectedDate={selectedDate} onBookingDatesChange={handleBookingDate} />}
                                   {currentTab === 'all' && <AllBooking selectedDate={selectedDate} onBookingDatesChange={handleBookingDate} />}
                              </div>
                         </Col>

                         <Col
                              span={7}
                              xs={0}
                              md={7}
                              className="calendar"
                         >
                              <ShowCalendar onDaySelect={handleDateSelected} bookingDates={bookingDates} />
                         </Col>
                    </Row>
               </div>
          </div>
     );
}

export default Schedule;