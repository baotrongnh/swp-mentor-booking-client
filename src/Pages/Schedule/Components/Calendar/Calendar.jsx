import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Calendar, Col, Radio, Row, Select, theme, Typography } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
import { useContext, useState } from 'react';
import { AppContext } from '../../../../Contexts/AppContext';
import PropTypes from 'prop-types';
dayjs.extend(dayLocaleData);

const ShowCalendar = ({ onDaySelect, bookingDates }) => {
    const { t } = useContext(AppContext)
    const { token } = theme.useToken();
    const [selectedDay, setSelectedDay] = useState(dayjs())

    const disabledDate = (date) => {
        return !bookingDates.includes(date.format('YYYY-MM-DD'))
    }

    const onDaySelected = (day) => {
        setSelectedDay(day);
        onDaySelect(day);
        console.log("Selected day on click: " + day.format('YYYY-MM-DD'))
    }

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const wrapperStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const calendarContainerStyle = {
        width: '90%',
    };

    return (
        <div style={wrapperStyle}>
            <div style={calendarContainerStyle}>
                <Calendar
                    fullscreen={false}

                    value={selectedDay}
                    onSelect={onDaySelected}
                    disabledDate={disabledDate}

                    headerRender={({ value, type, onChange, onTypeChange }) => {
                        const start = 0;
                        const end = 12;
                        const monthOptions = [];
                        let current = value.clone();
                        const localeData = value.localeData();
                        const months = [];
                        for (let i = 0; i < 12; i++) {
                            current = current.month(i);
                            months.push(localeData.monthsShort(current));
                        }
                        for (let i = start; i < end; i++) {
                            monthOptions.push(
                                <Select.Option key={i} value={i} className="month-item">
                                    {months[i]}
                                </Select.Option>,
                            );
                        }
                        const year = value.year();
                        const month = value.month();
                        const options = [];
                        for (let i = year - 10; i < year + 10; i += 1) {
                            options.push(
                                <Select.Option key={i} value={i} className="year-item">
                                    {i}
                                </Select.Option>,
                            );
                        }
                        return (
                            <div
                                style={{
                                    padding: 8,
                                }}
                            >
                                <Typography.Title level={4}>{t('booking calendar')}</Typography.Title>
                                <Row gutter={8}>
                                    <Col>
                                        <Radio.Group
                                            size="small"
                                            onChange={(e) => onTypeChange(e.target.value)}
                                            value={type}
                                        >
                                            <Radio.Button value="month">{t('month')}</Radio.Button>
                                            <Radio.Button value="year">{t('year')}</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            className="my-year-select"
                                            value={year}
                                            onChange={(newYear) => {
                                                const now = value.clone().year(newYear);
                                                onChange(now);
                                            }}
                                        >
                                            {options}
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            value={month}
                                            onChange={(newMonth) => {
                                                const now = value.clone().month(newMonth);
                                                onChange(now);
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        );
                    }}
                    onPanelChange={onPanelChange}
                />
            </div>
        </div>
    );
};

ShowCalendar.propTypes = {
    onDaySelect: PropTypes.func.isRequired,
    bookingDates: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ShowCalendar;
