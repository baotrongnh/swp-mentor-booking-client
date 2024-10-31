import { Icon } from "@iconify/react/dist/iconify.js";
import { Flex } from "antd";
import { t } from "i18next";

const FormatDate = (date, isStartTime) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');


    return (
        <div className='data-form'>
            <Flex
                align='center'
                gap='small'
                className="date-container"
            >
                <Icon icon="ion:calendar-outline" className="calendar-icon" />
                <p className='data-date'>{`${year}-${month}-${day}`}</p>
            </Flex>
            <Flex
                align='center'
                gap='small'
                className="time-container"
            >
                <p className='data-time-label'>{isStartTime ? <span>{t('start')}</span> : <span>{t('end')}</span>}</p>
                <p className='data-time'>{`${hours}:${minutes}:${seconds}`}</p>
            </Flex>
        </div>
    );
};

export default FormatDate