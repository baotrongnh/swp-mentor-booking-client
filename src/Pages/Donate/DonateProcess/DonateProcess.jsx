import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getResultPayment } from "../../../apis/payment";
import { Loading } from "../../../Components";
import { AppContext } from "../../../Contexts/AppContext";

function DonateProcess() {
    const navigate = useNavigate()
    const [fetchDataSuccess, setFetchDataSuccess] = useState(false)
    const { t } = useContext(AppContext);

    const fetchData = async (orderInfor, status) => {
        const data = await getResultPayment(orderInfor, status)
        console.log('data:', data);
        try {
            if (data.error_code === 0) {
                setFetchDataSuccess(true)
                console.log("success", fetchDataSuccess)
                toast.success(t('Payment Successful'))
                navigate(`/donate-success/${orderInfor}`)
            } else {
                toast.error(t('Payment Failed'))
                navigate('/')
            }
        } catch (error) {
            console.log("Error", error);
            toast.error(t('Payment Failed'));
            navigate('/');
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const orderInfor = params.get('vnp_OrderInfo');
        const status = params.get('vnp_TransactionStatus');

        console.log(orderInfor)
        console.log(status)

        console.log(orderInfor)
        console.log(status)

        if (orderInfor && status) {
            fetchData(orderInfor, status)
        }

        const timer = setTimeout(() => {
            if (!fetchDataSuccess) {
                console.log('Timeout: fetchDataSuccess is still false');
                toast.error(t('Payment Failed'));
                navigate('/donate-error');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [fetchDataSuccess, navigate, t])


    return (
        <Loading />
    );
}

export default DonateProcess;