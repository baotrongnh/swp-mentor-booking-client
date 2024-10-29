import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getResultPayment } from "../../../apis/payment";
import { Loading } from "../../../Components";

function DonateProcess() {
    const navigate = useNavigate()
    const fetchData = async (orderInfor, status) => {
        const data = await getResultPayment(orderInfor, status)
        console.log(data)
        if (data.error_code === 0) {
            toast.success('Ok bạn nhá')
            navigate(`/donate-success/${orderInfor}`)
        } else {
            toast.error('Error')
            navigate('')
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const orderInfor = params.get('vnp_OrderInfo');
        const status = params.get('vnp_TransactionStatus');

        if (orderInfor && status) {
            fetchData(orderInfor, status)
        }
    }, [])


    return (
        <Loading />
    );
}

export default DonateProcess;