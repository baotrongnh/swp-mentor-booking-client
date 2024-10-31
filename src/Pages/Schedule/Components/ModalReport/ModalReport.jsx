import { Button, Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

function ModalReport() {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const selectList = [
        {
            value: '1',
            label: 'Report 1',
        },
        {
            value: '2',
            label: 'Report 2',
        },
        {
            value: '3',
            label: 'Report 3',
        },
        {
            value: '4',
            label: 'Report 4',
        },
        {
            value: '5',
            label: 'Report 5',
        },
        {
            value: '6',
            label: 'Report 6',
        },
    ]

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmitForm = (value) => {
        console.log("Form value", value)
        if (value.select && value.description) {
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
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
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={selectList}
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

export default ModalReport