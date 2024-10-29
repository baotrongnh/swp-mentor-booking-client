import './DonateSuccess.scss';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function DonateSuccess() {
    const orderNumber = "ORD-12345";
    const amount = "$99.99";

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
                    <p className="details-text">Order Number: <span>{orderNumber}</span></p>
                    <p className="details-text">Amount Paid: <span>{amount}</span></p>
                </div>

                <Link to="/" className="home-button">
                    <Icon
                        icon="heroicons:home"
                        className="button-icon"
                    />
                    Return to Home
                </Link>
            </div>
        </div>
    );
}