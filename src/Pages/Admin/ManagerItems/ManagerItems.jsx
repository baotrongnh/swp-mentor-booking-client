import { Icon } from "@iconify/react/dist/iconify.js"
import { useQuery } from "@tanstack/react-query"
import { Button, Dropdown, Table } from "antd"
import { useEffect, useState } from "react"
import axiosClient from "../../../apis/axiosClient"
import { Loading } from "../../../Components"
import { getToken } from "../../../utils/storageUtils"
import ModalUpdate from "./Components/ModalUpdate/ModalUpdate"
import ModalCreate from "./Components/ModalCreate/ModalCreate"
import toast from "react-hot-toast"
import Search from "antd/es/transfer/search"

function ManagerItems() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([])
     const [dataSource, setDataSource] = useState([])
     const [updateShow, setUpdateShow] = useState(false)
     const [initialData, setInitialData] = useState(null)
     const [createShow, setCreateShow] = useState(false)
     const [dataSearch, setDataSearch] = useState('')
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

     // useEffect(() => {
     //      if (listItems) {
     //           const formattedData = listItems?.items.map((item) => ({
     //                key: item.id,
     //                id: item.id,
     //                img: item.imgPath,
     //                name: item.name,
     //                status: item.status,
     //                price: formatNumber(item.price)
     //           }))
     //           setDataSource(formattedData)
     //      }
     // }, [listItems])

     useEffect(() => {
          if (listItems) {
               setDataSource(
                    listItems?.items
                         ?.filter(item => item.name.toLowerCase().includes(dataSearch.toLowerCase()))
                         .map((item) => ({
                              key: item.id,
                              id: item.id,
                              img: item.imgPath,
                              name: item.name,
                              status: item.status,
                              price: formatNumber(item.price)
                         }))
               )
          }
     }, [listItems, dataSearch])


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
               onClick: () => handleMenuClick("3", record)
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
               const formData = {
                    ...record,
                    price: parseNumber(record.price)
               }
               setInitialData(formData);
               setUpdateShow(true);
          } else if (key === "3") {
               toast.success("Delete " + record.name)
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
                    toast.success('Update Success')
                    await refetch()
               }
          } catch (error) {
               const errorMessage = error.response?.data?.error || "An unexpected error occurred";
               console.log("Error", error);
               toast.error(errorMessage);
          } finally {
               setUpdateShow(false)
          }
     }

     const handleSubmitCreate = async (values) => {
          try {
               const res = await axiosClient(token).post('/item/create', {
                    name: values.name,
                    price: values.price,
                    imgPath: values.img
               })
               if (res) {
                    console.log(res)
                    toast.success('Create Success')
                    await refetch()
               }
          } catch (e) {
               const errorMessage = e.response?.data?.error || "An unexpected error occurred";
               console.log("Error", e);
               toast.error(errorMessage);
          } finally {
               setCreateShow(false)
          }

     }

     const onCancelModal = () => {
          setUpdateShow(false)
          setCreateShow(false)
     }

     const onSearch = (e) => {
          setDataSearch(e.target.value)
     }

     if (isLoading) return (<Loading />)

     return (
          <div className="all-items">
               <Button onClick={() => setCreateShow(true)}>+ Add Item</Button>
               <div style={{ margin: '10px 0', padding: '0 20px' }}>
                    <Search
                         placeholder="Find items..."
                         allowClear
                         onSearch={onSearch}
                         className='search-input'
                         onChange={onSearch}
                    />
               </div>
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
                    onCancel={onCancelModal}
                    initialData={initialData}
               />
               <ModalCreate
                    show={createShow}
                    onCancel={onCancelModal}
                    submit={handleSubmitCreate}
               />
          </div>
     )
}

export default ManagerItems