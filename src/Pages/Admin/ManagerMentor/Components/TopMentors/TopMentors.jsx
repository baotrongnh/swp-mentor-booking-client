import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Table, Tag } from "antd";
import { useState } from "react";

function TopMentor() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([]);

     const dataSource = Array.from({
          length: 10,
     }).map((_, i) => ({
          key: i,
          name: `Mentor Name FPT ${i}`,
          email: 'abcxys12345@.edu.vn',
          point: 999,
          rating: 4.5,
          skills: ['ReactJS', 'NodeJS', 'C#', 'Java']
     }));

     const columns = [
          {
               title: 'Name',
               dataIndex: 'name',
          },
          {
               title: 'Email',
               dataIndex: 'email',
          },
          {
               title: 'Point',
               dataIndex: 'point',
          },
          {
               title: 'Rating',
               dataIndex: 'rating',
          },
          {
               title: 'Skills',
               key: 'tags',
               dataIndex: 'skills',
               render: (skills) => (
                    <>
                         {skills.map((skill) => {
                              return (
                                   <Tag color='cyan' key={skill}>
                                        {skill}
                                   </Tag>
                              );
                         })}
                    </>
               )
          },
          {
               title: 'Delete',
               key: 'action',
               render: (text) => (
                    <Button type="text" danger onClick={() => console.log(text)}>Delete</Button>
               )
          },
          {
               title: 'Edit',
               key: 'action',
               render: (text) => (
                    <Button type='text' onClick={() => console.log(text)}><Icon icon="iconamoon:edit" /></Button>
               )
          }
     ];

     const onSelectChange = (newSelectedRowKeys) => {
          console.log('selectedRowKeys changed: ', newSelectedRowKeys);
          setSelectedRowKeys(newSelectedRowKeys);
     };

     const rowSelection = {
          selectedRowKeys,
          onChange: onSelectChange,
     };

     return (
          <div className="top-mentors">
               <Table pagination={true} rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
          </div>
     );
}

export default TopMentor;