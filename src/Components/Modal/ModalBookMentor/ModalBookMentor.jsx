import { Icon } from '@iconify/react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Empty, Modal, Popconfirm, Select, Skeleton, Tooltip, Typography } from "antd"
import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { bookingMentor } from "../../../apis/booking"
import { getAvailableSlot } from "../../../apis/mentor"
import { AppContext } from "../../../Contexts/AppContext"
import { AuthContext } from "../../../Contexts/AuthContext"
import { formatDateToNormal } from "../../../utils/format.js"
import './ModalBookMentor.scss'

function ModalBookMentor({ modalOpen, setModalOpen, currentIdMentor }) {
    const [isValidate, setIsValidate] = useState(false)
    const [slotAvailableSelect, setSlotAvailableSelect] = useState()
    const { currentUser } = useContext(AuthContext)
    const { t, semesterData } = useContext(AppContext)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ mentorId, studentId, slotId }) => bookingMentor(mentorId, studentId, slotId),
        onError: (error) => {
            if (error) {
                toast.error(error.response.data.message)
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

    const handleBookMentor = () => {
        mutation.mutate({
            mentorId: currentIdMentor,
            studentId: currentUser.accountId,
            slotId: slotAvailableSelect,
        })
        setModalOpen(false)
    }

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

    useEffect(() => {
        if (slotAvailableSelect) {
            setIsValidate(true)
        } else {
            setIsValidate(false)
        }
    }, [slotAvailableSelect])

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
                afterOpenChange={() => refetch()}
                destroyOnClose
                onClose={() => setSlotAvailableSelect()}
            >
                <div className="inside-modal-book">
                    <div className="select-time-block">
                        {
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
                                            <span>Time for a slot: <span style={{ fontWeight: '600' }}>{semesterData?.latestSemester.slotDuration} minutes</span> </span>
                                            <Select
                                                showSearch
                                                placeholder={t('Select a slot')}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={
                                                    listAvailableSlot?.slots.map((slot) => (
                                                        {
                                                            value: slot.id,
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
                                disabled={currentUser?.point < semesterData?.latestSemester?.slotCost || !isValidate || listAvailableSlot?.slots.length === 0}
                            >
                                {currentUser?.point >= semesterData?.latestSemester?.slotCost
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