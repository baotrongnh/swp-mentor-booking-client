import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Space } from 'antd'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { editProfileMentor } from '../../apis/mentor'

const { TextArea } = Input

const DescriptionEditor = ({ defaultDescription, accountId }) => {
     const [description, setDescription] = useState(defaultDescription)
     const [isEditing, setIsEditing] = useState(false)
     const queryClient = useQueryClient()

     const mutation = useMutation({
          mutationFn: ({ accountId, description }) => editProfileMentor(accountId, description),
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['mentorProfile', accountId] })
               toast.success('Change description success')
          },
          onError: () => {
               toast.error('error')
          }
     })

     useEffect(() => {
          setDescription(defaultDescription)
     }, [defaultDescription])

     const handleEdit = () => {
          if (isEditing) {
               if (description === defaultDescription) {
                    toast.error('Nothing change!')
               } else {
                    mutation.mutate({ accountId, description })
                    console.log('New description:', description)
                    setIsEditing(false)
               }
          } else {
               setIsEditing(true)
          }
     }

     const handleCancel = () => {
          setDescription(defaultDescription)
          setIsEditing(false)
     }

     return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {isEditing ? (
                    <TextArea
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         autoSize={{ minRows: 3, maxRows: 6 }}
                    />
               ) : (
                    <div>
                         {description.split('\n').map((line, index) => (
                              <p key={index} style={{ margin: 0 }}>{line}</p>
                         ))}
                    </div>
               )}
               <Space>
                    <Button type="primary" onClick={handleEdit}>
                         {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    {isEditing && (
                         <Button onClick={handleCancel}>
                              Cancel
                         </Button>
                    )}
               </Space>
          </div>
     )
}

export default DescriptionEditor

DescriptionEditor.propTypes = {
     defaultDescription: PropTypes.string,
     accountId: PropTypes.any
}