import { Col, Menu, Row } from "antd";
import ShowCalendar from "./Components/Calendar/Calendar.jsx";
import CommingBooking from "./Components/CommingBooking/CommingBooking.jsx";
import AllBooking from "./Components/AllBooking/AllBooking.jsx";
import './Schedule.scss'
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
                    <Row align='center'>
                         <Col span={17} className='content' align='center'>
                              <h1 className="title">Booking List</h1>
                              <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />
                              <div className="booking-list">
                                   {currentTab === 'comming' && <CommingBooking />}
                                   {currentTab === 'all' && <AllBooking />}
                              </div>
                         </Col>

                         <Col span={7} className='calendar' align='center'>
                              <ShowCalendar />
                         </Col>
                    </Row>
               </div>


          </div>
     );
}

export default Schedule;