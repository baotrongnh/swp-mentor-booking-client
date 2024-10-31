import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../Contexts/AppContext';
import './DonateError.scss';

export default function DonateError() {
    const { t } = useContext(AppContext);

    return (
        <div className="donate-error-page">
            <div className="success-card">
                <Icon
                    icon="codicon:error"
                    className="error-icon"
                />
                <h1 className="title">{t('Payment Failed')}</h1>

                <div className="details-box">
                    <h2 className="text">{t('Payment processing error')}</h2>
                </div>

                <div className="button-container">
                    <Link to="/" className="home-button">
                        <Icon
                            icon="heroicons:home"
                            className="button-icon"
                        />
                        {t('Return to Home')}
                    </Link>
                </div>
            </div>
        </div>
    );
}