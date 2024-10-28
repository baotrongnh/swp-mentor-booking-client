import { Col, Menu, Row } from 'antd'
import Search from 'antd/es/transfer/search'
import { Link, useParams } from 'react-router-dom'
import AllStudents from './Components/AllStudents/AllStudents';
import './ManagerStudent.scss';

const ManagerStudent = () => {
    const onSearch = (value) => console.log(value)
    const { tab: currentTab } = useParams()

    const items = [
        {
            label: <Link to='/admin/student/all'>All Students</Link>,
            key: 'all',
        },
    ];

    return (
        <div className="manager-student">
            <div className="head-table">
                <Row>
                    <Col md={16}>
                        <Menu selectedKeys={currentTab} mode="horizontal" items={items} />
                    </Col>
                    <Col md={8}>
                        <Search
                            placeholder="Find student..."
                            allowClear
                            onSearch={onSearch}
                            className='search-input'
                        />
                    </Col>
                </Row>
            </div>

            {currentTab === 'all' && <AllStudents />}
        </div>
    )
}
export default ManagerStudent;
