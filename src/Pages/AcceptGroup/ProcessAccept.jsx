import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { acceptBooking } from "../../apis/booking"
import { Loading } from "../../Components"
import PageNotFound from "../PageNotFound"
import Reject from "./Reject"
import Success from "./Success"

export default function ProcessAccept() {
     const { type, bookingId, memberId } = useParams()
     const navigate = useNavigate()
     const mutation = useMutation({
          mutationFn: ({ type, bookingId, memberId }) => acceptBooking(type, bookingId, memberId),
          onSuccess: (value) => {
               if (type === 'accept') {
                    navigate('/process-accept/success')
               } else if (type === 'reject') {
                    navigate('/process-accept/reject')
               }
          },
          onError: (error) => {
               console.log(error)
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
