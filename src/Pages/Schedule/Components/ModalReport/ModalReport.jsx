import { Button, Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { getToken } from "../../../../utils/storageUtils";
import axiosClient from "../../../../apis/axiosClient";
import PropTypes from "prop-types";

function ModalReport({ mentorId, studentId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();


    const negativeFeedbackOptions = [
        { value: 'Not at all punctual', label: 'Not at all punctual' },
        { value: 'Poor teaching skills', label: 'Poor teaching skills' },
        { value: 'Not at all covered by syllabus', label: 'Not at all covered by syllabus' },
        { value: 'Most queries left unanswered', label: 'Most queries left unanswered' },
        { value: 'Dissatisfied with teaching quality', label: 'Dissatisfied with teaching quality' },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmitForm = async (value) => {
        console.log("Form value", value)
        const token = getToken()
        if (value.select && value.description) {
            const content = `${value.select}: ${value.description}`;
            const res = await axiosClient(token).post('/complaint/create', {
                studentId: studentId,
                mentorId: mentorId,
                content: content,
            })
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
            <Button type="default" danger onClick={showModal} style={{ width: '12rem' }}>
                Report
            </Button>
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

                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
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