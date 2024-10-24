import { Button, Card, Col, Modal, Row } from 'antd';
import { useState } from 'react';
import './DonateModalButton.scss';
import { Icon } from '@iconify/react/dist/iconify.js';


const DonateModalButton = () => {
    const [open, setOpen] = useState(false);

    const handleDonate = (amount) => {
        console.log(`Donating ${amount} coins`);
        // Add your donation logic here
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} className="donate-button">
                Donate
            </Button>
            <Modal
                title="Choose Your Donation"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                className="donate-modal"
                footer={null}
            >
                <Row gutter={[16, 16]} justify='center'>
                    {[100, 500, 1000].map((amount, index) => (
                        <Col key={index} xs={24} sm={12} md={8} className='item'>
                            <Card
                                className='donate-card'
                                hoverable
                                cover={
                                    <img
                                        alt={`${amount} coins`}
                                        src={`https://picsum.photos/200/100?random=${index}`}
                                        className="card-image"
                                    />
                                }
                            >
                                <h2 className='donate-card-title'>{amount} Coins</h2>
                                <p className="donate-card-description">Support our platform</p>
                                <Button
                                    type="primary"
                                    className="donate-button"
                                    onClick={() => handleDonate(amount)}
                                >
                                    Donate <Icon icon="noto:coin" style={{ marginLeft: '5px' }} />
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal>
        </>
    );
};
export default DonateModalButton;
