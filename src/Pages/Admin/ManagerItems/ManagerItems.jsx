import { Icon } from "@iconify/react/dist/iconify.js"
import { useQuery } from "@tanstack/react-query"
import { Button, Dropdown, Table } from "antd"
import { useEffect, useState } from "react"
import axiosClient from "../../../apis/axiosClient"
import { Loading } from "../../../Components"
import { getToken } from "../../../utils/storageUtils"
import ModalUpdate from "./Components/ModalUpdate/ModalUpdate"

function ManagerItems() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([])
     const [dataSource, setDataSource] = useState([])
     const [updateShow, setUpdateShow] = useState(false)
     const [initialData, setInitialData] = useState(null)
     const token = getToken()

     const getListItem = async () => {
          return axiosClient(token).get('/item/all')
     }

     const { data: listItems, isLoading, refetch } = useQuery({ queryKey: ['list-items'], queryFn: getListItem })

     const formatNumber = (price) => {
          return Intl.NumberFormat('de-DE').format(price)
     }

     const parseNumber = (formattedPrice) => {
          return Number(formattedPrice.replace(/[.,]/g, ''))
     }

     useEffect(() => {
          if (listItems) {
               const formattedData = listItems?.items.map((item) => ({
                    key: item.id,
                    id: item.id,
                    img: item.imgPath,
                    name: item.name,
                    status: item.status,
                    price: formatNumber(item.price)
               }))
               setDataSource(formattedData)
          }
     }, [listItems])

     const getDropDownItems = (record) => ([
          {
               label: 'Edit',
               key: '0',
               icon: <Icon icon="iconamoon:edit-bold" />,
               onClick: () => handleMenuClick("0", record)
          },
          {
               label: 'Delete',
               key: '3',
               danger: true,
               icon: <Icon icon="weui:delete-outlined" />,
          }
     ]);

     const columns = [
          {
               title: 'ID',
               dataIndex: 'id',
          },
          {
               title: 'Image',
               dataIndex: 'img',
               render: (imgPath) => (
                    <img
                         src={imgPath}
                         alt="Item Image"
                         style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
               ),
          },
          {
               title: 'Name',
               dataIndex: 'name',
          },
          {
               title: 'Price',
               dataIndex: 'price',
               align: 'center',
          },
          {
               title: '',
               key: 'action',
               align: 'center',
               render: (text, record) => (
                    <Dropdown
                         menu={{ items: getDropDownItems(record) }}
                         trigger={['click']}
                    >
                         <Button type="text"><Icon icon="lsicon:more-outline" /></Button>
                    </Dropdown>
               )
          }
     ];

     const onSelectChange = (newSelectedRowKeys) => {
          setSelectedRowKeys(newSelectedRowKeys);
     }

     const handleMenuClick = (key, record) => {
          if (key === "0") {
               // Convert the formatted price back to a number for the form
               const formData = {
                    ...record,
                    price: parseNumber(record.price)
               }
               setInitialData(formData);
               setUpdateShow(true);
          }
     };

     const rowSelection = {
          selectedRowKeys,
          onChange: onSelectChange,
          align: 'center',
          onSelect: (record, selected) => console.log(selected)
     }

     const handleSubmitUpdate = async (values) => {
          try {
               const res = await axiosClient(token).post('/item/update', {
                    id: values.id,
                    name: values.name,
                    price: values.price,
                    imgPath: values.img,
                    status: values.status
               })
               if (res) {
                    console.log(res)
                    await refetch()
               }
          } catch (error) {
               console.log("Error", error)
          } finally {
               setUpdateShow(false)
          }
     }

     const onCancelUpdate = () => {
          setUpdateShow(false)
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
               <ModalUpdate
                    show={updateShow}
                    submit={handleSubmitUpdate}
                    onCancel={onCancelUpdate}
                    initialData={initialData}
               />
          </div>
     )
}

export default ManagerItems