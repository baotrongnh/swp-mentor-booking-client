import { Checkbox } from "antd"
import PropTypes from "prop-types"
import { useContext } from "react"
import { AppContext } from "../../../../Contexts/AppContext"
import './CheckboxSkill.scss'

function CheckboxSkill({ skillName, numberMentor, id }) {
     const { filterMentor, setFilterMentor } = useContext(AppContext)

     const onChange = (e) => {
          if (e.target.checked) {
               setFilterMentor({ ...filterMentor, skills: [...filterMentor.skills, e.target.id], page: 1 })
          } else {
               setFilterMentor({ ...filterMentor, skills: filterMentor.skills.filter(skills => skills !== e.target.id), page: 1 })
          }
     }

     return (
          <div className="checkbox-skill">
               <Checkbox id={id} onChange={onChange} checked={filterMentor?.skills?.includes(id)}>{skillName}</Checkbox>
               <p className="numberMentor">{numberMentor}</p>
          </div>
     )
}

export default CheckboxSkill

CheckboxSkill.propTypes = {
     skillName: PropTypes.string,
     numberMentor: PropTypes.number,
     id: PropTypes.number
}