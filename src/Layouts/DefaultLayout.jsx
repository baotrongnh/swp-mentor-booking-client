import PropTypes from 'prop-types'
import { Footer, Header } from '../Components'
import { HeaderMentor } from '../Components/Modal'
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

function DefaultLayout({ children }) {
     const { currentUser } = useContext(AuthContext)
     console.log(currentUser);
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

