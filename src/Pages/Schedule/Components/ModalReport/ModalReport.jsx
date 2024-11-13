import { Button, Flex, Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import { getToken } from "../../../../utils/storageUtils";
import axiosClient from "../../../../apis/axiosClient";
import PropTypes from "prop-types";
import { AppContext } from "../../../../Contexts/AppContext";
import toast from "react-hot-toast";

function ModalReport({ mentorId, studentId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { t } = useContext(AppContext)


    const negativeFeedbackOptions = [
        { value: 'Mentor was unresponsive to booking requests', label: 'Mentor was unresponsive to booking requests' },
        { value: 'Session started late', label: 'Session started late' },
        { value: 'Mentor lacked subject knowledge', label: 'Mentor lacked subject knowledge' },
        { value: 'Mentor did not address my queries', label: 'Mentor did not address my queries' },
        { value: 'Poor communication during session', label: 'Poor communication during session' },
        { value: 'Other', label: 'Other (please specify) ' },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmitForm = async (value) => {
        const token = getToken()
        if (value.select && value.description) {
            const content = `${value.select}: ${value.description}`;
            const res = await axiosClient(token).post('/complaint/create', {
                studentId: studentId,
                mentorId: mentorId,
                content: content,
            })
            if (res) {
                toast.success('Success')
            }
            console.log(res)
            form.resetFields()
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

    return (
        <>
            <Flex justify='center' align='center' >
                <Button type="default" danger onClick={showModal} style={{ width: '12rem', fontSize: '1.5rem' }}>
                    {t('Report')}
                </Button>
            </Flex>
            <Modal
                centered
                title="Report Booking"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleSubmitForm}
                    autoComplete="off"
                    layout="vertical"
                    style={{ width: '100%', marginTop: '2rem' }}
                >

                    <Form.Item
                        name="select"
                        rules={[
                            {
                                required: true,
                                message: 'Plese choose an option',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{
                                width: '100%',
                            }}
                            placeholder="Select"
                            optionFilterProp="label"


                            options={negativeFeedbackOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Description is required ( max 200 characters )',

                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Description"
                            rows={4}
                            maxLength={200}
                        />
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

ModalReport.propTypes = {
    mentorId: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired,
}

export default ModalReport