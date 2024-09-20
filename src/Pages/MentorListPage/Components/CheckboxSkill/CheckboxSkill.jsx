import { Checkbox } from "antd";
import './CheckboxSkill.scss';
import PropTypes from "prop-types";

function CheckboxSkill({ skillName, numberMentor }) {
     const onChange = (e) => {
          console.log(`checked = ${e.target.checked}`);
     };

     return (
          <div className="checkbox-skill">
               <Checkbox onChange={onChange}>{skillName}</Checkbox>
               <p className="numberMentor">{numberMentor}</p>
          </div>
     );
}

export default CheckboxSkill;

CheckboxSkill.propTypes = {
     skillName: PropTypes.string,
     numberMentor: PropTypes.number
}