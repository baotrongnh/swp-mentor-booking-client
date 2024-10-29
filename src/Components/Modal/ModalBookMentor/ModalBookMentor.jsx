import { Icon } from '@iconify/react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, DatePicker, Empty, Modal, Popconfirm, Select, Skeleton, Tabs, Tooltip, Typography } from "antd"
import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { bookingMentor } from "../../../apis/booking"
import { getAvailableSlot } from "../../../apis/mentor"
import { AppContext } from "../../../Contexts/AppContext"
import { AuthContext } from "../../../Contexts/AuthContext"
import { formatDateToNormal } from "../../../utils/format.js"
import { disabledDateInPast, disableNotThing, disableTime, getDateNow } from "../../../utils/validate"
import './ModalBookMentor.scss'

function ModalBookMentor({ modalOpen, setModalOpen, currentIdMentor }) {
    const [isValidate, setIsValidate] = useState(false)
    const [tab, setTab] = useState('1')
    const [dateCustom, setDateCustom] = useState({ date: '0000-00-00', time: '00:00:00' })
    const [displayDate, setDisplayDate] = useState({ date: 'DD-MM-YYYY', time: '00:00' })
    const [slotAvailableSelect, setSlotAvailableSelect] = useState()
    const { currentUser } = useContext(AuthContext)
    const { t, semesterData } = useContext(AppContext)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ mentorId, studentId, startTime }) => bookingMentor(mentorId, studentId, startTime),
        onError: (error) => {
            if (error.response.data.error_code === 1) {
                toast.error('Please do not select a date in the past')
            } else {
                toast.error('Something went wrong')
            }
        },
        onSuccess: (data) => {
            if (data.error_code === 0) {
                queryClient.invalidateQueries({ queryKey: ['currentUser'] })
                queryClient.invalidateQueries({ queryKey: [`available-slot-${currentIdMentor}`, currentIdMentor] })
                toast.success('Booked successfully')
            }
        }
    })

    const { data: listAvailableSlot, isLoading, refetch } = useQuery({
        queryKey: [`available-slot-${currentIdMentor}`, currentIdMentor],
        queryFn: () => getAvailableSlot(currentIdMentor),
        enabled: !!currentIdMentor,
    })

    const onChangeTabs = (key) => {
        setTab(key)
        setDateCustom({ date: '0000-00-00', time: '00:00:00' })
    }

    useEffect(() => {
        if (tab === '2') {
            if ((dateCustom.date !== '0000-00-00' && dateCustom.time !== '00:00:00')) {
                setIsValidate(true)
            } else {
                setIsValidate(false)
            }
        } else {
            setIsValidate(!!slotAvailableSelect)
        }
    }, [dateCustom, tab, slotAvailableSelect])

    const handleDatePick = (date, dateString) => {
        setDisplayDate({ ...displayDate, date: dateString })
        const [day, month, year] = dateString.split('-')
        const formattedDate = `${year}-${month}-${day}`
        setDateCustom({ ...dateCustom, date: formattedDate })
    }

    const handleTimePick = (time, timeString) => {
        setDisplayDate({ ...displayDate, time: timeString })
        setDateCustom({ ...dateCustom, time: timeString })
    }

    const handleBookMentor = () => {
        console.log(`Time booking: ${dateCustom.date} ${dateCustom.time}`)
        console.log('StudentID: ' + currentUser.accountId)
        console.log('MentorID: ' + currentIdMentor)
        mutation.mutate({
            mentorId: currentIdMentor,
            studentId: currentUser.accountId,
            startTime: tab === '1' ? slotAvailableSelect : `${dateCustom.date} ${dateCustom.time}`,
        })
        setModalOpen(false)
    }

    const itemTabs = [
        {
            key: '1',
            label: t('Available Schedule'),
        },
        {
            key: '2',
            label: t('Custom Schedule'),
        }
    ]

    const handleSelectSlotAvailable = (value) => {
        setSlotAvailableSelect(value)
    }

    const confirm = (e) => {
        console.log(e)
        handleBookMentor()
    }

    const cancel = (e) => {
        console.log(e)
    }

    return (
        <div className="modal-book-mentor">
            <Modal
                title={t('Book mentor')}
                centered
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false)
                    setSlotAvailableSelect(null)
                }}
                footer={false}
                confirmLoading={mutation.isPending}
                destroyOnClose
                afterOpenChange={() => refetch()}
            >
                <div className="inside-modal-book">
                    <Tabs style={{ width: '100%' }} defaultActiveKey="1" items={itemTabs} onChange={onChangeTabs} />

                    <div className="select-time-block">
                        {tab === '1'
                            ?
                            isLoading ?
                                <Skeleton active block />
                                :
                                <div className="available-block">
                                    {listAvailableSlot?.slots.length > 0
                                        ?
                                        <>
                                            <h1 style={{ fontWeight: '600' }} className="title">
                                                {t('Available time')}  <Tooltip title="Available times will be automatically confirmed!"><Icon icon="f7:question-circle" /></Tooltip>
                                            </h1>
                                            <Select
                                                showSearch
                                                placeholder={t('Select a slot')}
                                                value={slotAvailableSelect}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={
                                                    listAvailableSlot?.slots.map((slot) => (
                                                        {
                                                            value: slot.slotStart,
                                                            label: (`${formatDateToNormal(slot.slotStart).date} (${formatDateToNormal(slot.slotStart).time})`),
                                                        }
                                                    ))
                                                }
                                                defaultActiveFirstOption
                                                onChange={handleSelectSlotAvailable}
                                                style={{ width: '100%', marginTop: '10px' }}
                                                allowClear
                                            />
                                        </>
                                        :
                                        <>
                                            <Empty
                                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                imageStyle={{
                                                    height: 60,
                                                }}
                                                description={
                                                    <Typography.Text>
                                                        {t('This Mentor has no available slot.')}
                                                    </Typography.Text>
                                                }
                                            ></Empty>
                                        </>
                                    }
                                </div>
                            :
                            <div className="custom-block">
                                <h1 className="title">Select Date & Time <Tooltip title="Custom time needs to wait for mentor confirmation!"><Icon icon="f7:question-circle" /></Tooltip></h1>

                                <p className="time-view">Scheduled
                                    for <b>{displayDate.date}</b> at <b>{displayDate.time}</b></p>

                                <div className='select-block'>
                                    <DatePicker
                                        disabledDate={disabledDateInPast}
                                        format='DD-MM-YYYY'
                                        className='pick-date'
                                        onChange={handleDatePick}
                                    />
                                    <DatePicker
                                        className='pick-time'
                                        picker='time'
                                        onChange={handleTimePick}
                                        format='HH:mm'
                                        disabledTime={dateCustom.date === getDateNow() ? disableTime : disableNotThing}
                                    />
                                </div>
                            </div>
                        }
                    </div>

                    <div className="btn-block">
                        <Button onClick={() => setModalOpen(false)}>{t('Cancel')}</Button>

                        <Popconfirm
                            title="Book this mentor?"
                            description={<span>Your balance: {currentUser?.point} {<Icon icon="twemoji:coin" />}</span>}
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Book"
                            cancelText="No"
                            confirmLoading={mutation.isPending}
                        >
                            <Button type="primary"
                                disabled={currentUser?.point < semesterData?.latestSemester?.slotCost || !isValidate}
                            >
                                {currentUser?.point > semesterData?.latestSemester?.slotCost
                                    ? <>{t('book')}: {semesterData?.latestSemester?.slotCost} <Icon icon="twemoji:coin" /></>
                                    : 'Not enough coins'}
                            </Button>
                        </Popconfirm>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalBookMentor

ModalBookMentor.propTypes = {
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func,
    currentIdMentor: PropTypes.any
}