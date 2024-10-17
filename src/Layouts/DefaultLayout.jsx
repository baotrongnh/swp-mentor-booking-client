import PropTypes from 'prop-types'
import { Footer, Header } from '../Components'

function DefaultLayout({ children }) {
     return (
          <>
               <Header />
               {children}
               <Footer />
          </>
     )
}

export default DefaultLayout

DefaultLayout.propTypes = {
     children: PropTypes.any
}

