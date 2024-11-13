import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Flex, Image, List, Modal } from "antd";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import axiosClient from "../../../apis/axiosClient";
import defaultAvatar from '../../../assets/Photos/avatar/default_avatar.jpg';
import { getToken } from "../../../utils/storageUtils";
import './ModalViewDetailGroup.scss'

function ModalViewDetailGroup(id) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const token = getToken()

    const showModal = () => {
        setIsModalOpen(true);
    };


    const loadData = useCallback(async () => {
        if (loading) return;
        setLoading(true)

        try {
            const res = await axiosClient(token).get(`/group/get?bookingId=${id.id}`)
            if (res) {
                const sortData = res.group.sort((item1, item2) => item2.role - item1.role)
                setData(sortData)
            }
        } catch (e) {
            console.log("Error", e)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        loadData()
    }, [])


    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Flex justify='flex-start' align='center' style={{ paddingTop: '1rem' }}>
                <Button type="text" size="small" onClick={showModal} style={{ width: '12rem', fontSize: '1.5rem', color: '#3c83f6' }}>
                    View Group
                </Button>
            </Flex>

            <Modal
                centered
                title={"Group Detail"}
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
                className="group-detail"
            >
                <List
                    style={{ marginTop: '1rem' }}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            style={{ paddingTop: '2rem' }}
                        >
                            <List.Item.Meta
                                avatar={<Image
                                    className="avatar-img"
                                    src={item?.student.imgPath}
                                    alt='Avatar image'
                                    preview={{
                                        minScale: '10',
                                        src: item?.student.imgPath || defaultAvatar,
                                        mask: <div className="preview-mask"><Icon icon="weui:eyes-on-outlined" style={{ width: '3rem', height: '3rem' }} /></div>
                                    }}
                                    onError={(e) => e.target.src = defaultAvatar}
                                />}

                                title={item?.role === 1 ?
                                    <strong> {item?.student.fullName} (Leader)</strong>
                                    :
                                    <strong> {item?.student.fullName} </strong>
                                }
                                description={item?.student.email}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    )
}

ModalViewDetailGroup.propType = {
    id: PropTypes.number.isRequired
}

export default ModalViewDetailGroup