import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Footer, Header } from '../Components'
import { HeaderMentor } from '../Components/Modal'
import { AuthContext } from '../Contexts/AuthContext'

function DefaultLayout({ children }) {
     const { currentUser } = useContext(AuthContext)
     return (
          <>
               {currentUser?.isMentor === 1
                    ? < HeaderMentor />
                    : <Header />
               }
               {children}
               <Footer />
          </>
     )
}

export default DefaultLayout

DefaultLayout.propTypes = {
     children: PropTypes.any
}

