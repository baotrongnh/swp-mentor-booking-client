import { DownOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { useState } from "react";
import { loadAllSkills } from "../../../../apis/mentor";
import CheckboxSkill from "../CheckboxSkill/CheckboxSkill";
import './SkillSearch.scss';

function SkillSearch() {
     const { data: listSkills } = useQuery({ queryKey: ['listSkill'], queryFn: loadAllSkills });
     const [numberSkills, setNumberSkills] = useState(5);

     return (
          <div className="skill-search">
               <h1 className='title-skill'>Skills</h1>
               <Input className='input-search' placeholder="Search for skills" size='large' style={{ fontSize: 16 }} />
               <p className='sub-text-found'>100+ mentors found</p>

               <div className="skill-block">
                    {listSkills?.slice(0, numberSkills).map((skill) => (
                         <CheckboxSkill key={skill.id} id={skill.id} skillName={skill.name} numberMentor={99} />
                    ))}

                    <p onClick={() => setNumberSkills(numberSkills === 5 ? listSkills.length : 5)} className='show-more-text'>Show more <DownOutlined /></p>
               </div>
          </div>
     );
}

export default SkillSearch;