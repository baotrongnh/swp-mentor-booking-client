import { Col, Menu, Row } from "antd";
import ShowCalendar from "./Components/Calendar/Calendar.jsx";
import CommingBooking from "./Components/CommingBooking/CommingBooking.jsx";
import AllBooking from "./Components/AllBooking/AllBooking.jsx";
import './Schedule.scss';
import { useState } from "react";

function Schedule() {
     const [currentTab, setCurrentTab] = useState('comming');

     const onClick = (e) => {
          console.log('click ', e);
          setCurrentTab(e.key);
     };

     const items = [
          {
               label: 'Comming Booking',
               key: 'comming',
          },
          {
               label: 'All Booking',
               key: 'all',
          },
     ];

     return (
          <div className="schedule">
               <div className="container">
                    <h1 className="title">Booking List</h1>
                    <Row align="top" gutter={[16, 16]}>
                         <Col
                              span={17}
                              xs={24}
                              md={17}
                              className="content"
                         >
                              <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                              <div className="booking-list">
                                   {currentTab === 'comming' && <CommingBooking />}
                                   {currentTab === 'all' && <AllBooking />}
                              </div>
                         </Col>

                         <Col
                              span={7}
                              xs={0}
                              md={7}
                              className="calendar"
                         >
                              <ShowCalendar />
                         </Col>
                    </Row>
               </div>
          </div>
     );
}

export default Schedule;