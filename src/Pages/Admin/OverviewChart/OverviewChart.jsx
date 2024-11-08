import CanvasJSReact from '@canvasjs/react-charts'
import { useQuery } from '@tanstack/react-query'
import { getTotalUser } from '../../../apis/admin'
import { loadAllSkills } from '../../../apis/mentor'

export default function OverviewChart() {
     const CanvasJSChart = CanvasJSReact.CanvasJSChart
     const { data: dataUser } = useQuery({ queryKey: ['data-user'], queryFn: getTotalUser })
     const { data: dataSkills } = useQuery({ queryKey: ['data-skills'], queryFn: loadAllSkills })
     console.log(dataSkills);

     const dataUserChart = ([
          {
               y: ((dataUser?.data.mentors / (dataUser?.data.mentors + dataUser?.data.students)) * 100).toFixed(2),
               label: 'Mentors',
               count: dataUser?.data.mentors

          },
          {
               y: ((dataUser?.data.students / (dataUser?.data.mentors + dataUser?.data.students)) * 100).toFixed(2),
               label: 'Students',
               count: dataUser?.data.students
          }
     ])

     const dataSkillsChart = dataSkills?.skills?.map((skill) => (
          {
               y: ((skill.mentorCount / (dataUser?.data.mentors)) * 100).toFixed(2),
               label: skill.name,
               count: skill.mentorCount

          }
     ))

     const options = {
          title: {
               text: "Users"
          },
          animationEnabled: true,
          exportEnabled: true,
          data: [{
               type: "pie",
               indexLabel: "{label}: {y}% ({count} users)",
               startAngle: -90,
               dataPoints: dataUserChart,
               showInLegend: true,
               legendText: "{label}",
          }],
          toolTip: {
               content: "{count} users"
          }
     }

     const optionsSkills = {
          title: {
               text: "Skills"
          },
          animationEnabled: true,
          exportEnabled: true,
          data: [{
               type: "pie",
               indexLabel: "{label}: {y}%",
               startAngle: -90,
               dataPoints: dataSkillsChart,
          }],
          toolTip: {
               content: "{count} mentors"
          }
     }

     return (
          <div className="overview-chart" style={{display: 'flex'}}>
               <div style={{width: '50%'}}>
                    <CanvasJSChart options={options} />
               </div>

               <div style={{ width: '50%' }}>
                    <CanvasJSChart options={optionsSkills} />
               </div>
              
          </div>
     )
}
