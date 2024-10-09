// ManagerStudent.jsx
import { useState } from 'react';
import { Table, Space, Button, Image } from 'antd';
import { Icon } from '@iconify/react';
import './ManagerStudent.scss';

const columns = (handleEdit, handleDelete) => [
    {
        title: 'Photo',
        dataIndex: 'photo',
        key: 'photo',
        render: (text) => (
            <Image
                src={text}
                alt="Student"
                preview={{
                    src: text,
                    mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '1.5rem', height: '1.5rem' }} /></div>
                }}
                className="avatar-image"
            />
        ),
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button onClick={() => handleEdit(record)}>
                    <Icon icon="uil:edit" /> Edit
                </Button>
                <Button onClick={() => handleDelete(record.key)} danger>
                    <Icon icon="mdi:trash-outline" /> Delete
                </Button>
            </Space>
        ),
    },
];

const data = [
    {
        photo: 'https://via.placeholder.com/50',
        key: '1',
        name: 'John Brown',
        point: 32,
        email: 'doraemon@fpt.edu.vn',
    },
    {
        photo: 'https://via.placeholder.com/50',
        key: '2',
        name: 'Jim Green',
        point: 42,
        email: 'songoku@fpt.edu',
    },
    {
        photo: 'https://via.placeholder.com/50',
        key: '3',
        name: 'Harry Potter',
        point: 75,
        email: 'harry@hogwarts.edu',
    },
    {
        photo: 'https://via.placeholder.com/50',
        key: '4',
        name: 'Tony Stark',
        point: 85,
        email: 'ironman@avengers.com',
    },
    {
        photo: 'https://via.placeholder.com/50',
        key: '5',
        name: 'Bruce Wayne',
        point: 50,
        email: 'batman@wayne.com',
    },
    {
        photo: 'https://via.placeholder.com/50',
        key: '6',
        name: 'Steve Rogers',
        point: 65,
        email: 'cap@avengers.com',
    },
];

const ManagerStudent = () => {
    const [hasData] = useState(true);

    const handleEdit = (record) => {
        alert(`Editing student: ${record.name}`);
    };

    const handleDelete = (key) => {
        alert(`Deleting student with key: ${key}`);
    };

    return (
        <div className='manager-student'>
            <div className="container">
                <div className="manager-student-head">
                    <h1>List of Students</h1>
                </div>
                <div className="manager-student-content">
                    <Table
                        columns={columns(handleEdit, handleDelete)}
                        dataSource={hasData ? data : []}
                        pagination={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManagerStudent;

