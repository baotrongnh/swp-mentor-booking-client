import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getResultPayment } from "../../../apis/payment";
import { Loading } from "../../../Components";

function DonateProcess() {
    const navigate = useNavigate()
    const [fetchDataSuccess, setFetchDataSuccess] = useState(false)

    const fetchData = async (orderInfor, status) => {
        const data = await getResultPayment(orderInfor, status)
        console.log('data:', data);
        try {
            if (data.error_code === 0) {
                setFetchDataSuccess(true)
                console.log("success", fetchDataSuccess)
                toast.success('Ok bạn nhá')
                navigate(`/donate-success/${orderInfor}`)
            } else {
                toast.error('Error')
                navigate('/')
            }
        } catch (error) {
            console.log("Error", error);
            toast.error('Error');
            navigate('/');
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const orderInfor = params.get('vnp_OrderInfo');
        const status = params.get('vnp_TransactionStatus');

        console.log(orderInfor)
        console.log(status)

        if (orderInfor && status) {
            fetchData(orderInfor, status)
        }

        const timer = setTimeout(() => {
            if (!fetchDataSuccess) {
                console.log('Timeout: fetchDataSuccess is still false');
                toast.error('Error');
                navigate('/donate-error');
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [fetchDataSuccess, navigate])


    return (
        <Loading />
    );
}

export default DonateProcess;