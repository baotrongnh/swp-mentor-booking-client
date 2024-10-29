import './DonateSuccess.scss';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function DonateSuccess() {

    const { orderInfor } = useParams()
    return (
        <div className="donate-success-page">
            <div className="success-card">
                <Icon
                    icon="heroicons:check-circle"
                    className="success-icon"
                />
                <h1 className="title">Payment Successful!</h1>
                <p className="message">Thank you for your purchase. Your order has been processed successfully.</p>

                <div className="details-box">
                    <h2 className="details-title">Order Details</h2>
                    <p className="details-text">Order Number: <span>{orderInfor}</span></p>

                </div>

                <div className="button-container">
                    <Link to="/" className="home-button">
                        <Icon
                            icon="heroicons:home"
                            className="button-icon"
                        />
                        Return to Home
                    </Link>

                    <Link to="/gift" className="view-button">
                        <Icon
                            icon="heroicons:gift"
                            className="button-icon"
                        />
                        View Donation
                    </Link>
                </div>
            </div>
        </div>
    );
}