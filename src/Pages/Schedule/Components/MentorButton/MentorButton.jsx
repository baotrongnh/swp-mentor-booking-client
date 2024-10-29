import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Flex } from "antd";
import PropTypes from "prop-types";
import axiosClient from "../../../../apis/axiosClient";
import { getToken } from "../../../../utils/storageUtils";

function MentorButton({ bookingId, onReload }) {


    const handleAccept = async (bookingId) => {
        const token = getToken();
        console.log(bookingId)
        try {
            const res = await axiosClient(token).post('/booking/confirm', {
                bookingId: bookingId
            })
            if (res) {
                console.log(res.data)
                onReload(true)
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const handleDeny = async (bookingId) => {
        const token = getToken();
        console.log(bookingId)
        try {
            const res = await axiosClient(token).post('/booking/deny', {
                bookingId: bookingId
            })
            if (res) {
                console.log(res.data)
                onReload(true)
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <Flex gap='small'>
            <Button
                type="primary"
                size="small"
                style={{ fontWeight: '600', padding: '1rem', fontSize: '1.5rem' }}
                onClick={() => handleAccept(bookingId)}
            >
                <Icon icon="weui:done-filled" />Accept
            </Button>

            <Button
                danger
                size='small'
                style={{ fontWeight: '600', padding: '1rem', fontSize: '1.5rem' }}
                onClick={() => handleDeny(bookingId)}
            >
                <Icon icon="weui:close-filled" />Deny</Button>
        </Flex >
    );
}
MentorButton.propTypes = {
    bookingId: PropTypes.any.isRequired,
    onReload: PropTypes.func
}

export default MentorButton;