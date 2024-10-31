import { useQuery } from "@tanstack/react-query";
import { Card, List, Progress, Rate, Typography } from 'antd';
import PropTypes from "prop-types";
import { getSkillMentor } from "../../../../apis/mentor";
import './Skills.scss';
import { useTranslation } from 'react-i18next';

function Skills({ id }) {
     const { Title } = Typography;
     const { data: listSkill } = useQuery({ queryKey: ['list-skill-profile', id], queryFn: () => getSkillMentor(id) })
     const { t } = useTranslation();

     return (
          <div className="mentor-skills-list">
               <Title level={2}>
                    {t('Mentor Skills')}
               </Title>
               <List
                    grid={{
                         gutter: 16,
                         xs: 1,
                         sm: 2,
                         md: 3,
                         lg: 3,
                         xl: 4,
                         xxl: 4,
                    }}
                    dataSource={listSkill?.mentorSkillsWithLevels}
                    renderItem={(skill) => (
                         <List.Item>
                              <Card className="skill-card">
                                   <Title level={4}>{skill.skillName}</Title>
                                   <Rate disabled defaultValue={skill.level} />
                                   <Progress
                                        percent={skill.level * 20}
                                        format={(percent) => `${t('Level')} ${percent / 20}`}
                                        status="active"
                                        strokeColor={{
                                             '0%': '#108ee9',
                                             '100%': '#87d068',
                                        }}
                                   />
                              </Card>
                         </List.Item>
                    )}
               />
          </div>
     );
}

export default Skills

Skills.propTypes = {
     id: PropTypes.any
}