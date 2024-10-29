import { useQuery } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { getSkillMentor } from "../../../../apis/mentor"
import { Tag } from "antd"

function Skills({ id }) {
     const { data: listSkill } = useQuery({ queryKey: ['list-skill-profile', id], queryFn: () => getSkillMentor(id) })
     console.log(listSkill)
     return (
          <div className="skills-block" style={{ padding: '30px 0' }}>
               <h1 style={{marginBottom: '20px', fontSize: '2rem', fontWeight: '600'}}>All Skills:</h1>
               {listSkill?.skills.map((skill) => (
                    <Tag color="blue" key={skill.id} style={{fontSize: '2.5rem', marginRight: '15px'}}>{skill.name}</Tag>
               ))}
          </div>
     );
}

export default Skills

Skills.propTypes = {
     id: PropTypes.any
}