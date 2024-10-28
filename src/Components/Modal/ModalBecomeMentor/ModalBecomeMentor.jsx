import {DownOutlined} from '@ant-design/icons'
import {useMutation, useQuery} from '@tanstack/react-query'
import {Checkbox, Modal, Select} from 'antd'
import PropTypes from 'prop-types'
import {useContext, useEffect, useState} from 'react'
import {loadAllSkills, registerBecomeMentor} from '../../../apis/mentor'
import {AuthContext} from '../../../Contexts/AuthContext'
import './ModalBecomeMentor.scss'
import {Link} from 'react-router-dom'
import skillSearch from "../../../Pages/MentorListPage/Components/SkillSearch/SkillSearch.jsx";

export default function ModalBecomeMentor({modalOpen, setModalOpen}) {
    const options = []
    const [isValidate, setIsValidate] = useState(false)
    const {currentUser} = useContext(AuthContext)
    const [listSkillSelect, setListSkillSelect] = useState([])
    const {data: listSkill} = useQuery({queryKey: ['list-skills'], queryFn: loadAllSkills})
    const mutation = useMutation({
        mutationFn: ({listSkillSelect, studentId}) => registerBecomeMentor(listSkillSelect, studentId),
        onError: (error, variables) => {
            console.log(variables)
        },
        onSuccess: (data) => {
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
            listSkill.push({skillId: skill, level: 5})
        })
        setListSkillSelect(listSkill)
    }

    const handleSend = () => {
        const studentId = currentUser.accountId
        mutation.mutate({listSkillSelect, studentId})
    }

    const suffix = (
        <>
               <span>
                    {listSkillSelect.length} / {5}
               </span>
            <DownOutlined/>
        </>
    )

    return (
        <Modal
            title="Become a Mentor"
            centered
            open={modalOpen}
            onOk={handleSend}
            onCancel={() => setModalOpen(false)}
            okText='Apply'
            okButtonProps={{disabled: !isValidate}}
        >
            <h1 style={{fontWeight: '400', paddingTop: '10px'}}>Select your main skills</h1>
            <Select
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder="Please select at least 1 skill"
                onChange={handleChange}
                options={options}
                maxCount={5}
                suffixIcon={suffix}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
            />
            <Checkbox onChange={(e) => setIsAgree(e.target.checked)} checked={isAgree} style={{padding: '20px 0 0 0'}}>Agree
                to <Link to='/terms-become-mentor'>our terms</Link></Checkbox>
        </Modal>
    )
}

ModalBecomeMentor.propTypes = {
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func
}
