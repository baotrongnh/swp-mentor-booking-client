import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Table, Tag } from "antd";
import { useState } from "react";
import { getListMentor } from "../../../../../apis/admin";
import { loadAllSkills } from "../../../../../apis/mentor";

function AllMentor() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
     const { data: listSkills } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills });
     const { data, isLoading } = useQuery({ queryKey: ['list-mentors-admin'], queryFn: getListMentor });
     const dataSource = data?.mentorList.map((mentor) => ({
          key: mentor.id,
          name: mentor.fullName,
          email: mentor.email,
          point: mentor.point || 'null',
          rating: mentor.averageRating || '#',
          skills: ['ReactJS']
     }));

     const getDropDownItems = (text) => ([
          {
               label: 'Edit',
               key: '0',
               icon: <Icon icon="iconamoon:edit-bold" />
          },
          {
               label: 'Delete',
               key: '3',
               danger: true,
               icon: <Icon icon="weui:delete-outlined" />,
               onClick: () => console.log(text)
          },
     ]);

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
               filters: listSkills?.map(skill => (
                    {
                         text: skill.name,
                         value: skill.name,
                    }
               )),
               onFilter: (value, record) => record.skills.some((skill) => skill.indexOf(value) === 0),
          },
          {
               title: '',
               key: 'action',
               align: 'center',
               render: (text) => (
                    <Dropdown
                         menu={{
                              items: getDropDownItems(text),
                         }}
                         trigger={['click']}
                    >
                         <Button type="text"><Icon icon="lsicon:more-outline" /></Button>
                    </Dropdown>
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
          align: 'center',
          onSelect: (record, seleted) => console.log(seleted)
     };

     if (isLoading) {
          return (
               <h1>Loading</h1>
          )
     }

     return (
          <div className="all-mentors">
               <Table
                    scroll={{ y: '76vh' }}
                    pagination={{ position: ['bottomCenter'] }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
               />
          </div>
     );
}

export default AllMentor;