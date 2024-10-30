import { DownOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Flex, List, Modal, Select, Space, Tag, Typography } from 'antd'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { loadAllSkills, registerBecomeMentor } from '../../../apis/mentor'
import { AuthContext } from '../../../Contexts/AuthContext'
import './ModalBecomeMentor.scss'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export default function ModalBecomeMentor({ modalOpen, setModalOpen }) {

    const { Option } = Select
    const { Title } = Typography
    
    const options = []
    const [isValidate, setIsValidate] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [listSkillSelect, setListSkillSelect] = useState([])
    const { data: listSkill } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })
    const mutation = useMutation({
        mutationFn: ({ listSkillSelect, studentId }) => registerBecomeMentor(listSkillSelect, studentId),
        onError: (error, variables) => {
            console.log(variables)
            toast.error('This account is already registered or an error occurred, please try again!')
        },
        onSuccess: (data) => {
            toast.success('Successfully registered as a mentor')
            setModalOpen(false)
            console.log(data)
        }
    })
    const [isAgree, setIsAgree] = useState(false)

    listSkill?.skills.forEach((skill) => {
        options.push({
            label: skill.name,
            value: skill.id
        })
    })

    useEffect(() => {
        if (listSkillSelect.length > 0 && isAgree) {
            setIsValidate(true)
        } else {
            setIsValidate(false)
        }
    }, [listSkillSelect, isAgree])

    const handleChange = (value) => {
        const listSkill = []
        value.map((skill) => {
            listSkill.push({ skillId: skill, level: 5 })
        })
        setListSkillSelect(listSkill)
    }

    const handleSend = () => {
        const studentId = currentUser.accountId
        mutation.mutate({ listSkillSelect, studentId })
    }

    const suffix = (
        <>
            <span>
                {listSkillSelect.length} / {5}
            </span>
            <DownOutlined />
        </>
    )

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [currentLevel, setCurrentLevel] = useState('');

    console.log(selectedSkills);

    const skills = [
        'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++',
        'HTML', 'CSS', 'SQL', 'Git', 'Docker', 'AWS'
    ];

    const levels = ['1', '2', '3', '4', '5'];

    const handleAddSkill = () => {
        if (currentSkill && currentLevel) {
            setSelectedSkills([...selectedSkills, { skill: currentSkill, level: currentLevel }]);
            setCurrentSkill('');
            setCurrentLevel('');
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = selectedSkills.filter((_, i) => i !== index);
        setSelectedSkills(updatedSkills);
    };

    const getLevelColor = (level) => {
        switch (level) {
            case '2': return 'blue';
            case '3': return 'green';
            case '4': return 'orange';
            case '5': return 'red';
            default: return 'default';
        }
    };

    return (
        <Modal
            title="Become a Mentor"
            centered
            open={modalOpen}
            onOk={handleSend}
            onCancel={() => setModalOpen(false)}
            okText='Apply'
            okButtonProps={{ disabled: !isValidate }}
            confirmLoading={mutation.isPending}
        >
            <h1 style={{ fontWeight: '400', paddingTop: '10px' }}>Select your main skills</h1>
            <Space direction="vertical" size="large" style={{ display: 'flex', maxWidth: 700, margin: '0 auto', padding: 20 }}>
                <Title level={2}>Skill Selector</Title>
                <Flex justify='center'>
                    <Space>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Select a skill"
                            value={currentSkill}
                            onChange={setCurrentSkill}
                        >
                            {skills.map((skill) => (
                                <Option key={skill} value={skill}>{skill}</Option>
                            ))}
                        </Select>
                        <Select
                            style={{ width: 100 }}
                            placeholder="Select a level"
                            value={currentLevel}
                            onChange={setCurrentLevel}
                        >
                            {levels.map((level) => (
                                <Option key={level} value={level}>{level}</Option>
                            ))}
                        </Select>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSkill}>
                            Add
                        </Button>
                    </Space>
                </Flex>
                <List
                    header={<div>Selected Skills</div>}
                    bordered
                    dataSource={selectedSkills}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Button
                                    key="delete"
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleRemoveSkill(index)}
                                >
                                    Remove
                                </Button>
                            ]}
                        >
                            <Space>
                                <span>{item.skill}</span>
                                <Tag color={getLevelColor(item.level)}>Level: {item.level}</Tag>
                            </Space>
                        </List.Item>
                    )}
                />
            </Space>
            <Checkbox onChange={(e) => setIsAgree(e.target.checked)} checked={isAgree} style={{ padding: '20px 0 0 0' }}>Agree
                to <Link to='/terms-become-mentor'>our terms</Link></Checkbox>
        </Modal>
    )
}

ModalBecomeMentor.propTypes = {
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func
}
