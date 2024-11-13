import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Flex, List, Modal, Select, Space, Tag, Typography } from 'antd'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { loadAllSkills, registerBecomeMentor } from '../../../apis/mentor'
import { AuthContext } from '../../../Contexts/AuthContext'
import { AppContext } from '../../../Contexts/AppContext'

export default function ModalBecomeMentor({ modalOpen, setModalOpen }) {
    const levels = [1, 2, 3, 4, 5]
    const { Option } = Select
    const { Title } = Typography
    const { currentUser } = useContext(AuthContext)
    const { t } = useContext(AppContext)
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedSkillsDisplay, setSelectedSkillsDisplay] = useState([])
    const [currentSkill, setCurrentSkill] = useState()
    const [currentLevel, setCurrentLevel] = useState()
    const [isAgree, setIsAgree] = useState(false)
    const [isValidate, setIsValidate] = useState(false)

    const { data: listSkill } = useQuery({ queryKey: ['list-skills'], queryFn: loadAllSkills })

    const mutation = useMutation({
        mutationFn: ({ selectedSkills, studentId }) => registerBecomeMentor(selectedSkills, studentId),
        onError: (error) => {
            toast.error(error.response.data.message)
        },
        onSuccess: () => {
            toast.success('Successfully registered as a mentor')
            setModalOpen(false)
        }
    })

    const optionsSelectSkill = listSkill?.skills
        .filter((skill) => !selectedSkills.some(selected => skill.id == selected.skillId))
        .map((skill) => ({
            label: skill.name,
            value: skill.id
        }))

    const handleAddSkill = () => {
        if (currentSkill && currentLevel) {
            setSelectedSkills([...selectedSkills, { skillId: currentSkill.value, level: currentLevel }])
            setSelectedSkillsDisplay([...selectedSkillsDisplay, { skill: currentSkill.label, level: currentLevel }])
            setCurrentSkill()
            setCurrentLevel()
        }
    }

    const handleRemoveSkill = (index) => {
        const updatedSkills = selectedSkills.filter((_, i) => i !== index)
        const updatedSkillsDisplay = selectedSkillsDisplay.filter((_, i) => i !== index)
        setSelectedSkills(updatedSkills)
        setSelectedSkillsDisplay(updatedSkillsDisplay)
    }

    const getLevelColor = (level) => {
        switch (level) {
            case 2: return 'red'
            case 3: return 'orange'
            case 4: return 'blue'
            case 5: return 'green'
            default: return 'default'
        }
    }

    useEffect(() => {
        if (selectedSkills.length > 0 && isAgree) {
            setIsValidate(true)
        } else {
            setIsValidate(false)
        }
    }, [selectedSkills, isAgree])

    const handleSend = () => {
        const studentId = currentUser.accountId
        mutation.mutate({ selectedSkills, studentId })
    }

    return (
        <Modal
            title={t("Become a Mentor")}
            centered
            open={modalOpen}
            onOk={handleSend}
            onCancel={() => setModalOpen(false)}
            okText={t('Apply')}
            cancelText={t('cancel')}
            okButtonProps={{ disabled: !isValidate }}
            confirmLoading={mutation.isPending}
            destroyOnClose
        >
            <Space direction="vertical" size="large" style={{ display: 'flex', maxWidth: 700, margin: '0 auto' }}>
                <Title level={3}>{t('Skill Selector')}</Title>
                <Flex justify='center' gap='small'>
                    <Select
                        style={{ width: '50%' }}
                        placeholder={t('Select a skill')}
                        value={currentSkill}
                        onChange={(value, object) => setCurrentSkill(object)}
                        options={optionsSelectSkill}
                    >
                    </Select>
                    <Select
                        style={{ width: '35%' }}
                        placeholder={t('Select a level')}
                        value={currentLevel}
                        onChange={setCurrentLevel}
                    >
                        {levels.map((level) => (
                            <Option key={level} value={level}>{level}</Option>
                        ))}
                    </Select>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSkill} disabled={!(currentLevel && currentSkill)}>
                        {t('Add')}
                    </Button>
                </Flex>
                <List
                    header={<div>{t('Your selected skills')}</div>}
                    bordered
                    dataSource={selectedSkillsDisplay}
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
                                    {t('Remove')}
                                </Button>
                            ]}
                        >
                            <Space>
                                <span>{item.skill}</span>
                                <Tag color={getLevelColor(item.level)}>{t('Level')}: {item.level}</Tag>
                            </Space>
                        </List.Item>
                    )}
                />
            </Space>
            <Checkbox onChange={(e) => setIsAgree(e.target.checked)} checked={isAgree} style={{ padding: '20px 0 0 0' }}>
                {t('Agree to')} <Link to='/terms-become-mentor'>{t('our terms')}</Link></Checkbox>
        </Modal>
    )
}

ModalBecomeMentor.propTypes = {
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func
}
