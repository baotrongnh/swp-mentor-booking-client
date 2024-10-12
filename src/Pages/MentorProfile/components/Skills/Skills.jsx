import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { getSkillMentor } from "../../../../apis/mentor";

function Skills({ id }) {
     const { data: listSkill } = useQuery({ queryKey: ['list-skill-profile', id], queryFn: () => getSkillMentor(id) });
     console.log(listSkill);

     return (
          <div className="skills-block">
               <h1>skill block</h1>
          </div>
     );
}

export default Skills;

Skills.propTypes = {
     id: PropTypes.any
}