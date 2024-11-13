import { CalendarOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Table, Typography } from 'antd'
import { useContext } from 'react'
import { getCheckoutHistory } from '../../apis/payment'
import { AuthContext } from '../../Contexts/AuthContext'
import { formatCurrencyVND } from '../../utils/format'

const { Title } = Typography

const HistoryCheckout = () => {
     const { currentUser } = useContext(AuthContext)
     const { data: withdrawalData } = useQuery({ queryKey: ['history-withdraw'], queryFn: () => getCheckoutHistory(currentUser.accountId) })

     const columns = [
          {
               title: 'User',
               dataIndex: 'mentor',
               key: 'mentor',
               render: (text) => (
                    <span>
                         <UserOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                         {text}
                    </span>
               ),
          },
          {
               title: 'Date',
               dataIndex: 'createdAt',
               key: 'createdAt',
               render: (text) => (
                    <span>
                         <CalendarOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                         {text}
                    </span>
               ),
          },
          {
               title: 'Amount',
               dataIndex: 'amount',
               key: 'amount',
               render: (text) => (
                    <span>
                         <DollarOutlined style={{ marginRight: '8px', color: '#faad14' }} />
                         {formatCurrencyVND(text)}
                    </span>
               ),
          },
     ];

     const tableStyle = {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
     }

     return (
          <div style={{ padding: '24px' }} className='container'>
               <Title level={2} style={{ marginBottom: '24px', textAlign: 'center' }}>
                    Withdrawal History
               </Title>
               <Table
                    columns={columns}
                    dataSource={withdrawalData?.checkout_history}
                    rowKey="id"
                    style={tableStyle}
                    pagination={{
                         pageSize: 5,
                         showSizeChanger: false,
                         showQuickJumper: true,
                         showTotal: (total) => `Total ${total} items`,
                    }}
               />
          </div>
     );
};

export default HistoryCheckout