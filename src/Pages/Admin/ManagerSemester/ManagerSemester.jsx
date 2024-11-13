import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { resetStudentPoint, setDefaultCost, setDefaultPoint, startNewSemester } from '../../../apis/admin'
import { getCurrentSemester } from '../../../apis/semester'
import { Loading } from '../../../Components'
import './ManagerSemester.scss'

const ManagerSemester = () => {
     const queryClient = useQueryClient()

     const { data: currentSemesterData, isLoading } = useQuery({ queryKey: ['current-semester'], queryFn: getCurrentSemester })

     const mutationResetPoint = useMutation({
          mutationFn: resetStudentPoint,
          onSuccess: () => {
               toast.success('Points reset!')
          }
     })

     const mutationStartNewSemester = useMutation({
          mutationFn: startNewSemester,
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['current-semester'] })
               toast.success(`New semester has started`)
          },
          onError: () => {
               toast.error('An error occurred, please try again!')
          }
     })

     const mutationSetDefaultPoint = useMutation({
          mutationFn: (newPoint) => setDefaultPoint(newPoint),
          onSuccess: () => {
               toast.success('Default score set for new semester')
          }
     })

     const mutationSetDefaultCost = useMutation({
          mutationFn: (newPoint) => setDefaultCost(newPoint),
          onSuccess: () => {
               toast.success('Default cost set for new semester')
          }
     })

     const [defaultPointCustom, setDefaultPointCustom] = useState(0)
     const [defaultCostCustom, setDefaultCostCustom] = useState(0)

     useEffect(() => {
          if (currentSemesterData) {
               setDefaultPointCustom(currentSemesterData?.latestSemester?.defaultPoint)
               setDefaultCostCustom(currentSemesterData?.latestSemester?.slotCost)
          }
     }, [currentSemesterData])

     const resetStudentPoints = () => {
          mutationResetPoint.mutateAsync()
     }

     const handleSetDefaultPoint = () => {
          mutationSetDefaultPoint.mutate(defaultPointCustom)
     }

     const handleSetDefaultCost = () => {
          mutationSetDefaultCost.mutate(defaultCostCustom)
     }

     const handleStartNewSemester = () => {
          mutationStartNewSemester.mutateAsync()
     }

     if (isLoading || mutationResetPoint.isPending || mutationSetDefaultCost.isPending || mutationSetDefaultPoint.isPending || mutationStartNewSemester.isPending) return <Loading />

     return (
          <div className="semester-manager">
               <div className="header">
                    <h1>Semester Management</h1>
                    <p className="subtitle">Manage current semester settings and operations</p>
               </div>

               <div className="current-semester-card">
                    <div className="card-header">
                         <h2>Current Semester</h2>
                         <span className="status-badge">Active</span>
                    </div>
                    <div className="semester-info-grid">
                         <div className="info-item">
                              <span className="label">Semester Name</span>
                              <p className="value">{`${currentSemesterData?.latestSemester?.name} ${currentSemesterData?.latestSemester?.year}`}</p>
                         </div>
                         <div className="info-item">
                              <span className="label">Start Date</span>
                              <p className="value">{new Date(currentSemesterData?.latestSemester?.createdAt).toLocaleDateString('en-US', {
                                   year: 'numeric',
                                   month: 'long',
                                   day: 'numeric'
                              })}</p>
                         </div>
                         <div className="info-item">
                              <span className="label">Cost for a slot</span>
                              <p className="value">{currentSemesterData?.latestSemester?.slotCost} <span className="unit">coin</span></p>
                         </div>
                         <div className="info-item">
                              <span className="label">Slot time</span>
                              <p className="value">{currentSemesterData?.latestSemester?.slotDuration} <span className="unit">minute</span></p>
                         </div>
                    </div>
               </div>

               <div className='action-cards'>
                    <div className="action-card">
                         <div className="card-content">
                              <h3>Set Default Point</h3>
                              <p className="description">Set the default points for new students</p>
                              <div className="input-group">
                                   <input
                                        type="number"
                                        value={defaultPointCustom}
                                        onChange={(e) => setDefaultPointCustom(e.target.value)}
                                        className="point-input"
                                   />
                                   <button onClick={handleSetDefaultPoint} className="action-button">
                                        Set Default
                                   </button>
                              </div>
                         </div>
                    </div>

                    <div className="action-card">
                         <div className="card-content">
                              <h3>Set cost for a slot</h3>
                              <p className="description">Set the default cost for booking</p>
                              <div className="input-group">
                                   <input
                                        type="number"
                                        value={defaultCostCustom}
                                        onChange={(e) => setDefaultCostCustom(e.target.value)}
                                        className="point-input"
                                   />
                                   <button onClick={handleSetDefaultCost} className="action-button">
                                        Set Default
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>

               <div className="action-cards">
                    <div className="action-card">
                         <div className="card-content">
                              <h3>Reset Student Points</h3>
                              <p className="description">Reset all student points to their default value</p>
                              <button onClick={resetStudentPoints} className="action-button warning">
                                   Reset Points
                              </button>
                         </div>
                    </div>

                    <div className="action-card">
                         <div className="card-content">
                              <h3>Start New Semester</h3>
                              <p className="description">Initialize a new semester period</p>
                              <button onClick={handleStartNewSemester} className="action-button">
                                   Start New Semester
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default ManagerSemester