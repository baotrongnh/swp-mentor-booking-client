import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import PropTypes from "prop-types";
import { useEffect } from "react";

function ModalUpdate({ show, submit, onCancel, initialData }) {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        submit(values);
        form.resetFields();
    };

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        }
    }, [initialData, form]);

    return (
        <Modal
            title="Edit Item"
            open={show}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                initialValues={initialData}
            >
                <Form.Item
                    name="id"
                    label="Item ID"
                    rules={[{ required: true, message: "Item ID is required" }]}
                >
                    <Input placeholder="Enter item ID" disabled />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                >
                    <Input placeholder="Enter item name" />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: "Enter a valid number" }]}
                >
                    <InputNumber
                        placeholder="Enter item price"
                        formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    name="img"
                    label="Image Path"
                >
                    <Input placeholder="Enter image path" />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ type: "number", message: "Enter a valid status number" }]}
                >
                    <Input placeholder="Enter status" type="number" />
                </Form.Item>
                <Row justify="end">
                    <Col>
                        <Button onClick={onCancel} style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

ModalUpdate.propTypes = {
    show: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialData: PropTypes.object
};

export default ModalUpdate;
