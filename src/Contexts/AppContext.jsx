import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import {createContext, useState} from 'react'
import {useTranslation} from 'react-i18next'
import { getCurrentSemester } from '../apis/semester'

export const AppContext = createContext({})

export const AppProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-theme')
    const [filterMentor, setFilterMentor] = useState({search: '', skills: [], star: '', page: 1, dates: []})
    const [mentorList, setMentorList] = useState([])
    const {t, i18n} = useTranslation()
    const defaultLanguage = localStorage.getItem('language')
    const authChannel = new BroadcastChannel('auth')
    const { data: semesterData } = useQuery({ queryKey: ['current-semester'], queryFn: getCurrentSemester })

    return <AppContext.Provider
        value={{
            theme,
            setTheme,
            filterMentor,
            setFilterMentor,
            mentorList,
            setMentorList,
            t,
            i18n,
            defaultLanguage,
            authChannel,
            semesterData
        }}
    >
        {children}
    </AppContext.Provider>
}

AppProvider.propTypes = {
    children: PropTypes.node
}