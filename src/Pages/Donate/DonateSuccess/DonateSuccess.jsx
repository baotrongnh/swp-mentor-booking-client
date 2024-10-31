import './DonateSuccess.scss';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { AppContext } from '../../../Contexts/AppContext';

export default function DonateSuccess() {
    const { t } = useContext(AppContext);
    const { orderInfor } = useParams();

    return (
        <div className="donate-success-page">
            <div className="success-card">
                <Icon
                    icon="heroicons:check-circle"
                    className="success-icon"
                />
                <h1 className="title">{t('Payment Successful')}</h1>
                <p className="message">{t('Thank you message')}</p>

                <div className="details-box">
                    <h2 className="details-title">{t('Order Details')}</h2>
                    <p className="details-text">{t('Order Number')}: <span>{orderInfor}</span></p>
                </div>

                <div className="button-container">
                    <Link to="/" className="home-button">
                        <Icon
                            icon="heroicons:home"
                            className="button-icon"
                        />
                        {t('Return to Home')}
                    </Link>

                    <Link to="/gift" className="view-button">
                        <Icon
                            icon="heroicons:gift"
                            className="button-icon"
                        />
                        {t('View Donation')}
                    </Link>
                </div>
            </div>
        </div>
    );
}