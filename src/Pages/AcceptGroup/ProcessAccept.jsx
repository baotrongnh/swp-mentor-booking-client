import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { acceptBooking } from "../../apis/booking"
import PageNotFound from "../PageNotFound"

export default function ProcessAccept() {
     const { type, bookingId, memberId } = useParams()
     const navigate = useNavigate()
     const mutation = useMutation({
          mutationFn: ({ type, bookingId, memberId }) => acceptBooking(type, bookingId, memberId),
          onSuccess: () => {
               if (type === 'accept') {
                    navigate('/process-accept/success')
               } else if (type === 'reject') {
                    navigate('/process-accept/reject')
               }
          },
          onError: (error) => {
               toast.error(error.response.data.message)
          }
     })

     useEffect(() => {
          if (type && bookingId && memberId) {
               mutation.mutate({ type, bookingId, memberId })
          }
     }, [type, bookingId, memberId])

     return (
          <>
               {mutation.isError && <PageNotFound />}
          </>
     )
}
