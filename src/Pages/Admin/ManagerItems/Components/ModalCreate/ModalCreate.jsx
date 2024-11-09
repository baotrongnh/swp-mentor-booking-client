import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import PropTypes from "prop-types";

function ModalCreate({ show, submit, onCancel }) {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        submit(values);
        form.resetFields();
    };



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
            >
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

ModalCreate.propTypes = {
    show: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialData: PropTypes.object
};

export default ModalCreate;
