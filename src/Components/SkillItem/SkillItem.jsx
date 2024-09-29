import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress } from "antd";
import PropTypes from "prop-types";
import './SkillItem.scss';

function SkillItem({ skillName, icon, percent }) {
     return (
          <div className="skill-item">
               <Icon className="icon" icon={icon} />

               <div className="block-parameter">
                    <p className="skill-name">{skillName}</p>
                    <Progress percent={percent} />
               </div>
          </div>
     );
}

export default SkillItem;

SkillItem.propTypes = {
     skillName: PropTypes.string,
     icon: PropTypes.string,
     percent: PropTypes.number
}