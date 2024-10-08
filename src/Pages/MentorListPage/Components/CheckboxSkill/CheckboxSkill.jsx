import { Checkbox } from "antd";
import './CheckboxSkill.scss';
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../../../Contexts/AppContext";

function CheckboxSkill({ skillName, numberMentor, id }) {

     const { filterMentor, setFilterMentor } = useContext(AppContext);

     const onChange = (e) => {
          if (e.target.checked) {
               setFilterMentor({ ...filterMentor, skills: [...filterMentor.skills, e.target.id] });
          } else {
               setFilterMentor({ ...filterMentor, skills: filterMentor.skills.filter(skills => skills !== e.target.id) });
          }
     };

     return (
          <div className="checkbox-skill">
               <Checkbox id={id} onChange={onChange}>{skillName}</Checkbox>
               <p className="numberMentor">{numberMentor}</p>
          </div>
     );
}

export default CheckboxSkill;

CheckboxSkill.propTypes = {
     skillName: PropTypes.string,
     numberMentor: PropTypes.number,
     id: PropTypes.number
}