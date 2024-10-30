import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import './DonateError.scss';

export default function DonateError() {

    return (
        <div className="donate-error-page">
            <div className="success-card">
                <Icon
                    icon="codicon:error"
                    className="error-icon"
                />
                <h1 className="title">Payment Failed</h1>

                <div className="details-box">
                    <h2 className="text">Unfortunately, we encountered an issue processing your payment.</h2>
                </div>

                <div className="button-container">
                    <Link to="/" className="home-button">
                        <Icon
                            icon="heroicons:home"
                            className="button-icon"
                        />
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}