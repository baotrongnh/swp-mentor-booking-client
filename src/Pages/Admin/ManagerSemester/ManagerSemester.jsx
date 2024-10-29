import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getCurrentSemester } from '../../../apis/semester'
import { resetStudentPoint, setDefaultPoint, startNewSemester } from '../../../apis/admin'
import toast from 'react-hot-toast'

const primaryColor = '#3498db'
const lightGray = '#f8f9fa'
const darkGray = '#343a40'

const containerStyle = {
     fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
     maxWidth: '1000px',
     margin: '0 auto',
     padding: '40px 20px',
     backgroundColor: 'white',
     color: darkGray,
}

const headerStyle = {
     fontSize: '2.5rem',
     fontWeight: '300',
     marginBottom: '2rem',
     color: primaryColor,
}

const cardStyle = {
     backgroundColor: lightGray,
     borderRadius: '8px',
     padding: '25px',
     marginBottom: '25px',
     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
     transition: 'box-shadow 0.3s ease-in-out',
}

const cardTitleStyle = {
     fontSize: '1.5rem',
     fontWeight: '500',
     marginBottom: '15px',
     color: primaryColor,
}

const buttonStyle = {
     backgroundColor: primaryColor,
     color: 'white',
     padding: '12px 20px',
     border: 'none',
     borderRadius: '5px',
     cursor: 'pointer',
     fontSize: '1.6rem',
     transition: 'background-color 0.3s, transform 0.1s',
     outline: 'none',
}

const inputStyle = {
     padding: '10px',
     fontSize: '1.6rem',
     borderRadius: '5px',
     border: '1px solid #ced4da',
     marginRight: '10px',
     width: '80%',
     maxWidth: '200px',
}

const ManagerSemester = () => {
     const queryClient = useQueryClient()

     const { data: currentSemesterData } = useQuery({ queryKey: ['current-semester'], queryFn: getCurrentSemester })
     const mutationResetPoint = useMutation({
          mutationFn: resetStudentPoint,
          onSuccess: () => {
               console.log('ok')
          }
     })

     const mutationStartNewSemester = useMutation({
          mutationFn: startNewSemester,
          onSuccess: (value) => {
               console.log(value)
               toast.success(`New semester has started ()`)
          },
          onError: () => {
               toast.error('An error occurred, please try again!')
          }
     })

     const mutationSetDefaultPoint = useMutation({
          mutationFn: (newPoint) => setDefaultPoint(newPoint),
          onSuccess: (value) => {
               console.log(value)
          }
     })

     const [defaultPointCustom, setDefaultPointCustom] = useState(0)

     useEffect(() => {
          if (currentSemesterData) {
               setDefaultPointCustom(currentSemesterData?.latestSemester?.defaultPoint)
          }
     }, [currentSemesterData])

     const resetStudentPoints = () => {
          mutationResetPoint.mutateAsync()
     }

     const handleSetDefaultPoint = () => {
          mutationSetDefaultPoint.mutate(defaultPointCustom)
     }

     const handleStartNewSemester = () => {
          mutationStartNewSemester.mutateAsync()
     }

     return (
          <div style={containerStyle}>
               <h1 style={headerStyle}>Semester Management</h1>

               <div style={{ ...cardStyle, marginBottom: '40px' }}>
                    <h2 style={cardTitleStyle}>Current Semester</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                         <div>
                              <p style={{ fontWeight: '500', marginBottom: '5px' }}>Semester Name</p>
                              <p>{currentSemesterData?.latestSemester?.name}</p>
                         </div>
                         <div>
                              <p style={{ fontWeight: '500', marginBottom: '5px' }}>Start Date</p>
                              <p>{currentSemesterData?.latestSemester?.createdAt}</p>
                         </div>
                         <div>
                              <p style={{ fontWeight: '500', marginBottom: '5px' }}>Cost for a slot</p>
                              <p>{currentSemesterData?.latestSemester?.slotCost} coin</p>
                         </div>
                         <div>
                              <p style={{ fontWeight: '500', marginBottom: '5px' }}>Slot time</p>
                              <p>{currentSemesterData?.latestSemester?.slotDuration} minute</p>
                         </div>
                    </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                    <div style={cardStyle}>
                         <h3 style={cardTitleStyle}>Reset Student Points</h3>
                         <button
                              onClick={resetStudentPoints}
                              style={buttonStyle}
                              onMouseOver={(e) => {
                                   e.target.style.backgroundColor = '#2980b9'
                                   e.target.style.transform = 'translateY(-2px)'
                              }}
                              onMouseOut={(e) => {
                                   e.target.style.backgroundColor = primaryColor
                                   e.target.style.transform = 'translateY(0)'
                              }}
                         >
                              Reset Points
                         </button>
                    </div>

                    <div style={cardStyle}>
                         <h3 style={cardTitleStyle}>Set Default Point</h3>
                         <div style={{ display: 'flex', alignItems: 'center' }}>
                              <input
                                   value={defaultPointCustom}
                                   onChange={(e) => setDefaultPointCustom(Number(e.target.value))}
                                   style={inputStyle}
                              />
                              <button
                                   onClick={handleSetDefaultPoint}
                                   style={buttonStyle}
                                   onMouseOver={(e) => {
                                        e.target.style.backgroundColor = '#2980b9'
                                        e.target.style.transform = 'translateY(-2px)'
                                   }}
                                   onMouseOut={(e) => {
                                        e.target.style.backgroundColor = primaryColor
                                        e.target.style.transform = 'translateY(0)'
                                   }}
                              >
                                   Set Default
                              </button>
                         </div>
                    </div>

                    <div style={cardStyle}>
                         <h3 style={cardTitleStyle}>Start New Semester</h3>
                         <button
                              onClick={handleStartNewSemester}
                              style={buttonStyle}
                              onMouseOver={(e) => {
                                   e.target.style.backgroundColor = '#2980b9'
                                   e.target.style.transform = 'translateY(-2px)'
                              }}
                              onMouseOut={(e) => {
                                   e.target.style.backgroundColor = primaryColor
                                   e.target.style.transform = 'translateY(0)'
                              }}
                         >
                              Start New Semester
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default ManagerSemester