import './AboutUs.scss';
import { Flex, Tooltip, Typography } from 'antd';

function AboutUs() {

     return (
          <div className='about-us'>
               <Flex justify='center' align='center' vertical className='container'>
                    <Typography.Title>GROUP 3</Typography.Title>
                    <Typography.Title level={2}>(SWP Mentor Booking)</Typography.Title>
                    <Typography.Title level={4}>Member</Typography.Title>
                    <Tooltip placement='right' title='Front-end'><Typography.Text className='member-name' keyboard>Nguyễn Huỳnh Bảo Trọng</Typography.Text></Tooltip>
                    <Tooltip placement='right' title='Back-end'><Typography.Text className='member-name' keyboard>Đinh Việt Hoàng</Typography.Text></Tooltip>
                    <Tooltip placement='right' title='Back-end'><Typography.Text className='member-name' keyboard>Hoàng Kim Long</Typography.Text></Tooltip>
                    <Tooltip placement='right' title='Back-end'><Typography.Text className='member-name' keyboard>Mai Nhật Hào</Typography.Text></Tooltip>
                    <Tooltip placement='right' title='Front-end'><Typography.Text className='member-name' keyboard>Lê Phạm Trường Huy</Typography.Text></Tooltip>
               </Flex>
          </div>
     );
}

export default AboutUs;