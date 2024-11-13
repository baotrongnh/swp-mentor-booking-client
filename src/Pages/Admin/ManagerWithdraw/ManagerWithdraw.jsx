import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Dropdown, Image, Table } from "antd"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { confirmCheckout, getListCheckout, rejectCheckout } from "../../../apis/payment"
import { Loading } from "../../../Components"

function ManagerWithdraw() {
     const [selectedRowKeys, setSelectedRowKeys] = useState([])
     const queryClient = useQueryClient()

     const { data: listWithdraw, isLoading } = useQuery({ queryKey: ['list-withdraw'], queryFn: getListCheckout })
     const [dataSource, setDataSource] = useState([])

     const mutationAccept = useMutation({
          mutationFn: (accountId) => confirmCheckout(accountId),
          onSuccess: () => {
               toast.success('Accept successful!')
               queryClient.invalidateQueries({ queryKey: ['list-withdraw'] })
          },
          onError: (error) => {
               toast.error(error.response.data.message)
          }
     })

     const mutationReject = useMutation({
          mutationFn: (accountId) => rejectCheckout(accountId),
          onSuccess: () => {
               toast.success('Reject successful!')
               queryClient.invalidateQueries({ queryKey: ['list-withdraw'] })
          },
          onError: (error) => {
               toast.error(error.response.data.message)
          }
     })

     useEffect(() => {
          if (listWithdraw) {
               setDataSource(
                    listWithdraw?.checkOutList.map((item, index) => ({
                         key: index,
                         accountId: item.accountId,
                         fullName: item.fullName,
                         image: item.imgPath,
                         total: 20,
                    }))
               )
          }
     }, [listWithdraw])

     const handleAccept = (record) => {
          mutationAccept.mutateAsync(record.accountId)
     }

     const handleReject = (record) => {
          mutationReject.mutateAsync(record.accountId)
     }

     const getDropDownItems = (text, record) => ([
          {
               label: 'Accept',
               key: '3',
               icon: <Icon icon="weui:delete-outlined" />,
               onClick: () => handleAccept(record)
          },
          {
               label: 'Reject',
               key: '4',
               danger: true,
               icon: <Icon icon="weui:delete-outlined" />,
               onClick: () => handleReject(record)
          },
     ])

     const columns = [
          {
               title: 'User ID',
               dataIndex: 'accountId',
          },
          {
               title: 'Image',
               dataIndex: 'image',
               render: (image) => <Image src={image} />
          },
          {
               title: 'Name',
               dataIndex: 'fullName',
               sorter: (a, b) => a.name.length - b.name.length,
          },
          {
               title: 'Total',
               dataIndex: 'total',
               align: 'center',
               sorter: (a, b) => a - b,
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

export default ManagerWithdraw