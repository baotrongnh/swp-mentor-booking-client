import { Icon } from "@iconify/react/dist/iconify.js"
import { useQuery } from "@tanstack/react-query"
import { Button, Dropdown, Table } from "antd"
import { useEffect, useState } from "react"
import axiosClient from "../../../apis/axiosClient"
import { Loading } from "../../../Components"
import { getToken } from "../../../utils/storageUtils"

function ManagerReport() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [dataSource, setDataSource] = useState([])

    const getListItem = async () => {
        const token = getToken()
        return axiosClient(token).get('/item/all/')
    }

    const { data: listItems, isLoading } = useQuery({ queryKey: ['list-items'], queryFn: getListItem })


    const formatNumber = (price) => {
        return Intl.NumberFormat('de-DE').format(price)
    }

    useEffect(() => {
        if (listItems) {
            setDataSource(
                listItems?.items.map((item) => ({
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    price: formatNumber(item.price)
                }))
            )
        }
    }, [listItems])


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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: 'center',
            sorter: (a, b) => a.mentorCount - b.mentorCount,
        },
        {
            title: '',
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
        <div className="all-items">
            <Button>+ Add Item</Button>
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

export default ManagerReport