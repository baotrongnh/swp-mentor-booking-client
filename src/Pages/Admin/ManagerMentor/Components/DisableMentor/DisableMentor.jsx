import { QuestionCircleOutlined } from '@ant-design/icons';
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Table, Tag } from "antd";
import { useState } from "react";
import { getListDisableMentor } from "../../../../../apis/admin";

function AllMentor() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
     const { data } = useQuery({ queryKey: ['list-mentors-disable-admin'], queryFn: getListDisableMentor });
     const dataSource = data?.mentorList.map((mentor) => ({
          key: mentor.id,
          name: mentor.fullName,
          email: mentor.email,
          point: mentor.point || 'null',
          rating: mentor.averageRating || '#',
          skills: ['ReactJS']
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
               align: 'center',
               // defaultSortOrder: 'descend',
               sorter: (a, b) => a.point - b.point,
          },
          {
               title: 'Rating',
               dataIndex: 'rating',
               align: 'center',
               sorter: (a, b) => a.point - b.point,
          },
          {
               title: 'Skills',
               key: 'tags',
               dataIndex: 'skills',
               align: 'center',
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
               ),
               filters: [
                    {
                         text: 'ReactJS',
                         value: 'ReactJS',
                    },
                    {
                         text: 'NodeJS',
                         value: 'NodeJS',
                    },
               ],
               onFilter: (value, record) => record.skills.some((skill) => skill.indexOf(value) === 0),
          },
          {
               title: 'Delete',
               key: 'action',
               align: 'center',
               render: (text) => (
                    <Popconfirm okText='Delete' title="Sure to delete?"
                         onConfirm={() => console.log(text)}
                         icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                         <Button type="text" danger>Delete</Button>
                    </Popconfirm>
               )
          },
          {
               title: 'Edit',
               key: 'action',
               align: 'center',
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
          align: 'center'
     };

     return (
          <div className="all-mentors">
               <Table scroll={{ y: '76vh' }} pagination={{ position: ['bottomCenter'] }} rowSelection={rowSelection} columns={columns} dataSource={dataSource}
               />
          </div>
     );
}

export default AllMentor;