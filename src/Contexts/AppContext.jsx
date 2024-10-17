import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
     const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-theme')
     const [filterMentor, setFilterMentor] = useState({ search: '', skills: [], star: '', page: 1 })
     const [mentorList, setMentorList] = useState([])

     return <AppContext.Provider
          value={{
               theme,
               setTheme,
               filterMentor,
               setFilterMentor,
               mentorList,
               setMentorList
          }}
     >
          {children}
     </AppContext.Provider>
}

AppProvider.propTypes = {
     children: PropTypes.node
}