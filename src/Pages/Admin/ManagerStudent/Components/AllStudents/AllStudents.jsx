import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Table } from "antd";
import { useEffect, useState } from "react";
import { getListStudent } from "../../../../../apis/admin";
import { Loading } from "../../../../../Components";


function AllStudents() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const { data: dataStudents, isLoading } = useQuery({ queryKey: ['list-student-admin'], queryFn: getListStudent })
    const [dataSource, setDataSource] = useState([])
    console.log(dataStudents)

    useEffect(() => {
        if (dataStudents) {
            setDataSource(
                dataStudents?.studentList.map((student, index) => ({
                    key: index,
                    id: student.accountId,
                    name: student.fullName,
                    email: student.email,
                    point: student.point,
                }))
            )
        }
    }, [dataStudents])


    const getDropDownItems = () => ([
        {
            label: 'Edit',
            key: '0',
            icon: <Icon icon="iconamoon:edit-bold" />,
        },
        {
            label: 'Delete',
            key: '3',
            danger: true,
            icon: <Icon icon="weui:delete-outlined" />,
        },
    ])


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
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Dropdown
                    menu={{ items: getDropDownItems(text, record) }}
                    trigger={['click']}
                >
                    <Button type="text"><Icon icon="lsicon:more-outline" /></Button>
                </Dropdown>
            )
        }
    ]


    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        align: 'center',
        onSelect: (record, seleted) => console.log(seleted)
    }

    if (isLoading) return (<Loading />)

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
    )
}

export default AllStudents;